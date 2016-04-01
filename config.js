var config = {}

config.mongodb = {};
config.mongodb.host = process.env.MONGO_PORT_27017_TCP_ADDR;
config.mongodb.port = process.env.MONGO_PORT_27017_TCP_PORT;

module.exports = config;
