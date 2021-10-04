const {
  databaseReadAndWriteDashboard,
  databaseReadAndWriteManagerLogins,
  databaseReadCompanyTablesDatas,
  databaseReadAndWriteContactmeMessage,
} = require("../config");

const {
  connectionTypeDashboard,
  connectionTypeManager,
  connectionTypeUser,
  connectionTypeContact,
  db_connect_error,
} = require("../constants");

const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const mongoose = require("mongoose");

const connectUser = mongoose.createConnection(
  databaseReadCompanyTablesDatas,
  mongoConfig
);

const connectContact = mongoose.createConnection(
  databaseReadAndWriteContactmeMessage,
  mongoConfig
);

const connectManager = mongoose.createConnection(
  databaseReadAndWriteManagerLogins,
  mongoConfig
);

const connectAdmin = mongoose.createConnection(
  databaseReadAndWriteDashboard,
  mongoConfig
);

mongoose.Promise = global.Promise;

connectUser.on("error", () => {
  console.info(":: User connection error ::")
  // connectUser.close()
});

connectContact.on("error", () => {
  console.info(":: Contact connection error ::")
  // connectContact.close()
});

connectManager.on("error", () => {
  console.info(":: Manager connection error ::")
  // connectManager.close()
});

connectAdmin.on("error", () => {
  console.info(":: Dashboard connection error ::")
  // connectAdmin.close()
});

module.exports = (connectionType) => {
  switch (connectionType) {
    case connectionTypeUser:
      return connectUser;

    case connectionTypeContact:
      return connectContact;

    case connectionTypeManager:
      return connectManager;

    case connectionTypeDashboard:
      return connectAdmin;

    default:
      throw db_connect_error;
  }
};