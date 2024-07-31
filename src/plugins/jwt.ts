import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import fp from "fastify-plugin"

import fastifyJwt from "@fastify/jwt";


declare module 'fastify' {
  interface FastifyInstance {
      authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

const jwtPlugin = async (app: FastifyInstance) =>{
    app.register(fastifyJwt,{
        secret: 'supersecret'
    })


   app.decorate("authenticate", async function(request: FastifyRequest, reply: FastifyReply) {
        try {
          await request.jwtVerify()
        } catch (err) {
          reply.send(err)
        }
 })
} 

export default fp(jwtPlugin, '4.x')
