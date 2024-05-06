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
const react_redux_1 = require("react-redux");
const userSlice_1 = require("../redux/user/userSlice");
const react_error_boundary_1 = require("react-error-boundary");
function SignIn() {
    var _a, _b;
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const { loading, error: errorMsg } = (0, react_redux_1.useSelector)((state) => state.user);
    console.log(errorMsg);
    const { register, handleSubmit, formState: { errors }, } = (0, react_hook_form_1.useForm)();
    const onSubmit = (formData) => __awaiter(this, void 0, void 0, function* () {
        console.log(formData);
        try {
            dispatch((0, userSlice_1.signInStart)());
            const res = yield fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = yield res.json();
            if (data.success === false) {
                dispatch((0, userSlice_1.signInFailure)(data.message));
            }
            if (res.ok) {
                console.log(data);
                dispatch((0, userSlice_1.signInSuccess)(data.user));
                navigate('/');
            }
        }
        catch (error) {
            dispatch((0, userSlice_1.signInFailure)(error));
        }
    });
    return (React.createElement("div", { className: 'min-h-screen mt-20' },
        React.createElement("div", { className: 'flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5' },
            React.createElement("div", { className: 'flex-1' },
                React.createElement(react_router_dom_1.Link, { to: '/', className: 'font-bold dark:text-white text-4xl' },
                    React.createElement("span", { className: 'px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white' }, "Chebu"),
                    "Pizza"),
                React.createElement("p", { className: 'text-sm mt-5' }, "\u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0432\u043E\u0439\u0442\u0438 \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u0441\u0432\u043E\u0435\u0439 \u043F\u043E\u0447\u0442\u044B \u0438 \u043F\u0430\u0440\u043E\u043B\u044F.")),
            React.createElement("div", { className: 'flex-1' },
                React.createElement("form", { className: 'flex flex-col gap-4', onSubmit: handleSubmit(onSubmit) },
                    React.createElement("div", null,
                        React.createElement(flowbite_react_1.Label, { value: '\u0412\u0430\u0448\u0430 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0430\u044F \u043F\u043E\u0447\u0442\u0430' }),
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
                        React.createElement(flowbite_react_1.Label, { value: '\u0412\u0430\u0448 \u043F\u0430\u0440\u043E\u043B\u044C' }),
                        React.createElement(flowbite_react_1.TextInput, Object.assign({ required: true, type: 'password', placeholder: '**********', id: 'password' }, register('password', {
                            maxLength: 60,
                            validate: {
                                matchPattern: (value) => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)/.test(value),
                                minLength: (value) => value.length > 6
                            }
                        })))),
                    ((_a = errors.password) === null || _a === void 0 ? void 0 : _a.type) === 'matchPattern' && React.createElement("span", { className: "error" }, "\u041F\u0430\u0440\u043E\u043B\u044C \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043A\u0430\u043A \u043C\u0438\u043D\u0438\u043C\u0443\u043C \u043E\u0434\u043D\u0443 \u0437\u0430\u0433\u043B\u0430\u0432\u043D\u0443\u044E \u0431\u0443\u043A\u0432\u0443, \u0446\u0438\u0444\u0440\u0443 \u0438 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u0441\u0438\u043C\u0432\u043E\u043B!"),
                    ((_b = errors.password) === null || _b === void 0 ? void 0 : _b.type) === 'minLength' && React.createElement("span", { className: "error" }, " \u041F\u0430\u0440\u043E\u043B\u044C \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043A\u0430\u043A \u043C\u0438\u043D\u0438\u043C\u0443\u043C 6 \u0441\u0438\u043C\u0432\u043E\u043B!"),
                    React.createElement(flowbite_react_1.Button, { gradientDuoTone: 'purpleToPink', type: 'submit', disabled: loading }, loading ? (React.createElement(React.Fragment, null,
                        React.createElement(flowbite_react_1.Spinner, { size: 'sm' }),
                        React.createElement("span", { className: 'pl-3' }, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..."))) : ('Войти'))),
                React.createElement("div", { className: 'flex gap-2 text-sm mt-5' },
                    React.createElement("span", null, "\u041D\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u044B?"),
                    React.createElement(react_router_dom_1.Link, { to: '/sign-up', className: 'text-blue-500' }, "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F")),
                React.createElement(react_error_boundary_1.ErrorBoundary, { fallback: React.createElement("p", null, "\u26A0\uFE0F The 'errorMsg' is null!") }, errorMsg !== null && (React.createElement(flowbite_react_1.Alert, { className: 'mt-5' }, errorMsg)))))));
}
exports.default = SignIn;
