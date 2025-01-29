import {FC, useState} from 'react';
import {useForm} from "react-hook-form";
import {authService} from "../services/authService";
import {useNavigate} from "react-router-dom";

interface IProps {

}

export interface ILogInForm {
    username: string
    password: string
}

const LogInPage: FC<IProps> = () => {
    const [error, setError] = useState<string | null>(null)
    const {handleSubmit, register, formState: {errors}} = useForm<ILogInForm>()
    const navigate = useNavigate();
    const handleLogin = async (data: ILogInForm) => {
        try {
            const res = await authService.login(data)
            if (res.data.token) {
                localStorage.setItem('token', res.data.token)
            }
            navigate('/')
        } catch (e:any) {
            // setError('Username or password is incorrect')
            if (e.response && e.response.status === 401) {
                setError('Username or password is incorrect');
            } else {
                setError('An error occurred, please try again later.');
            }
        }
    }


    return (
        <div className={'flex justify-between'}>
            <div>
                <h2>Stay stylish with us!</h2>
                <p>
                    Log in or sign up to access exclusive collections, special offers, and personalized recommendations.
                    <b> Quick and easy</b> – your perfect outfit is waiting!
                </p>
            </div>
            <form onSubmit={handleSubmit(handleLogin)} className={'bg-blue-300 w-2/3 p-4'}>
                <h2 className={'text-2xl font-medium'}>Log-In now</h2>
                <div className={'flex flex-col gap-5 mt-3 mb-5'}>
                    <input
                        className={'px-2.5 py-1.5 rounded'}
                        type="text"
                        {...register('username', {required: 'username is required'})}
                        placeholder={'mor_2314'}/>
                    {errors.username && <p className={'text-red-600'}>{errors.username?.message}</p>}
                    <input
                        className={'px-2.5 py-1.5 rounded'}
                        type="password"
                        {...register('password', {required: 'password is required'})}
                        placeholder={'83r5^_'}/>
                    {errors.password && <p className={'text-red-600'}>{errors.password?.message}</p>}
                </div>
                {error && <p className={'text-red-600'}>{error}</p>}
                <button className={'bg-blue-500 px-3 py-2 w-full text-2xl text-white font-semibold'}>
                    Log in
                </button>
            </form>
        </div>
    );
};

export {LogInPage};