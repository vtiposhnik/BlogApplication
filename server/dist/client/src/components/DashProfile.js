var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { logOutSuccess } from "../redux/user/userSlice";
export default function DashProfile() {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const handleLogout = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch('/api/user/signout', {
                method: 'POST'
            });
            const data = yield res.json();
            if (!res.ok) {
                data.message;
            }
            else {
                dispatch(logOutSuccess());
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    return (_jsxs("section", { className: "flex flex-col gap-4 items-center p-6 text-center", children: [_jsx("h1", { children: "Profile" }), _jsx("div", { children: _jsx(Avatar, { size: 40, alt: "User settings", img: "https://flowbite.com/docs/images/people/profile-picture-5.jpg", rounded: true, bordered: true }) }), _jsxs("div", { id: 'user-info', className: "", children: [_jsxs("p", { children: [_jsx("i", { children: "User: " }), currentUser.username] }), _jsxs("p", { children: [_jsx("i", { children: "Email: " }), currentUser.email] }), _jsxs("p", { children: [_jsx("i", { children: "LastSeen: " }), currentUser.updatedAt] })] }), _jsx("div", { id: 'about', className: "w-[60%]", children: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta, impedit nulla. Fugiat voluptatum quos soluta omnis nulla, maiores ullam non earum deleniti harum eligendi aliquam temporibus nisi voluptate eos doloremque." }), _jsx(Button, { onClick: handleLogout, children: "Sign Out" })] }));
}
