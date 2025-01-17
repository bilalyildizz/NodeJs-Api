const express = require('express');
const router = express.Router();
const Categories = require('../db/models/Categories');
const Response = require('../lib/Response');
const CustomError = require('../lib/Error');
const Enum = require('../config/Enum');
const AuditLogs = require('../lib/AuditLogs');
const Logger = require('../lib/logger/LoggerClass');

router.get('/', async (req, res) => {
    try{
        const categories = await Categories.find({is_active: true});
        res.send(Response.successResponse(categories, 200));
    }catch(error){
        let errorResponse = Response.errorResponse(error);
        res.status(errorResponse.code).send(errorResponse);
    }
});

router.post('/add', async (req, res) => {
    let body = req.body;
    try{

        if(!body.name) throw new CustomError('Validation Error', 'Name is required', Enum.HTTP_CODES.BAD_REQUEST);

        let category =  new Categories({
            name: body.name,
            is_active: true,
            created_by: req.user?._id
        });

        await category.save();
        AuditLogs.info(req.user?.email, 'Categories', 'add', category);
        Logger.info(req.user?.email, 'Categories', 'add', category);
        res.send(Response.successResponse(category, Enum.HTTP_CODES.CREATED));
    }catch(error){
        let errorResponse = Response.errorResponse(error);
        res.status(errorResponse.code).send(errorResponse);
    }
});

router.post('/update', async (req, res) => {
    let body = req.body;
    try{

        if(!body.id) throw new CustomError('Validation Error', 'Id is required', Enum.HTTP_CODES.BAD_REQUEST);

        let updates = {};
        if(body.name) updates.name = body.name;
        if(typeof body.is_active === 'boolean') updates.is_active = body.is_active;

        let category = await Categories.updateOne({_id: body.id}, updates);
        res.send(Response.successResponse(category, Enum.HTTP_CODES.OK));
    }catch(error){
        let errorResponse = Response.errorResponse(error);
        res.status(errorResponse.code).send(errorResponse);
    }
});

router.post('/delete', async (req, res) => {
    let body = req.body;
    try{
        if(!body.id) throw new CustomError('Validation Error', 'Id is required', Enum.HTTP_CODES.BAD_REQUEST);
        let category = await Categories.deleteOne({_id: body.id});
        res.send(Response.successResponse(category, Enum.HTTP_CODES.OK));
    }catch(error){
        let errorResponse = Response.errorResponse(error);
        res.status(errorResponse.code).send(errorResponse);
    }
});

module.exports = router;