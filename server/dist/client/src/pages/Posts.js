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
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { Button, FileInput, Alert, Modal, Select, Spinner, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase';
import 'react-loading-skeleton/dist/skeleton.css';
const TruncateText = ({ text, maxLength }) => {
    if (!text) {
        return 'no text specified';
    }
    if (text.length <= maxLength) {
        return _jsx("span", { children: text });
    }
    return _jsxs("span", { children: [text.slice(0, maxLength), "..."] });
};
export default function Posts() {
    const [username, setUsername] = useState('');
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState('');
    const [imageUploadError, setImageUploadError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    // const [skeleton, setSkeleton] = useState(false)
    const [formData, setFormData] = useState({
        title: null,
        content: null,
        image: null,
        category: null
    });
    const [formValidation, setFormValidation] = useState({
        titleVal: '',
        contentVal: ''
    });
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    useEffect(() => {
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
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed', (snapshot) => {
                setLoading(true);
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageUploadProgress(progress.toFixed(0));
            }, (error) => {
                console.log(error);
                setImageUploadError('Image upload failed');
                setImageUploadProgress('');
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
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
    return (_jsxs("section", { className: "px-8 py-4 flex flex-wrap justify-around", children: [_jsx("aside", { className: 'min-h-[100vh] border rounded-md shadow-md px-5 py-3', children: _jsxs("div", { className: 'flex flex-col gap-3', children: [_jsx(Button, { onClick: handleModal, children: "Create a Post" }), _jsx(TextInput, { type: 'text', placeholder: 'Search for posts...', rightIcon: AiOutlineSearch }), _jsx("h1", { children: "Most Searched" })] }) }), _jsx("article", { className: "w-[60%]", children: posts.map((post) => {
                    return (_jsx(Link, { to: `/posts/${post.slug}`, children: _jsxs("div", { className: 'my-4 cursor-pointer transition-all hover:translate-x-2 border border-teal-500 rounded-lg max-h-[15rem] flex flex-col lg:py-3 lg:px-4 shadow-md lg:grid lg:grid-cols-[1fr_2fr] gap-4', children: [_jsx("figure", { className: 'w-[240px] h-[180px] bg-cover bg-center rounded-lg relative', style: { backgroundImage: `url(${post.image || 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'})` } }), _jsxs("div", { children: [_jsx("h1", { className: "text-lg", children: _jsx(Link, { to: post.slug, children: post.title }) }), _jsx("div", { className: "mt-3", children: _jsx(TruncateText, { text: post.content, maxLength: 90 }) }), _jsxs("div", { className: 'grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2 mt-4', children: [_jsx("span", { className: 'border rounded-md p-1 opacity-60', children: username || 'chebu' }), _jsx("span", { className: 'border rounded-md p-1 opacity-60', children: new Date(post.createdAt).toLocaleDateString() })] })] })] }) }));
                }) }), _jsxs(Modal, { show: isOpen, position: 'center', onClose: () => setIsOpen(false), children: [_jsx(Modal.Header, { children: "Create a Post" }), _jsx(Modal.Body, { children: _jsxs("form", { className: "space-y-6 p-6", children: [_jsx(TextInput, { id: 'title', type: 'text', placeholder: 'Add title...', onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { title: e.target.value })), required: true }), formValidation.titleVal == '' || null ? _jsx(_Fragment, {}) : _jsx(Alert, { children: formValidation.titleVal }), _jsxs(Select, { onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { category: e.target.value })), children: [_jsx("option", { value: "uncategorized", children: "Select a category" }), _jsx("option", { value: "it", children: "IT" }), _jsx("option", { value: "math", children: "Mathematics" }), _jsx("option", { value: "culture", children: "Culture" }), _jsx("option", { value: "language", children: "Language" })] }), _jsxs("div", { className: 'flex items-center justify-between', children: [_jsx(FileInput, { id: "file-upload", accept: 'image/*', onChange: (e) => { if (e.target.files) {
                                                setFile(e.target.files[0]);
                                            } } }), _jsx(Button, { gradientDuoTone: 'purpleToBlue', outline: true, onClick: handleUploadImg, children: loading ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { size: 'sm' }), _jsxs("span", { className: 'pl-3', children: [imageUploadProgress, "%"] })] })) : ('Upload Image') })] }), imageUploadError !== '' ? _jsx(Alert, { children: imageUploadError }) : _jsx(_Fragment, {}), formData.image && (_jsx("img", { src: formData.image, alt: 'your upload', className: 'w-full h-72 object-cover' })), _jsx(ReactQuill, { theme: 'snow', placeholder: 'Body of your post...', className: 'h-52', onChange: (value) => setFormData(Object.assign(Object.assign({}, formData), { content: value })) }), formValidation.contentVal == '' || null ? _jsx(_Fragment, {}) : _jsx(Alert, { children: formValidation.contentVal })] }) }), _jsxs(Modal.Footer, { children: [_jsx(Button, { onClick: (e) => {
                                    handleModalClick(e);
                                }, children: "Publish" }), _jsx(Button, { color: "gray", onClick: () => setIsOpen(false), children: "Cancel" })] })] })] }));
}
