import { FastifyInstance, RouteOptions } from "fastify"

import { authenticateUser, getUserController, registerUserController,updateUserController} from "../controllers/userController"


export async function userRoutes(app: FastifyInstance, options: any){
    app.get('/', getUserController)
    app.post('/register', registerUserController)
    app.put('/update', updateUserController)
    app.post('/login', authenticateUser)
    app.get('/protected',{onRequest:app.authenticate}, getUserController)
}