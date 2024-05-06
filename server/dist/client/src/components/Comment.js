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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const react_1 = require("react");
const fa_1 = require("react-icons/fa");
const react_redux_1 = require("react-redux");
const flowbite_react_1 = require("flowbite-react");
function Comment({ comment }) {
    const [user, setUser] = (0, react_1.useState)({});
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    const [editedContent, setEditedContent] = (0, react_1.useState)(comment.content);
    const { currentUser } = (0, react_redux_1.useSelector)((state) => state.user);
    (0, react_1.useEffect)(() => {
        const getUser = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch(`/api/user/${comment.userId}`);
                const data = yield res.json();
                if (res.ok) {
                    setUser(data);
                }
            }
            catch (error) {
                console.log(error.message);
            }
        });
        getUser();
    }, [comment]);
    const handleSave = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(`/api/comment/editComment/${comment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: editedContent,
                }),
            });
            if (res.ok) {
                setIsEditing(false);
            }
        }
        catch (error) {
            console.log(error.message);
        }
    });
    return (React.createElement("div", { className: 'flex p-4 border-b dark:border-gray-600 text-sm' },
        React.createElement("div", { className: 'flex-shrink-0 mr-3' },
            React.createElement("img", { className: 'w-10 h-10 rounded-full bg-gray-200', src: user.profilePicture, alt: user.username })),
        React.createElement("div", { className: 'flex-1' },
            React.createElement("div", { className: 'flex items-center mb-1' },
                React.createElement("span", { className: 'font-bold mr-1 text-xs truncate' }, user ? `@${user.username}` : 'anonymous user'),
                React.createElement("span", { className: 'text-gray-500 text-xs' }, (0, moment_1.default)(comment.createdAt).fromNow())),
            isEditing ? (React.createElement(React.Fragment, null,
                React.createElement(flowbite_react_1.Textarea, { className: 'mb-2', value: editedContent, onChange: (e) => setEditedContent(e.target.value) }),
                React.createElement("div", { className: 'flex justify-end gap-2 text-xs' },
                    React.createElement(flowbite_react_1.Button, { type: 'button', size: 'sm', gradientDuoTone: 'purpleToBlue', onClick: handleSave }, "Save"),
                    React.createElement(flowbite_react_1.Button, { type: 'button', size: 'sm', gradientDuoTone: 'purpleToBlue', outline: true, onClick: () => setIsEditing(false) }, "Cancel")))) : (React.createElement(React.Fragment, null,
                React.createElement("p", { className: 'text-gray-500 pb-2' }, comment.content),
                React.createElement("div", { className: 'flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2' },
                    React.createElement("button", { type: 'button', className: `text-gray-400 hover:text-blue-500` },
                        React.createElement(fa_1.FaThumbsUp, { className: 'text-sm' })),
                    React.createElement("p", { className: 'text-gray-400' }, "1 like"),
                    currentUser &&
                        (currentUser._id === comment.userId || currentUser.isAdmin) && (React.createElement(React.Fragment, null,
                        React.createElement("button", { type: 'button', className: 'text-gray-400 hover:text-blue-500' }, "Edit"),
                        React.createElement("button", { type: 'button', className: 'text-gray-400 hover:text-red-500' }, "Delete")))))))));
}
exports.default = Comment;
