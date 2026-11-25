const express = require('express');

function createTeamRoutes(getTeam) {
    const router = express.Router();

    router.get('/', async (req, res, next) => {
        try {
            const teams = await getTeam.execute(1);

            if (!teams) {
                return res.status(404).json({ error: "Teams introuvable" });
            }

            res.json(teams);
        } catch (error) {
            next(error);
        }
    });

    return router;
}

module.exports = createTeamRoutes;