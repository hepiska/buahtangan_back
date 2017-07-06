require('dotenv').config()
module.exports = {
  "development": {
    "username": "ego",
    "password": "ego",
    "database": "buahtangan",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "logging": false,
  },
  "test": {
    "username": "jvwrmmzwcpqyrd",
    "password": "382cfd844cd6a50a22abbca39777409ac54a2e0dbf36965665aa964376343e81",
    "database": "d8ano12tlk1j6l",
    "host": "ec2-54-235-120-39.compute-1.amazonaws.com",
    "dialect": "postgres",
    "logging": false,
    "dialectOptions":{
      "ssl":{
       "require":true
       }
     }
  },
  "production": {
    "username": process.env.DO_USERNAME || '',
    "password": process.env.DO_PASSWORD || '',
    "database": process.env.DATABASE || '',
    "host": process.env.HOST || '',
    "port": process.env.PORT || '5432',
    "dialect": "postgres",
    "logging":false
  }
}
