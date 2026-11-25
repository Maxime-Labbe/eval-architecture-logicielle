const express = require('express');
const path = require('node:path');
const GetTeams = require('./application/GetTeams');

const InMemoryTeamRepository = require('./infrastructure/InMemoryTeamRepository');
const createTeamRoutes = require('./infrastructure/TeamRoutes');
const { startGrpcServer } = require('./grpcServer');

const app = express();
app.use(express.json());
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


const repository = new InMemoryTeamRepository();
const getTeam = new GetTeams(repository);

startGrpcServer(getTeam);

app.use('/teams',createTeamRoutes(getTeam));

app.use((req, res) => {
  res.status(404).json({ error: 'Route introuvable.' });
});

app.use((error, req, res, next) => {
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Le corps de la requête doit être un JSON valide.' });
  }
  const status = error.status >= 400 && error.status < 500 ? error.status : 500;
  res.status(status).json({ error: status === 500 ? 'Erreur interne du serveur.' : error.message });
});

app.listen(process.env.TEAM_PORT, () => {
  console.log(`Server is running on port ${process.env.TEAM_PORT}`);
});
