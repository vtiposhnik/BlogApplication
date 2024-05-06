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
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';
export default function Comment({ comment }) {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);
    const { currentUser } = useSelector((state) => state.user);
    useEffect(() => {
        const getUser = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch(`/api/user/${comment.userId}`);
                const data = yield res.json();
                if (res.ok) {
                    setUser(data);
                }
            }
            catch (error) {
                console.log(error);
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
            console.log(error);
        }
    });
    return (_jsxs("div", { className: 'flex p-4 border-b dark:border-gray-600 text-sm', children: [_jsx("div", { className: 'flex-shrink-0 mr-3', children: _jsx("img", { className: 'w-10 h-10 rounded-full bg-gray-200', src: "https://flowbite.com/docs/images/people/profile-picture-5.jpg", alt: user.username }) }), _jsxs("div", { className: 'flex-1', children: [_jsxs("div", { className: 'flex items-center mb-1', children: [_jsx("span", { className: 'font-bold mr-1 text-xs truncate', children: user ? `@${user.username}` : 'anonymous user' }), _jsx("span", { className: 'text-gray-500 text-xs', children: moment(comment.createdAt).fromNow() })] }), isEditing ? (_jsxs(_Fragment, { children: [_jsx(Textarea, { className: 'mb-2', value: editedContent, onChange: (e) => setEditedContent(e.target.value) }), _jsxs("div", { className: 'flex justify-end gap-2 text-xs', children: [_jsx(Button, { type: 'button', size: 'sm', gradientDuoTone: 'purpleToBlue', onClick: handleSave, children: "Save" }), _jsx(Button, { type: 'button', size: 'sm', gradientDuoTone: 'purpleToBlue', outline: true, onClick: () => setIsEditing(false), children: "Cancel" })] })] })) : (_jsxs(_Fragment, { children: [_jsx("p", { className: 'text-gray-500 pb-2', children: comment.content }), _jsxs("div", { className: 'flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2', children: [_jsx("button", { type: 'button', className: `text-gray-400 hover:text-blue-500`, children: _jsx(FaThumbsUp, { className: 'text-sm' }) }), _jsx("p", { className: 'text-gray-400', children: "1 like" }), currentUser &&
                                        (currentUser._id === comment.userId || currentUser.isAdmin) && (_jsxs(_Fragment, { children: [_jsx("button", { type: 'button', className: 'text-gray-400 hover:text-blue-500', children: "Edit" }), _jsx("button", { type: 'button', className: 'text-gray-400 hover:text-red-500', children: "Delete" })] }))] })] }))] })] }));
}
