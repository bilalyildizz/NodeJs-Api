const passport = require('passport');
const {ExtractJwt, Strategy} = require('passport-jwt');
const Users = require('../db/models/Users');
const config = require('../config');
const UserRoles = require('../db/models/UserRoles');
const RolePrivileges = require('../db/models/RolePrivileges');

module.exports = function() {
    let strategy = new Strategy({
        secretOrKey: config.JWT.SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }, async (payload, done) => {

        try {
            let user = await Users.findOne({_id: payload._id});
            if(user) {

                let userRoles = await UserRoles.find({userId: user._id});

                let rolePrivileges = await RolePrivileges.find({roleId: {$in: userRoles.map(role => role.roleId)}});

                done(null, {
                    id: user._id,
                    roles: rolePrivileges,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    exp: parseInt(Date.now() / 1000) + config.JWT.EXPIRE_TIME
                });

            } 
            else {
                    return done(new Error('User not found'), null);
                }
        } catch (error) {
            return done(error, null);
        }
    })

    passport.use(strategy);

    return {
        initialize: function (){
            return passport.initialize();
        },
        authenticate: function (){
            return passport.authenticate('jwt', {session: false});
        }
    }
}
