const express = require('express');

function createRankingsRoutes(calculateRanking) {
    const router = express.Router();

    router.get('/', async (req, res) => {
        try {
            const { teams } = req.body;

            const ranking = await calculateRanking(teams);

            if (!ranking) {
                return res.status(500).json({ error: "Une erreur est survenue lors du calcul des rangs !" });
            }

            res.status(200).json(ranking);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}

module.exports = createRankingsRoutes;