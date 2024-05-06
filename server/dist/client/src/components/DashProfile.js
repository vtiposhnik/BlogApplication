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
const react_redux_1 = require("react-redux");
const userSlice_1 = require("../redux/user/userSlice");
function DashProfile() {
    const { currentUser } = (0, react_redux_1.useSelector)((state) => state.user);
    const dispatch = (0, react_redux_1.useDispatch)();
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
                dispatch((0, userSlice_1.logOutSuccess)());
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    return (React.createElement("section", { className: "flex flex-col gap-4 items-center p-6 text-center" },
        React.createElement("h1", null, "Profile"),
        React.createElement("div", null,
            React.createElement(flowbite_react_1.Avatar, { size: 40, alt: "User settings", img: "https://flowbite.com/docs/images/people/profile-picture-5.jpg", rounded: true, bordered: true })),
        React.createElement("div", { id: 'user-info', className: "" },
            React.createElement("p", null,
                React.createElement("i", null, "User: "),
                currentUser.username),
            React.createElement("p", null,
                React.createElement("i", null, "Email: "),
                currentUser.email),
            React.createElement("p", null,
                React.createElement("i", null, "LastSeen: "),
                currentUser.updatedAt)),
        React.createElement("div", { id: 'about', className: "w-[60%]" }, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta, impedit nulla. Fugiat voluptatum quos soluta omnis nulla, maiores ullam non earum deleniti harum eligendi aliquam temporibus nisi voluptate eos doloremque."),
        React.createElement(flowbite_react_1.Button, { onClick: handleLogout }, "Sign Out")));
}
exports.default = DashProfile;
