const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const authRoutes = require('./routes/tournamentRoutes.js');
const protectedRoute = require('./routes/protectedRoute')
const tournamentRouter = require("./routes/tournamentRoutes.js");

const app = express();

const port = process.env.PORT || 8000;

// Middleware

app.use(express.static('./public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(session({secret: "Your secret key"}));

app.use(express.json())
// app.use(express.urlencoded({extended: false}))




mongoose.connect(
  "mongodb+srv://fashion_user:fashionpass1234@cluster0.bq1ctss.mongodb.net/TournaDb?retryWrites=true&w=majority",
);

app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);

app.use(tournamentRouter);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});