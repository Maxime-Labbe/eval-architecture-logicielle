const Ranking = require('../domain/Ranking.js');

class CalculateRanking {
    constructor(rankingRepository) {
        this.rankingRepository = rankingRepository;
    };

    async execute(teams) {
        const ranks = this.rankingRepository.getRanks();
        if (!ranks || ranks.length === 0) {
            return;
        }

        const ranking = new Ranking(ranks);
        if (!ranking) {
            return;
        }

        return ranking.calculateRanking(teams);
    };
}

module.exports = CalculateRanking;