const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const PROTO_PATH = path.join(__dirname, '../Proto/notification.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const notificationProto = grpc.loadPackageDefinition(packageDefinition).notification;

function startGrpcServer(sendNotificationUseCase) {
    const server = new grpc.Server();
    server.addService(notificationProto.NotificationService.service, {
        sendNotification(call, callback) {
            const notification = sendNotificationUseCase(call.request);
            if (notification) {
                callback(null, {
                    success: true,
                    message: notification.message
                });
            } else {
                callback(new Error("Failed to create order"));
            }
        }
    });
    server.bindAsync(`0.0.0.0:${process.env.NOTIFICATIONS_GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), () =>
        console.log(`gRPC server running at http://0.0.0.0:${process.env.NOTIFICATIONS_GRPC_PORT}`)
    );
}

module.exports = { startGrpcServer };