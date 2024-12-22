const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
    level: {type: String, required: true},
    email: String,
    location: String,
    proc_type: String,
    log: mongoose.Schema.Types.Mixed,
},
    {
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);       

class AuditLogs extends mongoose.Model{}

AuditLogSchema.loadClass(AuditLogs);
module.exports = mongoose.model('audit_logs', AuditLogSchema);

