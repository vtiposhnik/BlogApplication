"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const flowbite_react_1 = require("flowbite-react");
const react_router_dom_1 = require("react-router-dom");
const react_hook_form_1 = require("react-hook-form");
const react_1 = require("react");
function SignUp() {
    var _a, _b;
    const [errorMsg, setErrorMsg] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { register, handleSubmit, watch, formState: { errors }, } = (0, react_hook_form_1.useForm)();
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
    return (React.createElement("div", { className: 'min-h-screen mt-20' },
        React.createElement("div", { className: 'flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5' },
            React.createElement("div", { className: 'flex-1' },
                React.createElement(react_router_dom_1.Link, { to: '/', className: 'font-bold dark:text-white text-4xl' },
                    React.createElement("span", { className: 'px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white' }, "Chebu"),
                    "Pizza"),
                React.createElement("p", { className: 'text-sm mt-5' }, "You can sign up with your email and password.")),
            React.createElement("div", { className: 'flex-1' },
                React.createElement("form", { className: 'flex flex-col gap-4', onSubmit: handleSubmit(onSubmit) },
                    React.createElement("div", null,
                        React.createElement(flowbite_react_1.Label, { value: 'Your username' }),
                        React.createElement(flowbite_react_1.TextInput, Object.assign({ required: true, type: 'text', placeholder: 'Username', id: 'username' }, register('username', {
                            maxLength: 40
                        })))),
                    React.createElement("div", null,
                        React.createElement(flowbite_react_1.Label, { value: 'Your email' }),
                        React.createElement(flowbite_react_1.TextInput, Object.assign({ required: true, type: 'email', placeholder: 'name@company.com', id: 'email' }, register(('email'), {
                            maxLength: 60,
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "Invalid Email!"
                            }
                        })))),
                    errors.email && (React.createElement("span", { className: "error" },
                        " ",
                        errors.email.message,
                        " ")),
                    React.createElement("div", null,
                        React.createElement(flowbite_react_1.Label, { value: 'Your password' }),
                        React.createElement(flowbite_react_1.TextInput, Object.assign({ required: true, type: 'password', placeholder: 'Password', id: 'password' }, register('password', {
                            maxLength: 60,
                            validate: {
                                matchPattern: (value) => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)/.test(value),
                                minLength: (value) => value.length > 6
                            }
                        })))),
                    ((_a = errors.password) === null || _a === void 0 ? void 0 : _a.type) === 'matchPattern' && React.createElement("span", { className: "error" }, " Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol."),
                    ((_b = errors.password) === null || _b === void 0 ? void 0 : _b.type) === 'minLength' && React.createElement("span", { className: "error" }, " Password should be at least 6 characters!"),
                    React.createElement("div", null,
                        React.createElement(flowbite_react_1.Label, { value: 'Confirm password' }),
                        React.createElement(flowbite_react_1.TextInput, Object.assign({ required: true, type: 'password', placeholder: 'Password', id: 'password' }, register(('passwordConfirm'), {
                            maxLength: 60,
                            minLength: {
                                value: 6,
                                message: "Password should be at least 6 characters!"
                            },
                            validate: (value) => value === password || "Passwords do not match!"
                        })))),
                    errors.passwordConfirm && React.createElement("span", { className: "error" },
                        " ",
                        errors.passwordConfirm.message,
                        " "),
                    React.createElement(flowbite_react_1.Button, { gradientDuoTone: 'purpleToPink', type: 'submit', disabled: loading }, loading ? (React.createElement(React.Fragment, null,
                        React.createElement(flowbite_react_1.Spinner, { size: 'sm' }),
                        React.createElement("span", { className: 'pl-3' }, "Loading..."))) : ('Sign Up'))),
                React.createElement("div", { className: 'flex gap-2 text-sm mt-5' },
                    React.createElement("span", null, "Have an account?"),
                    React.createElement(react_router_dom_1.Link, { to: '/sign-in', className: 'text-blue-500' }, "Sign In")),
                errorMsg && (React.createElement(flowbite_react_1.Alert, { className: 'mt-5', color: 'failure' }, errorMsg))))));
}
exports.default = SignUp;
