
module.exports = {
    PrincipalULR: 'http://localhost:3000',
    PagesList: ["Overview", "Tables", "Charts", "Companies", "Tickets", "Account", "Messages"],
    managerPagesList: ["Overview", "Tables", "Tickets", "Account"],
    ActionsList: ["use", "edit"],

    permissionCaracterListSimple: /[^a-z0-9]/gi,
    permissionCaracterList: /[^@+a-z0-9]/gi,
    permissionCaracterListSupport: /[@+a-z0-9]/gi,
    listOfAllowedCharactersEmail: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g,
    listOfAllowedCharactersMessage: /[^a-zA-Z0-9.@!#$%&'*´+`\/=?^_~-]/g,

    connectionTypeDashboard: "AdminDash",
    connectionTypeManager: "CompanyCnn",
    connectionTypeUser: "CompanyAcc",
    connectionTypeContact: "ContactMe",

    db_connect_success: "DB :: Conectato",
    db_connect_error: "500 Internal Server Error :: 1",

    errors: {
        "400": {
            status: 400,
            message: "The request cannot be fulfilled due to bad syntax",
        },
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