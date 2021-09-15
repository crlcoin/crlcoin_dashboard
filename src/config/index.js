if (!process.env.NODE_ENV) {
    require('dotenv').config()
}

module.exports = {
    SESSION_SECRET: process.env.SESSI_SECRET,
    CAPTCHA_SECRET: process.env.GGL_SECRET,
    SITE_URL: process.env.SITE_URL,
    PORT: process.env.PORT,
    databaseReadAndWriteDashboard: process.env.DB_RW_DASH,
    databaseReadCompanyTablesDatas: process.env.DB_OR_DASH,
    databaseReadAndWriteManagerLogins: process.env.DB_RW_DASH_LG,
    databaseReadAndWriteContactmeMessage: process.env.DB_RW_MAIL
}