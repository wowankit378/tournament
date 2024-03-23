const Tournament = require("../models/tournament");


const getAllTournaments = async (request, response) => {
    const tournaments = await Tournament.find({});
  
    try {
      response.send(tournaments);
    } catch (error) {
      response.status(500).send(error);
    }  
}

const createTournament = async (request, response) => {
    const tournament = new Tournament(request.body);
  
    try {
      await tournament.save();
      response.status(200).json({tournament});
    } catch (error) {
      response.status(500).send(error);
    }
}

const deleteTournament = async (req, res) => {
    
    try {
        const {_id:tournamentId} = req.params
        const tournament = await Tournament.findOneAndDelete({_id:tournamentId})
        if(!tournament){
            res.status(404).json({msg: "Tournament not found"})
        }
        res.status(200).json({tournament, msg: "Tournament Deleted"})
    } catch (error) {
        res.status(500).json({msg: error})
    }

}

const getTournament = async (req, res) => {
    try {
        // const {id:tournamentID} = req.params
        const tournament = await Tournament.findOne({_id:req.params.id})
        if(!tournament){
           return res.status(404).json({msg: 'tournament not found'})
        }
       return res.status(200).json({tournament})
    } catch (error) {
        res.status(500).json({msg: error})
    }
    // res.json({id: req.params.id})
}


const updateTournament = async (req, res) => {
    try {

        // const {_id:tournamentId} = 
        const tournament = await Tournament.findOneAndUpdate(req.params.id, req.body,
            
            {
                new: true,
                runValidators: true
            })
        
        if(!tournament){
            return res.status(404).json({msg: "Tournament not found"})
        }
        res.status(200).json({tournament, msg: "Tournament Updated"})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

module.exports = {
    getAllTournaments,
    createTournament,
    getTournament,
    updateTournament,
    deleteTournament,
}