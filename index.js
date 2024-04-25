import Fastify from 'fastify'
import cors from '@fastify/cors'

const fastify = Fastify()
await fastify.register(cors, {
    // put your options here
})

fastify.get('/', (req, reply) => {
    reply.send({ hello: 'world' })
})

await fastify.listen({ port: 3001 })