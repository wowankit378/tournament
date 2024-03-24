const express = require('express')
const { register, login } = require("../auth/auth")
const verifyToken = require("../middleware/authMiddleware")


const router = express.Router()

const {
    getAllTournaments,
    getTournament,
    createTournament,
    updateTournament, 
    deleteTournament,
} = require('../controllers/tournamentController')

//router.use(verifyToken);
router.route('/')
.get(verifyToken,getAllTournaments)
.post(verifyToken,createTournament)

router.route("/register").post(register)
router.route("/login").post(login)


router.route('/:id')
    .get(verifyToken,getTournament)
    .patch(verifyToken,updateTournament)
    .delete(verifyToken,deleteTournament)


module.exports = router