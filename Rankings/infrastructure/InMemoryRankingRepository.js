const Rank = require('../domain/Rank.js');
const RankingRepository = require('../port/RankingRepository.js');

class InMemoryRankingRepository extends RankingRepository {
    constructor() {
        super();
        this.ranks = new Map(
            [
                [1, new Rank(1, 1, 1, 0, 0, 3)]
                [2, new Rank(2, 1, 0, 0, 1, 0)]
                [3, new Rank(3, 1, 0, 1, 0, 1)]
                [4, new Rank(4, 1, 0, 1, 0, 1)]
                [5, new Rank(5, 1, 0, 0, 1, 0)]
                [6, new Rank(6, 1, 1, 0, 0, 3)]
            ]
        );
    }

    async getRanks() {
        return this.ranks;
    }
}

module.exports = InMemoryRankingRepository;