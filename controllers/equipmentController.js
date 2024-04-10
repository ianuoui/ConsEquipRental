const asyncHandler = require('express-async-handler')
const Equipment = require('../models/equipmentModel')

//GET
const getEquip = asyncHandler(async (req, res) => {
    // res.status(200).json({message: 'Code to get all Equipments'});
    if (req.params.categoryId){
        const equipByCatId = await Equipment.find({categoryId: req.params.categoryId});
            if(!equipByCatId){
                res.status(400);
                throw new Error('Category does not have Equipments.');
            } else {
                res.status(200).json(equipByCatId);                    
            }
    } else{
        const allEquipments = await Equipment.find()
        res.status(200).json(allEquipments);
    }        
})

//POST
const createEquip = asyncHandler(async (req,res) => {
    //console.log(req.body);
    if(!req.body.name || !req.body.categoryId){
        //res.status(400).json({message: 'Please enter Equipment details...'});
        res.status(400);
        throw new Error('CategoryID or Equipment Name missing ..');
    }
    //res.status(200).json({message: 'Code to create a new Equipment'});
    const newEquip = await Equipment.create({
        categoryId : req.body.categoryId,
        name : req.body.name,
        price : req.body.price,
        currencyCode : req.body.currencyCode
    });
    res.status(200).json(newEquip);
})


//PUT
const updateEquip = asyncHandler(async (req,res) => {
    //res.status(200).json({message: `Code to update an Equipment : ${req.params.id}`});
    const upEquip = await Equipment.findById(req.params.id);
    if(!upEquip){
        res.status(400);
        throw new Error('Equipment not found.');
    }

    const updEquipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updEquipment);
})

//DELETE
const deleteEquip = asyncHandler(async (req,res) => {
    //res.status(200).json({message: `Code to delete an Equipment : ${req.params.id}`});
    const delEquip = await Equipment.findById(req.params.id)
    if(!delEquip){
        res.status(400)
        throw new Error('Equipment not found')
    }
    await Category.findByIdAndDelete(req.params.id)
    res.status(200).json({id: req.params.id})
})

module.exports = { getEquip, createEquip, updateEquip, deleteEquip};