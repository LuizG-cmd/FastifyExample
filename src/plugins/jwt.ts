import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import fp from "fastify-plugin"

import fastifyJwt from "@fastify/jwt";


declare module 'fastify' {
  interface FastifyInstance {
      authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
      createtoken: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
  }
}

const jwtPlugin = async (app: FastifyInstance) =>{


  console.log('Registrando o plugin JWT');
    app.register(fastifyJwt,{
        secret: 'supersecret'
    })

    app.decorate('createtoken', async function(request: FastifyRequest, reply: FastifyReply){
      try {

        const message = 
        app.jwt.sign({"message":
          "Oi, estou funcionando"
        })

        reply.send(message)
     
      } catch(err){
        
        console.log(err)
      }
    })


   app.decorate('authenticate', async function(request: FastifyRequest, reply: FastifyReply) {
 
    try {
          request.jwtVerify()
        } catch{
          reply.send("não foi possivel localizar o token")
        }
 })
} 

export default fp(jwtPlugin, '4.x')
