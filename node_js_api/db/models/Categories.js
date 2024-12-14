const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    is_active: {type: Boolean, default: true},
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

class Categories extends mongoose.Model{}

CategorySchema.loadClass(Categories);
module.exports = mongoose.model('categories', CategorySchema);

