import prismaRepositorie from "../../lib/prisma";

import {
  LoginRequest,
  UserRequest,
  UserRequestUpdate,
} from "../user/IuserService";

import bcrypt from "bcrypt";

export class UserServices {
  async getAllUsers() {
    const users = await prismaRepositorie.user.findMany();

    return users;
  }

  async registerUniqueUser({ name, email, password }: UserRequest) {
    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await prismaRepositorie.user.create({
      data: {
        name,
        email,
        hashedpassword,
      },
    });

    return user;
  }

  async updateUniqueUser({ id, name, email, password }: UserRequestUpdate) {
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
      return new Error("Usuario não localizado");
    }

    return userUpdate;
  }

  async loginUser({ email, password }: LoginRequest) {
    const findUser = await prismaRepositorie.user.findFirst({
      where: {
        email,
      },
    });

    if (!findUser) {
      throw new Error("Usuario não existe");
    }

    const matchuser = await bcrypt.compare(password, findUser.hashedpassword);

    if (!matchuser) {
      throw new Error("Email ou senha invalidas");
    }
  }
}
