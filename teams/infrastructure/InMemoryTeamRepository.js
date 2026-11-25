const TeamRepository = require("../application/port/TeamRepository");
const Team = require("../domain/Team");

class InMemoryTeamRepository extends TeamRepository{
    constructor(){
        super();
        this.teams = [
            new Team(1, 'Shadow Wolves'),
            new Team(2, 'Pixel Warriors'),
            new Team(3, 'Cyber Phoenix'),
            new Team(4, 'Dark Knights'),
            new Team(5, 'Neon Titans'),
            new Team(6, 'Ghost Squad')
        ];
    }

    async get(){
        return this.teams
    }
}

module.exports = InMemoryTeamRepository;