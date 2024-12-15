module.exports = {
    privilegeGroups: [
        {
            id: "USERS",
            name : "User Permissions"
        },
        {
            id: "ROLES",
            name : "Role Permissions"
        },
        {
            id: "CATEGORIES",
            name : "Category Permissions"
        },
        {
            id: "AUDITLOGS",
            name : "Audit Logs Permissions"
        }
    ],

    privileges: [ 
        {
            id: "user_view",
            name : "User View",
            group: "USERS",
            description: "User View"
        },
        {
            id: "user_add",
            name : "User Add",
            group: "USERS",
            description: "User Add"
        },
        {
            id: "user_update",
            name : "User Update",
            group: "USERS",
            description: "User Update"
        },
        {
            id: "user_delete",
            name : "User Delete",
            group: "USERS",
            description: "User Delete"
        },
        {
            id: "role_view",
            name : "Role View",
            group: "ROLES",
            description: "Role View"    
        },
        {
            id: "role_add",
            name : "Role Add",
            group: "ROLES",
            description: "Role Add"
        },
        {
            id: "role_update",
            name : "Role Update",
            group: "ROLES",
            description: "Role Update"
        },
        {
            id: "role_delete",
            name : "Role Delete",
            group: "ROLES",
            description: "Role Delete"
        },
        {
            id: "category_view",
            name : "Category View",
            group: "CATEGORIES",
            description: "Category View"
        },
        {
            id: "category_add",
            name : "Category Add",
            group: "CATEGORIES",
            description: "Category Add"
        },
        {
            id: "category_update",
            name : "Category Update",
            group: "CATEGORIES",
            description: "Category Update"
        },
        {
            id: "category_delete",
            name : "Category Delete",
            group: "CATEGORIES",
            description: "Category Delete"
        },
        {
            id: "auditlog_view",
            name : "Audit Log View",
            group: "AUDITLOGS",
            description: "Audit Log View"
        }
    ]
}