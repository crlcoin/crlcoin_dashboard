
module.exports = {
    PrincipalULR: 'https://localhost:3000',
    PagesList: ["App", "Tables", "Charts", "Companies", "Tickets", "Account", "Settings"],
    ActionsList: ["use", "edit"],

    permissionCaracterListSimple: /[^a-z0-9]/gi,
    permissionCaracterList: /[^@+a-z0-9]/gi,

    connectionTypeDashboard: "AdminDash",
    connectionTypeManager: "CompanyCnn",
    connectionTypeUser: "CompanyAcc",
    connectionTypeContact: "ContactMe",

    db_connect_success: "DB :: Conectato",
    db_connect_error: "500 Internal Server Error :: 1",

    errors: {
        "404": {
            status: 404,
            message: "Page Not Found",
        },
        "500": {
            status: 500,
            message: "Internal Server Error"
        }
    },

    accessPagesList: [
        {
            data: "tables",
            permission: [ "create", "update", "delete" ]
        },
        {
            data: "charts",
            permission: [ "create", "update", "delete" ]
        },
        {
            data: "companies",
            permission: [ "create", "update", "delete" ]
        },
        {
            data: "tickets",
            permission: [ "create", "update", "delete" ]
        },
        {
            data: "account",
            permission: [ "create", "update", "delete" ]
        }
    ]
}