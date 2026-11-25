const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const PROTO_PATH = path.join(__dirname, '../Proto/ranking.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const rankingProto = grpc.loadPackageDefinition(packageDefinition).ranking;

const client = new rankingProto.RankingService(
    `localhost:${process.env.RANKINGS_GRPC_PORT}`,
    grpc.credentials.createInsecure()
);

function calculateRanking(teams) {
    return new Promise((resolve, reject) => {
        client.sendNotification({ teams }, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

module.exports = { client, calculateRanking };