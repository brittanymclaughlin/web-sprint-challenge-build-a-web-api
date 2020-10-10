const express = require("express");
const data = require("./projectModel.js");
const router = express.Router();

//get project by id
router.get('/:id', idVal,   async (req, res)=> {
    const { id } = req.params;
    const receive = await data.get(id);
    res.status(200).json(receive);
});

//add a new project
router.post("/", postVal, async (req,res)=>{
    const { name, description } = req.body;
    const addProject = await data.insert({name, description});
    res.status(201).json(addProject);
});

//delete a project
router.delete("/:id", idVal, async (req, res)=>{
    const { id } = req.params;
    const Remove = await data.remove(id);
    res.status(200).json(Remove);
});

//update a project
router.put("/:id", idVal, postVal, async (req,res)=>{
    const { id } = req.params; 
    const { name, description } = req.body;
    const Change = await data.update(id, { name, description });
    res.status(200).json(Change);
});


// MIDDLEWARE SECTION

async function postVal (req, res, next){
    const { name, description } = req.body;
    switch(!name || !description){
        case true: 
            res.status(400).json({ error: "Please enter a valid input!" });
        
        default:
            next();
    };
};

async function idVal (req,res,next){
    const { id } = req.params;
    const idValidator = await data.get(id);
    switch(idValidator===null){
        case true: 
            res.status(404).json({ error: "Please enter a valid ID!" });
        
        default:
            next();
    }
};

module.exports = router;