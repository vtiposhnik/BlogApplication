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
const flowbite_react_1 = require("flowbite-react");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const Comment_1 = __importDefault(require("./Comment"));
const hi_1 = require("react-icons/hi");
function CommentSection({ postId }) {
    const { currentUser } = (0, react_redux_1.useSelector)((state) => state.user);
    const [comment, setComment] = (0, react_1.useState)('');
    const [commentError, setCommentError] = (0, react_1.useState)(null);
    const [comments, setComments] = (0, react_1.useState)([]);
    const [showModal, setShowModal] = (0, react_1.useState)(false);
    const [commentToDelete, setCommentToDelete] = (0, react_1.useState)(null);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        if (comment.length > 200) {
            return;
        }
        try {
            const res = yield fetch('/api/comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: comment,
                    postId,
                    userId: currentUser._id,
                }),
            });
            const data = yield res.json();
            if (res.ok) {
                setComment('');
                setCommentError(null);
                setComments([data, ...comments]);
            }
        }
        catch (error) {
            setCommentError(error.message);
        }
    });
    (0, react_1.useEffect)(() => {
        const getComments = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch(`/api/comment/getPostComments/${postId}`);
                if (res.ok) {
                    const data = yield res.json();
                    setComments(data);
                }
            }
            catch (error) {
                console.log(error.message);
            }
        });
        getComments();
    }, [postId]);
    return (React.createElement("div", { className: 'max-w-2xl mx-auto w-full p-3' },
        currentUser ? (React.createElement("div", { className: 'flex items-center gap-1 my-5 text-gray-500 text-sm' },
            React.createElement("p", null, "Signed in as:"),
            React.createElement("img", { className: 'h-5 w-5 object-cover rounded-full', src: currentUser.profilePicture, alt: '' }),
            React.createElement(react_router_dom_1.Link, { to: '/dashboard?tab=profile', className: 'text-xs text-cyan-600 hover:underline' },
                "@",
                currentUser.username))) : (React.createElement("div", { className: 'text-sm text-teal-500 my-5 flex gap-1' },
            "You must be signed in to comment.",
            React.createElement(react_router_dom_1.Link, { className: 'text-blue-500 hover:underline', to: '/sign-in' }, "Sign In"))),
        currentUser && (React.createElement("form", { onSubmit: handleSubmit, className: 'border border-teal-500 rounded-md p-3' },
            React.createElement(flowbite_react_1.Textarea, { placeholder: 'Add a comment...', rows: '3', maxLength: '200', onChange: (e) => setComment(e.target.value), value: comment }),
            React.createElement("div", { className: 'flex justify-between items-center mt-5' },
                React.createElement("p", { className: 'text-gray-500 text-xs' },
                    200 - comment.length,
                    " characters remaining"),
                React.createElement(flowbite_react_1.Button, { outline: true, gradientDuoTone: 'purpleToBlue', type: 'submit' }, "Submit")),
            commentError && (React.createElement(flowbite_react_1.Alert, { color: 'failure', className: 'mt-5' }, commentError)))),
        comments.length === 0 ? (React.createElement("p", { className: 'text-sm my-5' }, "No comments yet!")) : (React.createElement(React.Fragment, null,
            React.createElement("div", { className: 'text-sm my-5 flex items-center gap-1' },
                React.createElement("p", null, "Comments"),
                React.createElement("div", { className: 'border border-gray-400 py-1 px-2 rounded-sm' },
                    React.createElement("p", null, comments.length))),
            comments.map((comment) => (React.createElement(Comment_1.default, { key: comment._id, comment: comment }))))),
        React.createElement(flowbite_react_1.Modal, { show: showModal, onClose: () => setShowModal(false), popup: true, size: 'md' },
            React.createElement(flowbite_react_1.Modal.Header, null),
            React.createElement(flowbite_react_1.Modal.Body, null,
                React.createElement("div", { className: 'text-center' },
                    React.createElement(hi_1.HiOutlineExclamationCircle, { className: 'h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' }),
                    React.createElement("h3", { className: 'mb-5 text-lg text-gray-500 dark:text-gray-400' }, "Are you sure you want to delete this comment?"),
                    React.createElement("div", { className: 'flex justify-center gap-4' },
                        React.createElement(flowbite_react_1.Button, { color: 'failure', onClick: () => handleDelete(commentToDelete) }, "Yes, I'm sure"),
                        React.createElement(flowbite_react_1.Button, { color: 'gray', onClick: () => setShowModal(false) }, "No, cancel")))))));
}
exports.default = CommentSection;
