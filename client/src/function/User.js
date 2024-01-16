import * as api from '../api/User'

export const LoginUser = async (user) => {
    try
    {
        const { data } = await api.LoginUser(user);
        return data;
    } catch (error)
    {
        console.log(error);
    }
}

export const RegisterUser = async (user) => {
    try
    {
        const { data } = await api.RegisterUser(user);
        return data;
    } catch (error)
    {
        console.log(error);
    }
}