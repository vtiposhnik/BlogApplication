import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useState } from "react";

export default function SignUp() {
    const [errorMsg, setErrorMsg] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const password = watch('password', '')



    const onSubmit = async (formData) => {
        console.log(formData);

        try {
            setLoading(true);
            setErrorMsg(null);
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                console.log("unsuccessfull", errorMsg)

                return setErrorMsg(data.message);
            }
            setLoading(false);
            if (res.ok) {
                console.log("successfull", data.message)
                navigate('/signin');
            }
        } catch (error) {
            console.log("in Catch", errorMsg)
            setErrorMsg(error.message);
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen mt-20'>
            <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
                {/* left */}
                <div className='flex-1'>
                    <Link to='/' className='font-bold dark:text-white text-4xl'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                            Chebu
                        </span>
                        Pizza
                    </Link>
                    <p className='text-sm mt-5'>
                        You can sign up with your email and password.
                    </p>
                </div>
                {/* right */}

                <div className='flex-1'>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Label value='Your username' />
                            <TextInput
                                required
                                type='text'
                                placeholder='Username'
                                id='username'
                                {...register('username', {
                                    maxLength: 40
                                })}
                            />
                        </div>
                        <div>
                            <Label value='Your email' />
                            <TextInput
                                required
                                type='email'
                                placeholder='name@company.com'
                                id='email'
                                {...register(('email'), {
                                    maxLength: 60,
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "Invalid Email!"
                                    }
                                })}
                            />
                        </div>
                        {errors.email && (<span className="error"> {errors.email.message} </span>)}

                        <div>
                            <Label value='Your password' />
                            <TextInput
                                required
                                type='password'
                                placeholder='Password'
                                id='password'
                                {...register('password', {
                                    maxLength: 60,
                                    validate: {
                                        matchPattern: (value) =>
                                            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)/.test(
                                                value
                                            ),
                                        minLength: (value) => value.length > 6
                                    }
                                })}
                            />
                        </div>
                        {errors.password?.type === 'matchPattern' && <span className="error"> Password should contain at least one uppercase letter, lowercase
                            letter, digit, and special symbol.</span>}
                        {errors.password?.type === 'minLength' && <span className="error"> Password should be at least 6 characters!</span>}

                        <div>
                            <Label value='Confirm password' />
                            <TextInput
                                required
                                type='password'
                                placeholder='Password'
                                id='password'
                                {...register(('passwordConfirm'), {
                                    maxLength: 60,
                                    minLength: {
                                        value: 6,
                                        message: "Password should be at least 6 characters!"
                                    },
                                    validate: (value) => value === password || "Passwords do not match!"
                                })}
                            />
                        </div>
                        {errors.passwordConfirm && <span className="error"> {errors.passwordConfirm.message} </span>}

                        <Button
                            gradientDuoTone='purpleToPink'
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner size='sm' />
                                    <span className='pl-3'>Loading...</span>
                                </>
                            ) : (
                                'Sign Up'
                            )}
                        </Button>
                    </form>
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Have an account?</span>
                        <Link to='/sign-in' className='text-blue-500'>
                            Sign In
                        </Link>
                    </div>
                    {errorMsg && (
                        <Alert className='mt-5' color='failure'>
                            {errorMsg}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
}
