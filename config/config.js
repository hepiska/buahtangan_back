require('dotenv').config()
module.exports = {
  "development": {
    "username": "ego",
    "password": "ego",
    "database": "buahtangan",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "logging":false
  },
  "test": {
    "username": "ego",
    "password": "ego",
    "database": "buahtangan",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "logging":false
  },
  "production": {
    "username": process.env.RDS_USERNAME || '',
    "password": process.env.RDS_PASSWORD || '',
    "database": process.env.RDS_DB_NAME || 'bukalelang-db',
    "host": process.env.RDS_HOSTNAME || '',
    "port": process.env.RDS_PORT || '5432',
    "dialect": "postgres",
    "logging":false
  }
}
