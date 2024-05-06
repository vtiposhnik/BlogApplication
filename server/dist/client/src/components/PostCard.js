import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
export default function PostCard({ post }) {
    return (_jsxs("div", { className: 'group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all', children: [_jsx(Link, { to: `/post/${post.slug}`, children: _jsx("img", { src: post.image, alt: 'post cover', className: 'h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20' }) }), _jsxs("div", { className: 'p-3 flex flex-col gap-2', children: [_jsx("p", { className: 'text-lg font-semibold line-clamp-2', children: post.title }), _jsx("span", { className: 'italic text-sm', children: post.category }), _jsx(Link, { to: `/post/${post.slug}`, className: 'z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2', children: "Read article" })] })] }));
}
