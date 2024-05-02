import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import { RootState } from "../redux/store";

export default function SignIn() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loading, error: errorMsg} = useSelector((state: RootState) => state.user)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (formData) => {
        console.log(formData);

        try {
            dispatch(signInStart())
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message))
            }
            if (res.ok) {
                console.log(data)
                dispatch(signInSuccess(data.user))
                navigate('/');
            }
        } catch (error) {
            dispatch(signInFailure(error))
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
                        You can sign in with your email and password.
                    </p>
                </div>
                {/* right */}

                <div className='flex-1'>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
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
                                placeholder='**********'
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
                                'Sign In'
                            )}
                        </Button>
                    </form>
                    
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Dont Have an account?</span>
                        <Link to='/sign-up' className='text-blue-500'>
                            Sign Up
                        </Link>
                    </div>

                    {errorMsg && (
                        <div className='mt-5 error'>
                            {errorMsg}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
