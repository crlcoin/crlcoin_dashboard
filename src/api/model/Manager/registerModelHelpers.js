const { Name, Schema } = require("../../schemas/modelHelp");
const { connectionTypeUser } = require("../../../constants");

const connection = require("../../../database")(connectionTypeUser);

module.exports = connection.model(Name, Schema);