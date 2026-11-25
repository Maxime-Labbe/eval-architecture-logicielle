const express = require('express');
const { getTeams } = require('./TeamsClientGrpc');
const { uploadMatchResult } = require('./MatchesClientGrpc');
const { sendNotification } = require('./NotificationsClientGrpc');
const { calculateRanking } = require('./RankingsClientGrpc');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.use(express.json());

app.post('/matches/:id/result', async (req, res) => {
    const { scoreTeam1, scoreTeam2 } = req.body;
    try {
        const match = await uploadMatchResult(scoreTeam1, scoreTeam2);
        if (!match) {
            return res.status(500).json({ error: 'Problème lors de la mise à jour des résultats' });
        }
        console.log("Résultat mis à jour :", match);
        const teams = await getTeams();
        if (!teams) {
            return res.status(500).json({ error: 'Problème lors de la récupération des équipes' });
        }

        const ranking = await calculateRanking(teams);
        if (!ranking) {
            return res.status(500).json({ error: "Problème lors du calcul des rangs" });
        }

        const team1Name = teams.find((team) => team.id === team1Id).name;
        const team2Name = teams.find((team) => team.id === team2Id).name;
        const notification = await sendNotification(match.id, team1Name, team2Name, scoreTeam1, scoreTeam2);
        if (!notification) {
            return res.status(500).json({ error: "Problème lors de l'envoi de la notification" });
        }
        console.log("Notification envoyée :", notification);

        res.json({ match, ranking, notification });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(process.env.ORCHESTRATOR_PORT, () => {
    console.log(`Orchestrator service running on port ${process.env.ORCHESTRATOR_PORT}`);
});