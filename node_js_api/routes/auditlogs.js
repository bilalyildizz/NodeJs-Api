const express = require('express');
const router = express.Router();
const moment = require('moment');
const AuditLogs = require('../db/models/AuditLogs');
const Response = require('../lib/Response');
const Enum = require('../config/Enum');


router.post('/', async (req, res) => {
    try{
        let body = req.body;
        let query = {};
        let skip = 0;
        let limit = 500;

        if(typeof body.skip !== "numeric")
            skip = 0;

        if(typeof body.limit !== "numeric" || body.limit > 500 || body.limit < 1)
            limit = 500;

        if(body.begin_date && body.end_date){
            query.created_at = {$gte: moment(body.begin_date), $lte: moment(body.end_date)};
        }else{
            query.created_at = {$gte: moment().subtract(1, 'day').startOf('day')};
        } 

        let auditLogs = await AuditLogs.find(query)
            .limit(limit)
            .sort({created_at: -1})
            .skip(skip);
        console.log(auditLogs);
        res.send(Response.successResponse(auditLogs, Enum.HTTP_CODES.OK));
    
    }catch(error){
        let errorResponse = Response.errorResponse(error);
        res.status(errorResponse.code).send(errorResponse);
    }
});

module.exports = router;