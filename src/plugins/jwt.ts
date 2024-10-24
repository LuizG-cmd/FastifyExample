import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import fp from "fastify-plugin"

import fastifyJwt from "@fastify/jwt";


declare module 'fastify' {
  interface FastifyInstance {
      authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
      createtoken: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
  }
}

const JWT_SECRET = process.env.JWT_SECRET_KEY || "TESTE"

const jwtPlugin = async (app: FastifyInstance) => {

    app.register(fastifyJwt,{
        secret: JWT_SECRET
      })


    console.log(JWT_SECRET)

    app.decorate('createtoken', async function(request: FastifyRequest, reply: FastifyReply){
  

        const token = app.jwt.sign(
          {
            object: request.body
          },
          {
            expiresIn: "24h"
          }
        )

        reply.send({message:"Logado com sucesso",
          token
        })
     
    })


    app.decorate('authenticate', async function(request: FastifyRequest, reply: FastifyReply) {
 
    try {
          request.jwtVerify()
        } catch (err){
          reply.status(400).send("Error")
        }

    
    })
} 

export default fp(jwtPlugin, '4.x')
