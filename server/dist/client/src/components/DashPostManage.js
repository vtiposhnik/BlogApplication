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
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const hi_1 = require("react-icons/hi");
function DashPosts() {
    const { currentUser } = (0, react_redux_1.useSelector)((state) => state.user);
    const [userPosts, setUserPosts] = (0, react_1.useState)([]);
    const [showMore, setShowMore] = (0, react_1.useState)(true);
    const [showModal, setShowModal] = (0, react_1.useState)(false);
    const [postIdToDelete, setPostIdToDelete] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        const fetchPosts = () => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!currentUser) {
                    throw Error('current user is null');
                }
                const res = yield fetch(`/api/post/getposts?userId=${currentUser._id}`);
                const data = yield res.json();
                if (res.ok) {
                    setUserPosts(data.posts);
                    if (data.posts.length < 9) {
                        setShowMore(false);
                    }
                }
            }
            catch (error) {
                console.log(error.message);
            }
        });
        if (currentUser.isAdmin) {
            fetchPosts();
        }
    }, [currentUser._id]);
    const handleShowMore = () => __awaiter(this, void 0, void 0, function* () {
        const startIndex = userPosts.length;
        try {
            const res = yield fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
            const data = yield res.json();
            if (res.ok) {
                setUserPosts((prev) => [...prev, ...data.posts]);
                if (data.posts.length < 9) {
                    setShowMore(false);
                }
            }
        }
        catch (error) {
            console.log(error.message);
        }
    });
    const handleDeletePost = () => __awaiter(this, void 0, void 0, function* () {
        setShowModal(false);
        try {
            const res = yield fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
                method: 'DELETE',
            });
            const data = yield res.json();
            if (!res.ok) {
                console.log(data.message);
            }
            else {
                setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
            }
        }
        catch (error) {
            console.log(error.message);
        }
    });
    return (React.createElement("div", { className: 'table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500' },
        currentUser.isAdmin && userPosts.length > 0 ? (React.createElement(React.Fragment, null,
            React.createElement(flowbite_react_1.Table, { hoverable: true, className: 'shadow-md' },
                React.createElement(flowbite_react_1.Table.Head, null,
                    React.createElement(flowbite_react_1.Table.HeadCell, null, "Date updated"),
                    React.createElement(flowbite_react_1.Table.HeadCell, null, "Post image"),
                    React.createElement(flowbite_react_1.Table.HeadCell, null, "Post title"),
                    React.createElement(flowbite_react_1.Table.HeadCell, null, "Category"),
                    React.createElement(flowbite_react_1.Table.HeadCell, null, "Delete"),
                    React.createElement(flowbite_react_1.Table.HeadCell, null,
                        React.createElement("span", null, "Edit"))),
                userPosts.map((post) => (React.createElement(flowbite_react_1.Table.Body, { className: 'divide-y' },
                    React.createElement(flowbite_react_1.Table.Row, { className: 'bg-white dark:border-gray-700 dark:bg-gray-800' },
                        React.createElement(flowbite_react_1.Table.Cell, null, new Date(post.updatedAt).toLocaleDateString()),
                        React.createElement(flowbite_react_1.Table.Cell, null,
                            React.createElement(react_router_dom_1.Link, { to: `/post/${post.slug}` },
                                React.createElement("img", { src: post.image, alt: post.title, className: 'w-20 h-10 object-cover bg-gray-500' }))),
                        React.createElement(flowbite_react_1.Table.Cell, null,
                            React.createElement(react_router_dom_1.Link, { className: 'font-medium text-gray-900 dark:text-white', to: `/post/${post.slug}` }, post.title)),
                        React.createElement(flowbite_react_1.Table.Cell, null, post.category),
                        React.createElement(flowbite_react_1.Table.Cell, null,
                            React.createElement("span", { onClick: () => {
                                    setShowModal(true);
                                    setPostIdToDelete(post._id);
                                }, className: 'font-medium text-red-500 hover:underline cursor-pointer' }, "Delete")),
                        React.createElement(flowbite_react_1.Table.Cell, null,
                            React.createElement(react_router_dom_1.Link, { className: 'text-teal-500 hover:underline', to: `/update-post/${post._id}` },
                                React.createElement("span", null, "Edit")))))))),
            showMore && (React.createElement("button", { onClick: handleShowMore, className: 'w-full text-teal-500 self-center text-sm py-7' }, "Show more")))) : (React.createElement("p", null, "You have no posts yet!")),
        React.createElement(flowbite_react_1.Modal, { show: showModal, onClose: () => setShowModal(false), popup: true, size: 'md' },
            React.createElement(flowbite_react_1.Modal.Header, null),
            React.createElement(flowbite_react_1.Modal.Body, null,
                React.createElement("div", { className: 'text-center' },
                    React.createElement(hi_1.HiOutlineExclamationCircle, { className: 'h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' }),
                    React.createElement("h3", { className: 'mb-5 text-lg text-gray-500 dark:text-gray-400' }, "Are you sure you want to delete this post?"),
                    React.createElement("div", { className: 'flex justify-center gap-4' },
                        React.createElement(flowbite_react_1.Button, { color: 'failure', onClick: handleDeletePost }, "Yes, I'm sure"),
                        React.createElement(flowbite_react_1.Button, { color: 'gray', onClick: () => setShowModal(false) }, "No, cancel")))))));
}
exports.default = DashPosts;
