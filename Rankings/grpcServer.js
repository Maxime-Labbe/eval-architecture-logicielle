const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const PROTO_PATH = path.join(__dirname, '../Proto/ranking.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const rankingProto = grpc.loadPackageDefinition(packageDefinition).ranking;

function startGrpcServer(calculateRankingUseCase) {
    const server = new grpc.Server();
    server.addService(rankingProto.RankingService.service, {
        calculateRanking(call, callback) {
            const ranking = calculateRankingUseCase(call.request);
            if (ranking) {
                callback(null, {
                    success: true,
                    ranking: ranking
                });
            } else {
                callback(new Error("Failed to create order"));
            }
        }
    });
    server.bindAsync(`0.0.0.0:${process.env.RANKINGS_GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), () =>
        console.log(`gRPC server running at http://0.0.0.0:${process.env.RANKINGS_GRPC_PORT}`)
    );
}

module.exports = { startGrpcServer };