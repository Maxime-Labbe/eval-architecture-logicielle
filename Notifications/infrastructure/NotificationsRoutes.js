const express = require('express');

function createNotificationsRoutes(sendNotification) {
    const router = express.Router();

    router.post('/', async (req, res) => {
        try {
            const { matchId, team1Name, team2Name, team1Score, team2Score } = req.body;

            const notification = await sendNotification(matchId, team1Name, team2Name, team1Score, team2Score);

            if (!notification) {
                return res.status(500).json({ error: "Une erreur est survenue lors de l'envoi de la notification !" });
            }

            res.status(201).json(notification);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}

module.exports = createNotificationsRoutes;