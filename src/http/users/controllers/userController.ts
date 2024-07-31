import { FastifyReply, FastifyRequest } from "fastify";
import { UserServices } from "../../../services/user/userServices"
import { sendMailer } from "../../../utils/emailsender";
import { STATUS_CODES } from "http";



export async function getUserController(request: FastifyRequest, reply: FastifyReply){

    const userServices = new UserServices()

try{
    const result = await userServices.getAllUsers()
    reply.send({result})
}catch(err){
    throw new Error("Usuarios não localizados")
}
    

}

export async function registerUserController(request: FastifyRequest, reply: FastifyReply){

    const userServices = new UserServices()

    const { name, email, password } = request.body as { name: string, email: string, password: string}

    const saveUser = await userServices.registerUniqueUser({name, email, password})

    const send = sendMailer(email, name)

    reply.send({
        message: "Usuario criado com sucesso"
    })
}

export async function updateUserController(request: FastifyRequest, reply: FastifyReply){

    const userServices = new UserServices()

    const { id } = request.query as {id: string}

    const { name, email, password } = request.body as { name: string, email: string, password: string}

    if(!name && !email && !password){
        throw new Error("Preencha pelo menos um campo")
    }

    const updateUser = await userServices.updateUniqueUser({id, name, email, password})

    reply.status(200).send({
        message: "Usuario atualizado com sucesso"
    })
}

export async function authenticateUser(request: FastifyRequest, reply: FastifyReply){
    
    const userServices = new UserServices()

    const { email, password } = request.body as {email: string, password: string}

    const login = await userServices.loginUser({email, password})

    const token = reply.jwtSign({email})

    console.log(token)

}
