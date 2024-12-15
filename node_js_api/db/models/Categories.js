const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    is_active: {type: Boolean, default: true},
    created_by: {type: mongoose.Schema.Types.ObjectId},

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

