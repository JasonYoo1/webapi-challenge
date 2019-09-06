const express = require('express');
const actionRouter = express.Router();
const actionDB = require('../data/helpers/actionModel');

actionRouter.get('/', (req,res) => {
    actionDB.get()
    .then( projects => {
        res.status(200).json(projects);
    })
    .catch( err => {
        res.status(500).json(err);
    })
});


module.exports = actionRouter;