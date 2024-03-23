const express = require('express')
const { register, login } = require("../auth/auth")

const router = express.Router()

const {
    getAllTournaments,
    getTournament,
    createTournament,
    updateTournament, 
    deleteTournament,
} = require('../controllers/tournamentController')

router.route('/')
.get(getAllTournaments)
.post(createTournament)

router.route("/register").post(register)
router.route("/login").post(login)


router.route('/:id')
    .get(getTournament)
    .patch(updateTournament)
    .delete(deleteTournament)


module.exports = router