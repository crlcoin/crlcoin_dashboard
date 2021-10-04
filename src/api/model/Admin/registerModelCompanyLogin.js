const { Name, Schema } = require("../../schemas/modelCompanyLogin");
const { connectionTypeManager } = require("../../../constants");

const connectionManager = require("../../../database")(connectionTypeManager);

module.exports = connectionManager.model(Name, Schema);