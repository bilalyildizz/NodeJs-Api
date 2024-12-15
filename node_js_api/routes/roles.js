const express = require('express');
const router = express.Router();
const Enum = require('../config/Enum');
const CustomError = require('../lib/Error');
const Response = require('../lib/Response');

const Role = require('../db/models/Roles');
const RolePrivilege = require('../db/models/RolePrivileges');

const role_privileges = require('../config/role_privileges');


router.get('/', async (req, res) => {
    try{
        let roles = await Role.find({});
        res.send(Response.successResponse(roles, Enum.HTTP_CODES.OK));
    }catch(error){
        let errorResponse = Response.errorResponse(error);
        res.status(errorResponse.code).send(errorResponse);
    }
});

router.post('/add', async (req, res) => {
    try{
        let body = req.body;
        if(!body.role_name) throw new CustomError('Validation Error', 'Role name is required', Enum.HTTP_CODES.BAD_REQUEST);
        if(!body.permissions || !Array.isArray(body.permissions) || body.permissions.length === 0) 
            throw new CustomError('Validation Error', 'Permissions are required', Enum.HTTP_CODES.BAD_REQUEST);

        let role = new Role({
            role_name: body.role_name,
            is_active: true,
            created_by: req.user?._id
        });
        await role.save();

        for(let permission of body.permissions){
            let rolePrivilege = new RolePrivilege({
                role_id: role._id,
                permission: permission,
                created_by: req.user?._id
            });
            await rolePrivilege.save();
        }

        res.send(Response.successResponse(role, Enum.HTTP_CODES.OK));
    }catch(error){
        let errorResponse = Response.errorResponse(error);
        res.status(errorResponse.code).send(errorResponse);
    }
});

router.post('/update', async (req, res) => {
    try{
        let body = req.body;    
        if(!body._id) throw new CustomError('Validation Error', 'Id is required', Enum.HTTP_CODES.BAD_REQUEST);
        if(!body.role_name) throw new CustomError('Validation Error', 'Role name is required', Enum.HTTP_CODES.BAD_REQUEST);

        let updates = {};
        if(body.role_name) updates.role_name = body.role_name;
        if( typeof body.is_active === 'boolean') updates.is_active = body.is_active;

        if(body.permissions && Array.isArray(body.permissions) && body.permissions.length > 0){
            let permissions = await RolePrivilege.find({role_id: body._id});

            let removedPermissions = permissions.filter(p => !body.permissions.includes(p.permission));
            let addedPermissions = body.permissions.filter(p => !permissions.some(p2 => p2.permission === p));

            if(removedPermissions.length > 0){
                console.log('Removing permissions:', removedPermissions);
                const result = await RolePrivilege.deleteMany({_id: {$in: removedPermissions.map(p => p._id)}});
                console.log('Deletion result:', result);
            }

            for(let permission of addedPermissions){
                let rolePrivilege = new RolePrivilege({
                    role_id: body._id,
                    permission: permission,
                    created_by: req.user?._id
                });
                await rolePrivilege.save();
            }
        }
        
        await Role.updateOne({_id: body._id}, updates);
        res.send(Response.successResponse(updates, Enum.HTTP_CODES.OK));
    }catch(error){
        let errorResponse = Response.errorResponse(error);
        res.status(errorResponse.code).send(errorResponse);
    }
});

router.post('/delete', async (req, res) => {
    try{
        let body = req.body;
        if(!body._id) throw new CustomError('Validation Error', 'Id is required', Enum.HTTP_CODES.BAD_REQUEST);

        await Role.deleteOne({_id: body._id});
        res.send(Response.successResponse(null, Enum.HTTP_CODES.OK));   

    }catch(error){
        let errorResponse = Response.errorResponse(error);
        res.status(errorResponse.code).send(errorResponse);
    }
}); 

router.get('/role_privileges', async (req, res) => {
    res.send(Response.successResponse(role_privileges, Enum.HTTP_CODES.OK));
});

module.exports = router;