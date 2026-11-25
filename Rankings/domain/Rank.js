class Rank {
    constructor(teamId, played, wins, draws, losses, points) {
        this.teamId = teamId;
        this.played = played;
        this.wins = wins;
        this.draws = draws;
        this.losses = losses;
        this.points = points;
    }
}

module.exports = Rank;