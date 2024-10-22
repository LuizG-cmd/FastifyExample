import fastify from 'fastify'
import { userRoutes } from './src/http/users/routes/routes'

import { sendMailer } from './src/utils/emailsender'

import jwtPlugin from "./src/plugins/jwt"


/* Implantar o envio do e-mail quando usuario é registrado ------ Feito de forma mais ou menos, dar uma olhada a fundo */
/* Adicionar codigos HTTP */
/* Consertar update, só funciona se preencher todos os campos*/
/* Tipar de forma correta meus dados */


const app = fastify({logger: true})


app.register(jwtPlugin)
app.register(userRoutes)
/*app.register(sendMailer)*/

app.listen({ port: 3000 }, function (err, address) {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }else {
      console.log(`Servidor rodando na porta ${address}`)
    }
})