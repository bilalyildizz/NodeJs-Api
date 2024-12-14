const mongoose = require('mongoose');

const RolePrivilegeSchema = new mongoose.Schema({
    role_id: {type: mongoose.Schema.Types.ObjectId, ref: 'roles', required: true},
    permission: {type: String, required: true},
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

class RolePrivileges extends mongoose.Model{}

RolePrivilegeSchema.loadClass(RolePrivileges);
module.exports = mongoose.model('role_privileges', RolePrivilegeSchema);

