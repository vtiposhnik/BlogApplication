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
const react_router_dom_1 = require("react-router-dom");
const ai_1 = require("react-icons/ai");
const flowbite_react_1 = require("flowbite-react");
const react_1 = require("react");
const react_quill_1 = __importDefault(require("react-quill"));
require("react-quill/dist/quill.snow.css");
const storage_1 = require("firebase/storage");
const firebase_1 = require("../../firebase");
require("react-loading-skeleton/dist/skeleton.css");
const TruncateText = ({ text, maxLength }) => {
    if (!text) {
        return 'no text specified';
    }
    if (text.length <= maxLength) {
        return React.createElement("span", null, text);
    }
    return React.createElement("span", null,
        text.slice(0, maxLength),
        "...");
};
function Posts() {
    const [username, setUsername] = (0, react_1.useState)('');
    const [file, setFile] = (0, react_1.useState)(null);
    const [imageUploadProgress, setImageUploadProgress] = (0, react_1.useState)('');
    const [imageUploadError, setImageUploadError] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    // const [skeleton, setSkeleton] = useState(false)
    const [formData, setFormData] = (0, react_1.useState)({
        title: null,
        content: null,
        image: null,
        category: null
    });
    const [formValidation, setFormValidation] = (0, react_1.useState)({
        titleVal: '',
        contentVal: ''
    });
    const [publishError, setPublishError] = (0, react_1.useState)('');
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [posts, setPosts] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const getPosts = () => __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch('/api/post/get', {
                method: 'GET'
            });
            if (!res.ok) {
                console.error("Response is not ok");
            }
            const data = yield res.json();
            console.log(data);
            setPosts(data.posts);
            getUsername(data.posts.userId);
        });
        getPosts();
    }, []);
    const getUsername = (userId) => __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch('/api/user/getUser', {
            body: JSON.stringify(userId)
        });
        if (!res.ok) {
            console.error("Could not get the username");
        }
        const data = yield res.json();
        setUsername(data.username);
    });
    const handleModalClick = (e) => {
        e.preventDefault();
        if (formData.title === '' || formData.title === null) {
            setFormValidation(prev => (Object.assign(Object.assign({}, prev), { titleVal: 'Please fill out this field!', contentVal: '' })));
        }
        else if (formData.content === '' || formData.content === null) {
            setFormValidation(prev => (Object.assign(Object.assign({}, prev), { titleVal: '', contentVal: 'Please fill out this field!' })));
        }
        else {
            handleSubmit();
            setIsOpen(false);
        }
    };
    const handleSubmit = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch('/api/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = yield res.json();
            console.log(data);
            const slug = data.post.slug;
            navigate(`posts/${slug}`);
        }
        catch (error) {
            setPublishError("Something went wrong!");
            console.error(error);
        }
    });
    const handleUploadImg = () => __awaiter(this, void 0, void 0, function* () {
        try {
            setLoading(true);
            if (!file) {
                console.log('salkfdj;aslkdfj;');
                setImageUploadError('Please select an image');
                setLoading(false);
                return;
            }
            setImageUploadError('');
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = (0, storage_1.ref)(firebase_1.storage, fileName);
            const uploadTask = (0, storage_1.uploadBytesResumable)(storageRef, file);
            uploadTask.on('state_changed', (snapshot) => {
                setLoading(true);
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageUploadProgress(progress.toFixed(0));
            }, (error) => {
                console.log(error);
                setImageUploadError('Image upload failed');
                setImageUploadProgress('');
            }, () => {
                (0, storage_1.getDownloadURL)(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageUploadProgress('');
                    setLoading(false);
                    setImageUploadError('');
                    setFormData(Object.assign(Object.assign({}, formData), { image: downloadURL }));
                });
            });
        }
        catch (error) {
            setImageUploadError('Image upload failed');
            setImageUploadProgress('');
            console.log(error);
        }
    });
    const handleModal = () => {
        setIsOpen(true);
    };
    return (React.createElement("section", { className: "px-8 py-4 flex flex-wrap justify-around" },
        React.createElement("aside", { className: 'min-h-[100vh] border rounded-md shadow-md px-5 py-3' },
            React.createElement("div", { className: 'flex flex-col gap-3' },
                React.createElement(flowbite_react_1.Button, { onClick: handleModal }, "Create a Post"),
                React.createElement(flowbite_react_1.TextInput, { type: 'text', placeholder: 'Search for posts...', rightIcon: ai_1.AiOutlineSearch }),
                React.createElement("h1", null, "Most Searched"))),
        React.createElement("article", { className: "w-[60%]" }, posts.map((post) => {
            return (React.createElement(react_router_dom_1.Link, { to: `/posts/${post.slug}` },
                React.createElement("div", { className: 'my-4 cursor-pointer transition-all hover:translate-x-2 border border-teal-500 rounded-lg max-h-[15rem] flex flex-col lg:py-3 lg:px-4 shadow-md lg:grid lg:grid-cols-[1fr_2fr] gap-4' },
                    React.createElement("figure", { className: 'w-[240px] h-[180px] bg-cover bg-center rounded-lg relative', style: { backgroundImage: `url(${post.image || 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'})` } }),
                    React.createElement("div", null,
                        React.createElement("h1", { className: "text-lg" },
                            React.createElement(react_router_dom_1.Link, { to: post.slug }, post.title)),
                        React.createElement("div", { className: "mt-3" },
                            React.createElement(TruncateText, { text: post.content, maxLength: 90 })),
                        React.createElement("div", { className: 'grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2 mt-4' },
                            React.createElement("span", { className: 'border rounded-md p-1 opacity-60' }, username || 'chebu'),
                            React.createElement("span", { className: 'border rounded-md p-1 opacity-60' }, new Date(post.createdAt).toLocaleDateString()))))));
        })),
        React.createElement(flowbite_react_1.Modal, { show: isOpen, position: 'center', onClose: () => setIsOpen(false) },
            React.createElement(flowbite_react_1.Modal.Header, null, "Create a Post"),
            React.createElement(flowbite_react_1.Modal.Body, null,
                React.createElement("form", { className: "space-y-6 p-6" },
                    React.createElement(flowbite_react_1.TextInput, { id: 'title', type: 'text', placeholder: 'Add title...', onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { title: e.target.value })), required: true }),
                    formValidation.titleVal == '' || null ? React.createElement(React.Fragment, null) : React.createElement(flowbite_react_1.Alert, null, formValidation.titleVal),
                    React.createElement(flowbite_react_1.Select, { onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { category: e.target.value })) },
                        React.createElement("option", { value: "uncategorized" }, "Select a category"),
                        React.createElement("option", { value: "it" }, "IT"),
                        React.createElement("option", { value: "math" }, "Mathematics"),
                        React.createElement("option", { value: "culture" }, "Culture"),
                        React.createElement("option", { value: "language" }, "Language")),
                    React.createElement("div", { className: 'flex items-center justify-between' },
                        React.createElement(flowbite_react_1.FileInput, { id: "file-upload", accept: 'image/*', onChange: (e) => { if (e.target.files) {
                                setFile(e.target.files[0]);
                            } } }),
                        React.createElement(flowbite_react_1.Button, { gradientDuoTone: 'purpleToBlue', outline: true, onClick: handleUploadImg }, loading ? (React.createElement(React.Fragment, null,
                            React.createElement(flowbite_react_1.Spinner, { size: 'sm' }),
                            React.createElement("span", { className: 'pl-3' },
                                imageUploadProgress,
                                "%"))) : ('Upload Image'))),
                    imageUploadError !== '' ? React.createElement(flowbite_react_1.Alert, null, imageUploadError) : React.createElement(React.Fragment, null),
                    formData.image && (React.createElement("img", { src: formData.image, alt: 'your upload', className: 'w-full h-72 object-cover' })),
                    React.createElement(react_quill_1.default, { theme: 'snow', placeholder: 'Body of your post...', className: 'h-52', onChange: (value) => setFormData(Object.assign(Object.assign({}, formData), { content: value })) }),
                    formValidation.contentVal == '' || null ? React.createElement(React.Fragment, null) : React.createElement(flowbite_react_1.Alert, null, formValidation.contentVal))),
            React.createElement(flowbite_react_1.Modal.Footer, null,
                React.createElement(flowbite_react_1.Button, { onClick: (e) => {
                        handleModalClick(e);
                    } }, "Publish"),
                React.createElement(flowbite_react_1.Button, { color: "gray", onClick: () => setIsOpen(false) }, "Cancel")))));
}
exports.default = Posts;
