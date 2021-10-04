const { Name, Schema } = require("../../schemas/modelTablesConfig");
const { connectionTypeDashboard } = require("../../../constants");

const connectionAdmin = require("../../../database")(connectionTypeDashboard);

module.exports = connectionAdmin.model(Name, Schema);