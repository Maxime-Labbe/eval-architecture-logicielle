const express = require('express');
const path = require('path');
const SendNotification = require('./application/SendNotification.js');
const createNotificationsRoutes = require('./infrastructure/NotificationsRoutes.js');
const { startGrpcServer } = require('./grpcServer');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.use(express.json());

const sendNotification = new SendNotification();

startGrpcServer(sendNotification);

app.use('/notifications', createNotificationsRoutes(() => sendNotification));

app.listen(process.env.NOTIFICATIONS_PORT, () => {
    console.log(`Server is running on port ${process.env.NOTIFICATIONS_PORT}`);
});

