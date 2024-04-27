const fastify = require("fastify");

const server = fastify({logger: true});

server
    .listen({port: 3001})
    .catch(console.error);

module.exports = {server};
