import 'dotenv/config'

const server = require('fastify')()
server.register(require('@fastify/postgres'), {
    connectionString: process.env.DATABASE_URI // 'postgres://postgres:sRDD5c@localhost:5432/side-projects'
})

server.get('/ping', async (req:any, reply:any) => {
    return 'pong\n'
})

server.get('/users', function (req:any, reply:any) {
    server.pg.query(
        'SELECT id, full_name, hash, salt FROM users',
        function onResult (err:string, result:string) {
            reply.send(err || result)
        }
    )
})

server.listen({ port: 3001 }, (err:any, address:any) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})
