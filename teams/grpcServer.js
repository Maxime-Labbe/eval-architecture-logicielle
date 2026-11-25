const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const PROTO_PATH = path.join(__dirname, '../Proto/team.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const teamProto = grpc.loadPackageDefinition(packageDefinition).team;

function startGrpcServer(sendTeamUseCase) {
    const server = new grpc.Server();
    server.addService(teamProto.TeamService.service, {
        sendTeam(call, callback) {
            const Team = GetTeam(call.request);
            if (Team) {
                callback(null, {
                    success: true,
                    message: Team.message
                });
            } else {
                callback(new Error("Failed to create order"));
            }
        }
    });
    server.bindAsync(`0.0.0.0:${process.env.TEAM_GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), () =>
        console.log(`gRPC server running at http://0.0.0.0:${process.env.TEAM_GRPC_PORT}`)
    );
}

module.exports = { startGrpcServer };