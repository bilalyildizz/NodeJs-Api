var express = require('express');
var router = express.Router();
const User = require('../db/models/Users');
const Enum = require('../config/Enum');
const CustomError = require('../lib/Error');
const bcrypt = require('bcrypt');
const is_js = require('is_js');
const Response = require('../lib/Response');
const Role = require('../db/models/Roles');
const UserRole = require('../db/models/UserRoles');

/* GET users listing. */
router.get('/', async function(req, res, next) {
    try{
        let users = await User.find({});
        res.send(Response.successResponse(users, Enum.HTTP_CODES.OK));
    }catch(error){
        let errorResponse = Response.errorResponse(error);
        res.status(errorResponse.status).send(errorResponse);
    }
});

router.post('/add', async (req, res) => {
  let body = req.body;

  try{
    if(!body.email) throw new CustomError('Validation Error', 'Email is required', Enum.HTTP_CODES.BAD_REQUEST);

    if(is_js.not.email(body.email)) throw new CustomError('Validation Error', 'Invalid email', Enum.HTTP_CODES.BAD_REQUEST);
    if(!body.password) throw new CustomError('Validation Error', 'Password is required', Enum.HTTP_CODES.BAD_REQUEST);

    let hashedPassword = await bcrypt.hash(body.password, 10);

    if(!body.roles || !Array.isArray(body.roles) || body.roles.length === 0) throw new CustomError('Validation Error', 'Roles are required', Enum.HTTP_CODES.BAD_REQUEST);

    let roles = await Role.find({role_name: {$in: body.roles}});
    if(roles.length === 0) throw new CustomError('Validation Error', 'Roles not found', Enum.HTTP_CODES.BAD_REQUEST);



    let user = await User.create({
      email: body.email,
      password: hashedPassword,
      first_name: body.first_name,  
      last_name: body.last_name,
      phone_number: body.phone_number
    }); 

    for(let role of roles){
      await UserRole.create({
        user_id: user._id,
        role_id: role._id,
        created_by: req.user?._id
      });
    }

    res.status(Enum.HTTP_CODES.CREATED).send(Response.successResponse({success: true}, Enum.HTTP_CODES.CREATED));
  }catch(error){
    let errorResponse = Response.errorResponse(error);
    res.status(errorResponse.code).send(errorResponse);
  }
});



router.post('/update', async (req, res) => {
  let body = req.body;

  try{
    if(!body._id) throw new CustomError('Validation Error', 'User ID is required', Enum.HTTP_CODES.BAD_REQUEST);
    console.log(body);
    let updates = {};

    if(body.password && body.password.length >= Enum.PASSWORD_MIN_LENGTH){
      let hashedPassword = await bcrypt.hash(body.password, 10);
      updates.password = hashedPassword;
    }

    if(typeof body.is_active === 'boolean') updates.is_active = body.is_active;
    if(body.first_name) updates.first_name = body.first_name;
    if(body.last_name) updates.last_name = body.last_name;
    if(body.phone_number) updates.phone_number = body.phone_number;

    if(Array.isArray(body.roles) && body.roles.length > 0){
      let userRoles = await UserRole.find({user_id: body._id});

      let removedRoles = userRoles.filter(role => !body.roles.includes(role.role_id.toString()));
      let addedRoles = body.roles.filter(role => !userRoles.some(userRole => userRole.role_id.toString() === role));

      for(let role of removedRoles){
        await UserRole.deleteOne({_id: role._id.toString()});
      }

      for(let role of addedRoles){
        await UserRole.create({user_id: body._id, role_id: role, created_by: req.user?._id});
      }
    };



    let user = await User.updateOne({_id: body._id}, updates);
    res.send(Response.successResponse(user, Enum.HTTP_CODES.OK));
  }catch(error){  
    let errorResponse = Response.errorResponse(error);
    res.status(errorResponse.code).send(errorResponse);
  }
});


router.post('/delete', async (req, res) => {
  let body = req.body;

  try{  
    if(!body._id) throw new CustomError('Validation Error', 'User ID is required', Enum.HTTP_CODES.BAD_REQUEST);
    let user = await User.deleteOne({_id: body._id});

    await UserRole.deleteMany({user_id: body._id});

    res.send(Response.successResponse(user, Enum.HTTP_CODES.OK));
  }catch(error){
    let errorResponse = Response.errorResponse(error);
    res.status(errorResponse.code).send(errorResponse);
  }
});

router.post('/register', async (req, res) => {
  let body = req.body;
  console.log(body);
  try{

    let checkUser = await User.findOne({});
    if(checkUser){
      console.log(checkUser);
      return res.sendStatus(Enum.HTTP_CODES.NOT_FOUND);
    }

    if(!body.email) throw new CustomError('Validation Error', 'Email is required', Enum.HTTP_CODES.BAD_REQUEST);

    if(is_js.not.email(body.email)) throw new CustomError('Validation Error', 'Invalid email', Enum.HTTP_CODES.BAD_REQUEST);
    if(!body.password) throw new CustomError('Validation Error', 'Password is required', Enum.HTTP_CODES.BAD_REQUEST);

    let hashedPassword = await bcrypt.hash(body.password, 10);

    let createdUser = await User.create({
      email: body.email,
      password: hashedPassword,
      first_name: body.first_name,  
      last_name: body.last_name,
      phone_number: body.phone_number
    }); 

    console.log(createdUser);

    let role = await Role.create({
      role_name: Enum.SUPER_ADMIN,
      is_active: true,
      created_by: createdUser._id
    });

    // await UserRole.create({
    //   user_id: createdUser._id,
    //   role_id: role._id,
    //   created_by: createdUser._id
    // });
    
    res.status(Enum.HTTP_CODES.CREATED).send(Response.successResponse({success: true}, Enum.HTTP_CODES.CREATED));

  }catch(error){
    let errorResponse = Response.errorResponse(error);
    res.status(errorResponse.code).send(errorResponse);
  }
});


module.exports = router;
