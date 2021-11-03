
module.exports = {
    PagesList: ["Overview", "Tables", "Companies", "Help", "Guide", "Account", "Messages"],
    managerPagesList: ["Overview", "Tables", "Help", "Account"],
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

    account: 'wqxrffdqlofcvegppqe',
    manager: 'ffduhjdpcompkn',

    db_connect_success: "DB :: Conectato",
    db_connect_error: "500 Internal Server Error :: 1",

    errors: {
        "400": {
            status: 400,
            message: "The request cannot be fulfilled due to bad syntax",
        },
        "401": {
            status: 401,
            message: "Unauthorized"
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
            permission: ["create", "update", "delete"]
        },
        {
            data: "companies",
            permission: ["create", "update", "delete"]
        },
        {
            data: "help",
            permission: ["create", "update", "delete"]
        },
        {
            data: "account",
            permission: ["create", "update", "delete"]
        }
    ]
}