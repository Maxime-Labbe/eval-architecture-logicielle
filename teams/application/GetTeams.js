class GetTeam{
    constructor(teamRepository){
        this.teamRepository = teamRepository;
    }

    async execute(){
        const teams = await this.teamRepository.get();

        if(!teams){
            return null;
        }

        return teams
    }
}

module.exports = GetTeam;