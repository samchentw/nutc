
module.exports = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "",
    "database": "nest",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "seeds": ["src/**/*.seed.ts"],
    "synchronize": true
 }



//mongodb
// module.exports = {
//     "type": "mongodb",
//     "url": "mongodb+srv://[username]:[password]@cluster0-sghzp.mongodb.net/[database]?retryWrites=true&w=majority",
//     "entities": ["dist/**/*.entity{.ts,.js}"],
//     "synchronize": false,
//     "useUnifiedTopology": true 
// }