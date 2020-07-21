require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

const usersRouter = require(__dirname + '/backend/routes/users.js');
const forumRouter = require(__dirname + '/backend/routes/forum.js');
const apartmentRouter = require(__dirname + '/backend/routes/apartment.js');
const blogRouter = require(__dirname + '/backend/routes/blog.js');

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,
  { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true });
const connection = mongoose.connection;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(express.static(__dirname + '/build/'));
app.use('/signup', usersRouter);
app.use('/discussionforum', forumRouter);
app.use('/apartments', apartmentRouter);
app.use('/blog', blogRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
})

//server port
app.listen(port, () => {
  console.log(`Server is runing on port: ${port}`);
});