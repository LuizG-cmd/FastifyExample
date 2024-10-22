import prismaRepositorie from "../../lib/prisma";

import {
  LoginRequest,
  UserRequest,
  UserRequestUpdate,
} from "../user/IuserService";

import bcrypt from "bcrypt";

/*export class UserServices {*/
  async function getAllUsers() {
    const users = await prismaRepositorie.user.findMany();

    if(users.length === 0){
      throw new Error("Não existem usuários cadastrados")
    }

    return users
  }

  async function registerUniqueUser({ name, email, password }: UserRequest) {
    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await prismaRepositorie.user.create({
      data: {
        name,
        email,
        hashedpassword,
      },
    });

    if(!name || !email || !hashedpassword){
      throw new Error("Dados não preenchidos")
    }

    return user;
  }

  async function updateUniqueUser({ id, name, email, password }: UserRequestUpdate) {
    const hashedpassword = await bcrypt.hash(password, 10);
    

    const userUpdate = await prismaRepositorie.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        hashedpassword,
      },
    });

    if (!id) {
      throw new Error("Usuario não localizado");
    }

    return userUpdate;
  }

  async function loginUser({ email, password }: LoginRequest) {
    
    const findUser = await prismaRepositorie.user.findUnique({
      where: {
        email
      },
    });

    if (!findUser) {
      throw new Error("message:");
    }

    const matchuser = await bcrypt.compare(password, findUser.hashedpassword);

    if (!matchuser) {
      throw new Error("Email ou senha invalidas");
    }
  }

export default {
  getAllUsers,
  registerUniqueUser,
  updateUniqueUser,
  loginUser
}

