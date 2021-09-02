const { Name, Schema } = require("../../schemas/modelContactMe");
const { connectionTypeContact } = require("../../../constants");

const connectionContact = require("../../../database")(connectionTypeContact);

module.exports = connectionContact.model(Name, Schema);