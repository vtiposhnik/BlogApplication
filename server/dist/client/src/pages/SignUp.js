var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
export default function SignUp() {
    var _a, _b, _c, _d;
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors }, } = useForm();
    const password = watch('password', '');
    const onSubmit = (formData) => __awaiter(this, void 0, void 0, function* () {
        console.log(formData);
        try {
            setLoading(true);
            setErrorMsg(null);
            const res = yield fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = yield res.json();
            if (data.success === false) {
                console.log("unsuccessfull", errorMsg);
                return setErrorMsg(data.message);
            }
            setLoading(false);
            if (res.ok) {
                console.log("successfull", data.message);
                navigate('/signin');
            }
        }
        catch (error) {
            console.log("in Catch", errorMsg);
            setErrorMsg(error.message);
            setLoading(false);
        }
    });
    return (_jsx("div", { className: 'min-h-screen mt-20', children: _jsxs("div", { className: 'flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5', children: [_jsxs("div", { className: 'flex-1', children: [_jsxs(Link, { to: '/', className: 'font-bold dark:text-white text-4xl', children: [_jsx("span", { className: 'px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white', children: "Chebu" }), "Pizza"] }), _jsx("p", { className: 'text-sm mt-5', children: "You can sign up with your email and password." })] }), _jsxs("div", { className: 'flex-1', children: [_jsxs("form", { className: 'flex flex-col gap-4', onSubmit: handleSubmit(onSubmit), children: [_jsxs("div", { children: [_jsx(Label, { value: 'Your username' }), _jsx(TextInput, Object.assign({ required: true, type: 'text', placeholder: 'Username', id: 'username' }, register('username', {
                                            maxLength: 40
                                        })))] }), _jsxs("div", { children: [_jsx(Label, { value: 'Your email' }), _jsx(TextInput, Object.assign({ required: true, type: 'email', placeholder: 'name@company.com', id: 'email' }, register(('email'), {
                                            maxLength: 60,
                                            pattern: {
                                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message: "Invalid Email!"
                                            }
                                        })))] }), errors.email && (_jsxs("span", { className: "error", children: [" ", (_a = errors.email.message) === null || _a === void 0 ? void 0 : _a.toString(), " "] })), _jsxs("div", { children: [_jsx(Label, { value: 'Your password' }), _jsx(TextInput, Object.assign({ required: true, type: 'password', placeholder: 'Password', id: 'password' }, register('password', {
                                            maxLength: 60,
                                            validate: {
                                                matchPattern: (value) => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)/.test(value),
                                                minLength: (value) => value.length > 6
                                            }
                                        })))] }), ((_b = errors.password) === null || _b === void 0 ? void 0 : _b.type) === 'matchPattern' && _jsx("span", { className: "error", children: " Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol." }), ((_c = errors.password) === null || _c === void 0 ? void 0 : _c.type) === 'minLength' && _jsx("span", { className: "error", children: " Password should be at least 6 characters!" }), _jsxs("div", { children: [_jsx(Label, { value: 'Confirm password' }), _jsx(TextInput, Object.assign({ required: true, type: 'password', placeholder: 'Password', id: 'password' }, register(('passwordConfirm'), {
                                            maxLength: 60,
                                            minLength: {
                                                value: 6,
                                                message: "Password should be at least 6 characters!"
                                            },
                                            validate: (value) => value === password || "Passwords do not match!"
                                        })))] }), errors.passwordConfirm && _jsxs("span", { className: "error", children: [" ", (_d = errors.passwordConfirm.message) === null || _d === void 0 ? void 0 : _d.toString(), " "] }), _jsx(Button, { gradientDuoTone: 'purpleToPink', type: 'submit', disabled: loading, children: loading ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { size: 'sm' }), _jsx("span", { className: 'pl-3', children: "Loading..." })] })) : ('Sign Up') })] }), _jsxs("div", { className: 'flex gap-2 text-sm mt-5', children: [_jsx("span", { children: "Have an account?" }), _jsx(Link, { to: '/sign-in', className: 'text-blue-500', children: "Sign In" })] }), errorMsg && (_jsx(Alert, { className: 'mt-5', color: 'failure', children: errorMsg.toString() }))] })] }) }));
}
