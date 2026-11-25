class Ranking {
    constructor(ranks) {
        this.ranks = ranks;
    }

    calculateRanking(teams) {
        return this.ranks.sort((first, second) => {
            const firstName = teams.find((team) => team.id === first.teamId).name;
            const secondName = teams.find((team) => team.id === second.teamId).name;
            return second.points - first.points || firstName.localeCompare(secondName, 'fr');
        });
    }
}