if (!process.env.NODE_ENV) {
    require('dotenv').config()
}

module.exports = {
    SITE_URL: process.env.SITE_URL,
    PORT: process.env.PORT,
    databaseReadAndWriteDashboard: process.env.DB_RW_DASH,
    databaseReadDashboardTablesDatasAndPrelogins: process.env.DB_OR_DASH,
    databaseReadAndWriteManagerLogins: process.env.DB_RW_DASH_LG,
    databaseReadAndWriteContactmeMessage: process.env.DB_RW_MAIL
}