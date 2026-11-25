const Notification = require('../domain/Notification.js');

class SendNotification {
    constructor() {

    };

    async execute(matchId, team1Name, team2Name, team1Score, team2Score) {
        return new Notification(matchId, team1Name, team2Name, team1Score, team2Score);
    };
}

module.exports = SendNotification;