const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')

//GET
const getOrder = asyncHandler(async (req,res) => {
    //res.status(200).json({message: 'Code to get all Orders by UserID'});
    if (!req.query.userId){
        res.status(400);
        throw new Error('Cannot retrieve orders without an UserId.');
    } else {        
        const ordByUserId = await Order.find({userId: req.query.userId});
        if(!ordByUserId){             
            res.status(400);
            throw new Error('No orders found for this UserId.');
        } else {             
            res.status(200).json(ordByUserId);                    
        }
    }    
})

//POST
const createOrder = asyncHandler(async (req,res) => {
    //res.status(200).json({message: 'Code to create an order'});
    //console.log(req.body.userId);     
    if (!req.body.userId){              
        res.status(400);
        throw new Error('Cannot create an Order without an UserId.');
    } else {         
        const newOrder = await Order.create({
            userId : req.body.userId,
            orderType : req.body.orderType,                        
            orderTotal : req.body.orderTotal,    
            equipments : req.body.equipments,
            address : req.body.address,
            orderTotal : req.body.orderTotal          
        });
        res.status(200).json(newOrder);
    }
})

//PUT
const updateOrder = asyncHandler(async (req,res) => {
    //res.status(200).json({message: 'Code to update an order'});
    const upOrd = await Order.findById(req.params.id);
    if(!upOrd){
        res.status(400);
        throw new Error('Order not found.');
    }

    const updOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updOrder);
})

//DELETE
const deleteOrder = asyncHandler(async (req,res) => {
    //res.status(200).json({message: 'Code to delete an order'});
    const delOrder = await Order.findById(req.params.id)
    if(!delOrder){
        res.status(400)
        throw new Error('Order not found')
    }
    await Order.findByIdAndDelete(req.params.id)
    res.status(200).json({id: req.params.id})
})

module.exports = {getOrder, createOrder, updateOrder, deleteOrder};