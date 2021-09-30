const { Name, Schema } = require("../../schemas/modelTablesData");
const { connectionTypeDashboard } = require("../../../constants");

const connectionAdmin = require("../../../database")(connectionTypeDashboard);

module.exports = connectionAdmin.model(Name, Schema);