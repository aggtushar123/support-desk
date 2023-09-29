const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketsModel')
 
const getTickets = asyncHandler(async(req,res) =>{
    
    //get user using thw id in JWT

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const tickets = await Ticket.find({user:req.user.id})


    res.status(200).json(tickets)
})

//get single ticket 
const getTicket = asyncHandler(async(req,res) =>{
    
    //get user using thw id in JWT

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user.id){
        req.status(401)
        throw new Error('Not Authorized')
    }

    res.status(200).json(ticket)
})

 
 
const createTicket = asyncHandler(async(req,res) =>{

    const {product, description} = req.body

    if(!product || !description){
        res.status(400)
        throw new Error('Enter product and description')
    }
    

    const ticket = await Ticket.create({
        product,
        description,
        user : req.user.id,
        status : 'new' 
    })
    res.status(200).json(ticket)
})


//Delete ticket 
const deleteTicket = asyncHandler(async(req,res) =>{
    
    //get user using thw id in JWT

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user.id){
        req.status(401)
        throw new Error('Not Authorized')
    }
    await Ticket.findOneAndDelete(req.params.id)

    res.status(200).json({success: true})
})


//update ticket 
const updateTicket = asyncHandler(async(req,res) =>{
    
    //get user using thw id in JWT

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user.id){
        req.status(401)
        throw new Error('Not Authorized')
    }
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new  : true})
    res.status(200).json(updatedTicket)
})
module.exports ={
    getTickets,
    createTicket,
    getTicket,
    deleteTicket,
    updateTicket
}