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
import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
export default function DashPosts() {
    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');
    useEffect(() => {
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
                console.log(error);
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
            console.log(error);
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
            console.log(error);
        }
    });
    return (_jsxs("div", { className: 'table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500', children: [currentUser.isAdmin && userPosts.length > 0 ? (_jsxs(_Fragment, { children: [_jsxs(Table, { hoverable: true, className: 'shadow-md', children: [_jsxs(Table.Head, { children: [_jsx(Table.HeadCell, { children: "Date updated" }), _jsx(Table.HeadCell, { children: "Post image" }), _jsx(Table.HeadCell, { children: "Post title" }), _jsx(Table.HeadCell, { children: "Category" }), _jsx(Table.HeadCell, { children: "Delete" }), _jsx(Table.HeadCell, { children: _jsx("span", { children: "Edit" }) })] }), userPosts.map((post) => (_jsx(Table.Body, { className: 'divide-y', children: _jsxs(Table.Row, { className: 'bg-white dark:border-gray-700 dark:bg-gray-800', children: [_jsx(Table.Cell, { children: new Date(post.updatedAt).toLocaleDateString() }), _jsx(Table.Cell, { children: _jsx(Link, { to: `/post/${post.slug}`, children: _jsx("img", { src: post.image, alt: post.title, className: 'w-20 h-10 object-cover bg-gray-500' }) }) }), _jsx(Table.Cell, { children: _jsx(Link, { className: 'font-medium text-gray-900 dark:text-white', to: `/post/${post.slug}`, children: post.title }) }), _jsx(Table.Cell, { children: post.category }), _jsx(Table.Cell, { children: _jsx("span", { onClick: () => {
                                                    setShowModal(true);
                                                    setPostIdToDelete(post._id);
                                                }, className: 'font-medium text-red-500 hover:underline cursor-pointer', children: "Delete" }) }), _jsx(Table.Cell, { children: _jsx(Link, { className: 'text-teal-500 hover:underline', to: `/update-post/${post._id}`, children: _jsx("span", { children: "Edit" }) }) })] }) })))] }), showMore && (_jsx("button", { onClick: handleShowMore, className: 'w-full text-teal-500 self-center text-sm py-7', children: "Show more" }))] })) : (_jsx("p", { children: "You have no posts yet!" })), _jsxs(Modal, { show: showModal, onClose: () => setShowModal(false), popup: true, size: 'md', children: [_jsx(Modal.Header, {}), _jsx(Modal.Body, { children: _jsxs("div", { className: 'text-center', children: [_jsx(HiOutlineExclamationCircle, { className: 'h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' }), _jsx("h3", { className: 'mb-5 text-lg text-gray-500 dark:text-gray-400', children: "Are you sure you want to delete this post?" }), _jsxs("div", { className: 'flex justify-center gap-4', children: [_jsx(Button, { color: 'failure', onClick: handleDeletePost, children: "Yes, I'm sure" }), _jsx(Button, { color: 'gray', onClick: () => setShowModal(false), children: "No, cancel" })] })] }) })] })] }));
}
