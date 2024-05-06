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
import { Alert, Button, Modal, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from './Comment';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
export default function CommentSection({ postId }) {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    const [showModal, setShowModal] = useState(false);
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
    useEffect(() => {
        const getComments = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch(`/api/comment/getPostComments/${postId}`);
                if (res.ok) {
                    const data = yield res.json();
                    setComments(data);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
        getComments();
    }, [postId]);
    return (_jsxs("div", { className: 'max-w-2xl mx-auto w-full p-3', children: [currentUser ? (_jsxs("div", { className: 'flex items-center gap-1 my-5 text-gray-500 text-sm', children: [_jsx("p", { children: "Signed in as:" }), _jsx("img", { className: 'h-5 w-5 object-cover rounded-full', src: currentUser.profilePicture, alt: '' }), _jsxs(Link, { to: '/dashboard?tab=profile', className: 'text-xs text-cyan-600 hover:underline', children: ["@", currentUser.username] })] })) : (_jsxs("div", { className: 'text-sm text-teal-500 my-5 flex gap-1', children: ["You must be signed in to comment.", _jsx(Link, { className: 'text-blue-500 hover:underline', to: '/sign-in', children: "Sign In" })] })), currentUser && (_jsxs("form", { onSubmit: handleSubmit, className: 'border border-teal-500 rounded-md p-3', children: [_jsx(Textarea, { placeholder: 'Add a comment...', rows: 3, maxLength: 200, onChange: (e) => setComment(e.target.value), value: comment }), _jsxs("div", { className: 'flex justify-between items-center mt-5', children: [_jsxs("p", { className: 'text-gray-500 text-xs', children: [200 - comment.length, " characters remaining"] }), _jsx(Button, { outline: true, gradientDuoTone: 'purpleToBlue', type: 'submit', children: "Submit" })] }), commentError && (_jsx(Alert, { color: 'failure', className: 'mt-5', children: commentError }))] })), comments.length === 0 ? (_jsx("p", { className: 'text-sm my-5', children: "No comments yet!" })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: 'text-sm my-5 flex items-center gap-1', children: [_jsx("p", { children: "Comments" }), _jsx("div", { className: 'border border-gray-400 py-1 px-2 rounded-sm', children: _jsx("p", { children: comments.length }) })] }), comments.map((comment) => (_jsx(Comment, { comment: comment }, comment._id)))] })), _jsxs(Modal, { show: showModal, onClose: () => setShowModal(false), popup: true, size: 'md', children: [_jsx(Modal.Header, {}), _jsx(Modal.Body, { children: _jsxs("div", { className: 'text-center', children: [_jsx(HiOutlineExclamationCircle, { className: 'h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' }), _jsx("h3", { className: 'mb-5 text-lg text-gray-500 dark:text-gray-400', children: "Are you sure you want to delete this comment?" }), _jsxs("div", { className: 'flex justify-center gap-4', children: [_jsx(Button, { color: 'failure', children: "Yes, I'm sure" }), _jsx(Button, { color: 'gray', onClick: () => setShowModal(false), children: "No, cancel" })] })] }) })] })] }));
}
