const mongoose = require('mongoose');

const UserRoleSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    role_id: {type: mongoose.Schema.Types.ObjectId, ref: 'roles', required: true},
    created_by: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},

},
    {
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);       

class UserRoles extends mongoose.Model{}

UserRoleSchema.loadClass(UserRoles);
module.exports = mongoose.model('user_roles', UserRoleSchema);

