const express = require('express');
const actionRouter = express.Router();
const actionDB = require('../data/helpers/actionModel');

actionRouter.get('/', (req,res) => {
    actionDB.get()
    .then( actions => {
        res.status(200).json(actions);
    })
    .catch( err => {
        res.status(500).json(err);
    })
});


actionRouter.get('/:id', (req,res) => {
    const {id} = req.params
    actionDB.get(id)
    .then( action => {
        if (action) {
            res.status(200).json(action)
        } else {
            res.status(404).json({error : `action ${id} not found`})
        }
    })
    .catch( err => {
        res.status(500).json(err.message);
    })
});

actionRouter.post('/:id', (req,res) => {
    const action = req.body;
    console.log(action)
    actionDB.insert(action)
    .then( newaction => {
        res.status(201).json(newaction);
    })
    .catch( err => {
        res.status(500).json(err.message);
    })
});

actionRouter.put('/:id',(req, res)=>{
    const { id } = req.params;
    const {name, description} = req.body;

    actionDB.update(id , {name, description})
    .then(update => {
        if(update) {
            res.status(200).json(update)
        } else {
            res.status(500).json({err: `error in updating`})
        }
    })
    .catch( err => { console.log(err); res.status(500).json(err.message) })
});

actionRouter.delete('/:id', (req, res)=>{
    const { id } = req.params;
    actionDB.remove(id)
    .then(()=> res.status(204).end())
    .catch(err=> {
        console.log(err);
        res.status(500).json({error: 'deleting error'})
    })
});

actionRouter.get('/:id/actions', (req,res)=>{
    const id = req.params;
    actionDB.getactionActions(id)
    .then(actions=>{
        res.status(200).json(actions);
    })
    .catch(err=>{
        res.status(500).json({err: "error in actions"})
    })
})


module.exports = actionRouter;