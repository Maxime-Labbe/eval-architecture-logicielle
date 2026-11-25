const express = require('express');
const path = require('path');
const CalculateRanking = require('./application/CalculateRanking.js');
const createRankingsRoutes = require('./infrastructure/RankingsRoutes.js');
const InMemoryRankingRepository = require('./infrastructure/InMemoryRankingRepository.js');
const { startGrpcServer } = require('./grpcServer');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.use(express.json());

const repository = new InMemoryRankingRepository();
const calculateRanking = new CalculateRanking(repository);

startGrpcServer(calculateRanking);

app.use('/ranking', createRankingsRoutes(() => calculateRanking));

app.listen(process.env.RANKINGS_PORT, () => {
    console.log(`Server is running on port ${process.env.RANKINGS_PORT}`);
});

