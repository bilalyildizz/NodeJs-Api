const mongoose = require('mongoose');
const RolePrivilege = require('./RolePrivileges');

const RoleSchema = new mongoose.Schema({
    role_name: {type: String, required: true, unique: true},
    is_active: {type: Boolean, default: true},
    created_by: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
    }},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);       

class Roles extends mongoose.Model{
    static async deleteOne(query){
        if(query._id){
            await RolePrivilege.deleteMany({role_id: query._id});
        }
        return await super.deleteOne(query); 
    }

}

RoleSchema.loadClass(Roles);
module.exports = mongoose.model('roles', RoleSchema);

