const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    role_name: {type: String, required: true},
    is_active: {type: Boolean, default: true},
    created_by: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users',
        required: true 
    }},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);       

class Roles extends mongoose.Model{}

RoleSchema.loadClass(Roles);
module.exports = mongoose.model('roles', RoleSchema);

