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
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import { ErrorBoundary } from 'react-error-boundary';
export default function SignIn() {
    var _a, _b, _c;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error: errorMsg } = useSelector((state) => state.user);
    console.log(errorMsg);
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const onSubmit = (formData) => __awaiter(this, void 0, void 0, function* () {
        console.log(formData);
        try {
            dispatch(signInStart());
            const res = yield fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = yield res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message));
            }
            if (res.ok) {
                console.log(data);
                dispatch(signInSuccess(data.user));
                navigate('/');
            }
        }
        catch (error) {
            dispatch(signInFailure(error));
        }
    });
    return (_jsx("div", { className: 'min-h-screen mt-20', children: _jsxs("div", { className: 'flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5', children: [_jsxs("div", { className: 'flex-1', children: [_jsxs(Link, { to: '/', className: 'font-bold dark:text-white text-4xl', children: [_jsx("span", { className: 'px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white', children: "Chebu" }), "Pizza"] }), _jsx("p", { className: 'text-sm mt-5', children: "\u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0432\u043E\u0439\u0442\u0438 \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u0441\u0432\u043E\u0435\u0439 \u043F\u043E\u0447\u0442\u044B \u0438 \u043F\u0430\u0440\u043E\u043B\u044F." })] }), _jsxs("div", { className: 'flex-1', children: [_jsxs("form", { className: 'flex flex-col gap-4', onSubmit: handleSubmit(onSubmit), children: [_jsxs("div", { children: [_jsx(Label, { value: '\u0412\u0430\u0448\u0430 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0430\u044F \u043F\u043E\u0447\u0442\u0430' }), _jsx(TextInput, Object.assign({ required: true, type: 'email', placeholder: 'name@company.com', id: 'email' }, register(('email'), {
                                            maxLength: 60,
                                            pattern: {
                                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message: "Invalid Email!"
                                            }
                                        })))] }), errors.email && (_jsxs("span", { className: "error", children: [" ", (_a = errors.email.message) === null || _a === void 0 ? void 0 : _a.toString(), " "] })), _jsxs("div", { children: [_jsx(Label, { value: '\u0412\u0430\u0448 \u043F\u0430\u0440\u043E\u043B\u044C' }), _jsx(TextInput, Object.assign({ required: true, type: 'password', placeholder: '**********', id: 'password' }, register('password', {
                                            maxLength: 60,
                                            validate: {
                                                matchPattern: (value) => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)/.test(value),
                                                minLength: (value) => value.length > 6
                                            }
                                        })))] }), ((_b = errors.password) === null || _b === void 0 ? void 0 : _b.type) === 'matchPattern' && _jsx("span", { className: "error", children: "\u041F\u0430\u0440\u043E\u043B\u044C \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043A\u0430\u043A \u043C\u0438\u043D\u0438\u043C\u0443\u043C \u043E\u0434\u043D\u0443 \u0437\u0430\u0433\u043B\u0430\u0432\u043D\u0443\u044E \u0431\u0443\u043A\u0432\u0443, \u0446\u0438\u0444\u0440\u0443 \u0438 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u0441\u0438\u043C\u0432\u043E\u043B!" }), ((_c = errors.password) === null || _c === void 0 ? void 0 : _c.type) === 'minLength' && _jsx("span", { className: "error", children: " \u041F\u0430\u0440\u043E\u043B\u044C \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043A\u0430\u043A \u043C\u0438\u043D\u0438\u043C\u0443\u043C 6 \u0441\u0438\u043C\u0432\u043E\u043B!" }), _jsx(Button, { gradientDuoTone: 'purpleToPink', type: 'submit', disabled: loading, children: loading ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { size: 'sm' }), _jsx("span", { className: 'pl-3', children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..." })] })) : ('Войти') })] }), _jsxs("div", { className: 'flex gap-2 text-sm mt-5', children: [_jsx("span", { children: "\u041D\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u044B?" }), _jsx(Link, { to: '/sign-up', className: 'text-blue-500', children: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F" })] }), _jsx(ErrorBoundary, { fallback: _jsx("p", { children: "\u26A0\uFE0F The 'errorMsg' is null!" }), children: errorMsg !== null && (_jsx(Alert, { className: 'mt-5', children: errorMsg })) })] })] }) }));
}
