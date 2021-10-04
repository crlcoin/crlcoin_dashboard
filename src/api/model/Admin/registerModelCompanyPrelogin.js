const { Name, Schema } = require("../../schemas/modelCompanyPrelogin");
const { connectionTypeDashboard } = require("../../../constants");

const connectionAdmin = require("../../../database")(connectionTypeDashboard);

module.exports = connectionAdmin.model(Name, Schema);