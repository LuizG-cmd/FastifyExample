import fastify from 'fastify'
import { userRoutes } from './src/http/users/routes/routes'

import { sendMailer } from './src/utils/emailsender'

import jwtPlugin from "./src/plugins/jwt"


/* Senhas sendo geradas iguais mesmo com e-mail diferente ----- Substituida biblioteca crypto do node pela biblioteca bcrypt*/
/* Colocar o JWT nas rotas, ou nas classes?*/
/* Encapsular o hashpassword em um plugin? ----- Substituida biblioteca crypto do node pela biblioteca bcrypt */
/* Implantar o envio do e-mail quando usuario é registrado ------ Feito de forma mais ou menos, dar uma olhada a fundo */
/* Adicionar codigos HTTP */
/* Verificar se o e-mail ja existe na base de dados */
/* Consertar update, só funciona se preencher todos os campos*/
/* O que fazer com o token gerado na autenticação, como utilizar o verify da classe jwt */
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