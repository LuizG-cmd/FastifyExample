import { FastifyReply, FastifyRequest } from "fastify";
/*import { UserServices } from "../../../services/user/userServices";*/
import { sendMailer } from "../../../utils/emailsender";
import userServices from "../../../services/user/userServices"

export async function getUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /*const userServices = new UserServices();*/

    const result = await userServices.getAllUsers();

    reply
      .status(200)
      /*.send({ Usuarios: result[0].name });*/
      .send({result})
  } catch {
    reply.status(400).send("Não existem usuarios cadastrados");
  }
}

export async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  /*const userServices = new UserServices();*/

  const { name, email, password } = request.body as {
    name: string;
    email: string;
    password: string;
  };

  try {

    const saveUser = await userServices.registerUniqueUser({
      name,
      email,
      password,
    });

    const send = sendMailer(email, name);

    reply.status(201).send({
      message: "Usuario criado com sucesso",
    });
  } catch{
   reply.status(400).send({message: "Usuario ja existe"})
  }
}

export async function updateUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
 /* const userServices = new UserServices();*/

  const { id } = request.query as { id: string };

  const { name, email, password } = request.body as {
    name: string;
    email: string;
    password: string;
  };

  if (!name && !email && !password) {
    throw new Error("Preencha pelo menos um campo");
  }

  try {
    const updateUser = await userServices.updateUniqueUser({
      id,
      name,
      email,
      password,
    });

    reply.status(200).send({
      message: "Usuario atualizado com sucesso",
    });
  } catch (err) {
    reply.status(400).send({
      message: "Preencha pelo menos um campo",
    });
  }
}

export async function authenticateUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email, password } = request.body as {
    email: string;
    password: string;
  };

  try {
    /*const userServices = new UserServices();*/

    const login = await userServices.loginUser({ email, password });

    /*await request.server.createtoken(request, reply);*/

    /*const token = reply.send({ message: "Logado com sucesso" }).status(200).jwtSign({ email });*/
  } catch (err) {
    reply.status(401).send({ message: "Bad Authorization" });
  }
}

