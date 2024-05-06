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
import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CommentsSection from '../components/CommentsSection';
export default function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState();
    useEffect(() => {
        console.log(error);
        const fetchPost = () => __awaiter(this, void 0, void 0, function* () {
            try {
                setLoading(true);
                const res = yield fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = yield res.json();
                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                if (res.ok) {
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }
                console.log(data);
            }
            catch (error) {
                setError(true);
                setLoading(false);
            }
        });
        fetchPost();
    }, [postSlug]);
    if (loading)
        return (_jsx("div", { className: 'flex justify-center items-center min-h-screen', children: _jsx(Spinner, { size: 'xl' }) }));
    if (!post) {
        throw Error('post is null');
    }
    return (_jsxs("main", { className: 'p-3 flex flex-col max-w-6xl mx-auto min-h-screen', children: [_jsx("h1", { className: 'text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl', children: post && post.title }), _jsx(Link, { to: '', className: 'self-center mt-5', children: _jsx(Button, { color: 'gray', pill: true, size: 'xs', children: post && post.category }) }), _jsx("img", { src: post && post.image, className: 'mt-10 p-3 max-h-[600px] w-full object-cover' }), _jsxs("div", { className: 'flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs', children: [_jsx("span", { children: post && new Date(post.createdAt).toLocaleDateString() }), _jsxs("span", { className: 'italic', children: [post && (post.content.length / 1000).toFixed(0), " mins read"] })] }), _jsx("div", { className: 'p-3 max-w-2xl mx-auto w-full post-content', dangerouslySetInnerHTML: { __html: post && post.content } }), _jsx("div", { children: _jsx(CommentsSection, { postId: post._id }) })] }));
}
