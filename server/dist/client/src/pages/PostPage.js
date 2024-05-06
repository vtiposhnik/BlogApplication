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
const react_router_dom_1 = require("react-router-dom");
const CommentsSection_1 = __importDefault(require("../components/CommentsSection"));
function PostPage() {
    const { postSlug } = (0, react_router_dom_1.useParams)();
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(false);
    const [post, setPost] = (0, react_1.useState)();
    const [recentPosts, setRecentPosts] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
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
    (0, react_1.useEffect)(() => {
        try {
            const fetchRecentPosts = () => __awaiter(this, void 0, void 0, function* () {
                const res = yield fetch(`/api/post/getposts?limit=3`);
                const data = yield res.json();
                if (res.ok) {
                    setRecentPosts(data.posts);
                }
            });
            fetchRecentPosts();
        }
        catch (error) {
            console.log(error.message);
        }
    }, []);
    if (loading)
        return (React.createElement("div", { className: 'flex justify-center items-center min-h-screen' },
            React.createElement(flowbite_react_1.Spinner, { size: 'xl' })));
    return (React.createElement("main", { className: 'p-3 flex flex-col max-w-6xl mx-auto min-h-screen' },
        React.createElement("h1", { className: 'text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl' }, post && post.title),
        React.createElement(react_router_dom_1.Link, { to: '', className: 'self-center mt-5' },
            React.createElement(flowbite_react_1.Button, { color: 'gray', pill: true, size: 'xs' }, post && post.category)),
        React.createElement("img", { src: post && post.image, alt: post && post.title, className: 'mt-10 p-3 max-h-[600px] w-full object-cover' }),
        React.createElement("div", { className: 'flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs' },
            React.createElement("span", null, post && new Date(post.createdAt).toLocaleDateString()),
            React.createElement("span", { className: 'italic' },
                post && (post.content.length / 1000).toFixed(0),
                " mins read")),
        React.createElement("div", { className: 'p-3 max-w-2xl mx-auto w-full post-content', dangerouslySetInnerHTML: { __html: post && post.content } }),
        React.createElement("div", null,
            React.createElement(CommentsSection_1.default, { postId: post._id }))));
}
exports.default = PostPage;
