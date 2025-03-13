import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, Button } from '@mantine/core'; 
import TextInputField from '../../Forms/TextInputField';
import BackgroundImage from '../../assets/loginBG.png';
import { yupResolver } from '@hookform/resolvers/yup';
import Logo from '../../assets/newLogo.png';
import LoginSchema from './LoginSchema';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext/AuthProvider';
import PasswordInput from '../../Forms/PasswordInput';
import { useLoginMutation } from '../../Service/Apis';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [LoginApi, { isLoading }] = useLoginMutation();

    const [errorMessage, setErrorMessage] = useState(''); 

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(LoginSchema),
    });

    const onSubmit = async (data) => {
        try {
            console.log('Login Data', data);
            const result = await LoginApi(data).unwrap();
            console.log('Login Success:', result);
            setErrorMessage('');
            login(); 
            reset(); 
            navigate('/dashboard/home'); 
            } catch (err) {
            console.error('Login Failed:', err);
            setErrorMessage('Login failed , Please check your credentials.');
            }
        };

    return (
        <section 
            className='flex flex-col justify-start items-center w-full h-screen' 
            style={{
                backgroundImage: `url(${BackgroundImage})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
            }}
        >
            <div className="w-full flex justify-center">
                <img src={Logo} alt="Querium" className="!w-80 !h-80" />
            </div>
            <Card className='shadow-2xl py-4 rounded-2xl w-full max-w-[500px] bg-white'>
                {errorMessage && (
                    <div className="text-white bg-red-500 -mt-4 p-2 text-center font-semibold mb-4 rounded-t-lg">
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }} className='space-y-4 px-4'>
                    <TextInputField
                        control={control}
                        name="email"
                        placeholder="Enter Admin Email"
                        error={errors.email?.message}
                        label="Email"
                    />
                    <PasswordInput
                        control={control}
                        name="password"
                        placeholder="Enter Admin Password"
                        error={errors.password?.message}
                        label="Password"
                    />
                    <Button
                        type="submit"
                        className='bg-main w-full text-center text-white text-2xl font-bold rounded-2xl p-2 !mt-7'
                        loading={isLoading}
                        disabled ={isLoading}
                        loaderProps={{ type: "dots" }}
                    >
                        Login
                    </Button>
                </form>
            </Card>
        </section>
    );
};

export default Login;
