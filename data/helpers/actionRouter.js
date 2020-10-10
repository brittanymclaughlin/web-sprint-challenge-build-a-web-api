const express = require("express");
const data = require("./actionModel.js");
const router = express.Router();

//get actions for a specified project id
router.get("/:id", idVal, async (req,res)=>{
    const { id } = req.params;
    const receive = await data.get(id);
    res.status(200).json(receive);
});

//add actions for a specified project id
router.post("/:id",idVal, async (req,res)=>{
    const { id } = req.params;
    const { description, notes } = req.body;
    const addAction = await data.insert({ project_id: id, description, notes });
    res.status(201).json(addAction);
});

//removes actions for a specified project id
router.delete("/:id", async (req,res)=>{
    const { id } = req.params;
    const del = await data.remove(id);
    if (del){
        res.status(200).json({ message: "Action was deleted!"});
    } else {
        res.status(404).json({ error: "Wrong ID!" })
    }
});

//updates actions for a specified project id
router.put("/:id", async (req, res)=>{
    const { id } = req.params;
    const { description, notes, project_id } = req.body;
    const change = await data.update(id,{ project_id, description, notes })
    res.status(201).json(change);
})


// VALIDATION MIDDLEWARE SECTION

async function idVal (req,res,next){
    const { id } = req.params;
    const idValidator = await data.get(id);
    switch(idValidator===null){
        case true: 
            res.status(404).json({ error: "This project has no actions or project ID is wrong. Try again!" });
        
        default:
            next();
    };
}

module.exports = router;