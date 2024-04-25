export interface ILoginProps {
    email: string,
    password: string
}

export interface ISignUpProps {
    email: string,
    password: string,
    name: string,
    phone: string,
    address: string,
    dateOfBirth: string,
    gender: string,
    status: boolean,
    roleId: number
}