const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const PROTO_PATH = path.join(__dirname, '../Proto/notification.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const notificationProto = grpc.loadPackageDefinition(packageDefinition).notification;

const client = new notificationProto.NotificationService(
    `localhost:${process.env.NOTIFICATIONS_GRPC_PORT}`,
    grpc.credentials.createInsecure()
);

function sendNotification(matchId, team1Name, team2Name, team1Score, team2Score) {
    return new Promise((resolve, reject) => {
        client.sendNotification({ matchId, team1Name, team2Name, team1Score, team2Score }, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

module.exports = { client, sendNotification };