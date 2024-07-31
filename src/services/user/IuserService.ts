export interface UserRequest{
    name: string,
    email: string,
    password: string
}

export interface UserRequestUpdate{
    id: string,
    name: string,
    email: string,
    password: string
}

export interface LoginRequest{
    email: string,
    password: string
}