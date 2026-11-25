class Notification {
    constructor(matchId, team1Name, team2Name, team1Score, team2Score) {
        this.message = `Notification à ${team1Name} et ${team2Name} : match ${matchId} terminé, score ${team1Score} - ${team2Score}.`;
    }
}

module.exports = Notification;