const express = require('express');
const projectRouter = express.Router();

const projectDB = require('../data/helpers/projectModel');

const router = express.Router();


projectRouter.get('/', (req,res) => {
    projectDB.get()
    .then( projects => {
        res.status(200).json(projects);
    })
    .catch( err => {
        res.status(500).json(err);
    })
});

projectRouter.get('/:id', (req,res) => {
    const {id} = req.params
    projectDB.get(id)
    .then( project => {
        if (project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({error : `project ${id} not found`})
        }
    })
    .catch( err => {
        res.status(500).json(err.message);
    })
});

projectRouter.post('/:id', (req,res) => {
    const project = req.body;
    console.log(project)
    projectDB.insert(project)
    .then( newProject => {
        res.status(201).json(newProject);
    })
    .catch( err => {
        res.status(500).json(err.message);
    })
});

projectRouter.put('/:id',(req, res)=>{
    const { id } = req.params;
    const {name, description} = req.body;

    projectDB.update(id , {name, description})
    .then(update => {
        if(update) {
            res.status(200).json(update)
        } else {
            res.status(500).json({err: `error in updating`})
        }
    })
    
    .catch( err => { console.log(err); res.status(500).json(err.message) })

})

// function validateProjectId(req, res, next) {
//     const { id } = req.params;
//     projectDB.getById(id)
//       .then(user => {
//         if (user) {
//           req.user = user;
//           next();
//         } else {
//           res.status(404).json({error: "User with id does not exist"});
//         }
//       });
//   };



module.exports = projectRouter;