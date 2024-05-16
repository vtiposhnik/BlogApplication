import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { Button, FileInput, Alert, Modal, Select, Spinner, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../firebase'
import 'react-loading-skeleton/dist/skeleton.css'
import { PostData, FormData } from '../util/interfaces'

const TruncateText = ({ text, maxLength }: { text: string | null, maxLength: number }) => {
    if (!text) {
        return 'no text specified'
    }
    if (text.length <= maxLength) {
        return <span>{text}</span>;
    }

    return <span>{text.slice(0, maxLength)}...</span>;
};

export default function Posts() {
    const [username, setUsername] = useState('')

    const [file, setFile] = useState<File | null>(null)
    const [imageUploadProgress, setImageUploadProgress] = useState('');
    const [imageUploadError, setImageUploadError] = useState('');
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    // const [skeleton, setSkeleton] = useState(false)

    const [formData, setFormData] = useState<FormData>({
        title: null,
        content: null,
        image: null,
        category: null
    });
    const [formValidation, setFormValidation] = useState({
        titleVal: '',
        contentVal: ''
    })
    const navigate = useNavigate();

    const [posts, setPosts] = useState<PostData[]>([])

    useEffect(() => {
        const getPosts = async () => {
            const res = await fetch('/api/post/get', {
                method: 'GET'
            })
            if (!res.ok) {
                console.error("Response is not ok")
            }

            const data = await res.json()
            console.log(data)

            setPosts(data.posts)
            getUsername(data.posts.userId)
        }
        getPosts()
    }, [])

    const getUsername = async (userId: string) => {
        const res = await fetch('/api/user/getUser', {
            body: JSON.stringify(userId)
        })
        if (!res.ok) {
            console.error("Could not get the username")
        }
        const data = await res.json()
        setUsername(data.username)
    }

    const handleModalClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (formData.title === '' || formData.title === null) {
            setFormValidation(prev => ({
                ...prev,
                titleVal: 'Please fill out this field!',
                contentVal: ''
            }))
        } else
            if (formData.content === '' || formData.content === null) {
                setFormValidation(prev => ({
                    ...prev,
                    titleVal: '',
                    contentVal: 'Please fill out this field!'
                }))
            } else {
                handleSubmit()
                setIsOpen(false)
            }
    }

    const handleSubmit = async () => {
        try {
            const res = await fetch('/api/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await res.json()
            console.log(data)

            const slug = data.post.slug
            navigate(`posts/${slug}`)

        } catch (error) {
            console.error(error)
        }
    }
    const handleUploadImg = async () => {

        try {
            setLoading(true)
            if (!file) {
                console.log('salkfdj;aslkdfj;')
                setImageUploadError('Please select an image');
                setLoading(false)
                return;
            }
            setImageUploadError('');
            const fileName = new Date().getTime() + '-' + file.name;

            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    setLoading(true)
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    console.log(error)
                    setImageUploadError('Image upload failed');
                    setImageUploadProgress('');
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress('');
                        setLoading(false)
                        setImageUploadError('');
                        setFormData({ ...formData, image: downloadURL });
                    });
                }
            );
        } catch (error) {
            setImageUploadError('Image upload failed');
            setImageUploadProgress('');
            console.log(error);
        }
    };

    const handleModal = () => {
        setIsOpen(true)
    }

    return (
        <section className="px-8 py-4 flex flex-wrap justify-around">
            <aside className='min-h-[100vh] border rounded-md shadow-md px-5 py-3'>
                <div className='flex flex-col gap-3'>
                    <Button onClick={handleModal}>Create a Post</Button>
                    <TextInput
                        type='text'
                        placeholder='Search for posts...'
                        rightIcon={AiOutlineSearch} />
                    <h1>Most Searched</h1>

                </div>
            </aside>

            <article className="w-[60%]">
                {posts.map((post) => {
                    return (

                        <Link to={`/posts/${post.slug}`}>
                            <div className='my-4 cursor-pointer transition-all hover:translate-x-2 border border-teal-500 rounded-lg max-h-[15rem] flex flex-col lg:py-3 lg:px-4 shadow-md lg:grid lg:grid-cols-[1fr_2fr] gap-4'>
                                <figure className='w-[240px] h-[180px] bg-cover bg-center rounded-lg relative' style={{ backgroundImage: `url(${post.image || 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'})` }}>
                                </figure>
                                <div>
                                    <h1 className="text-lg"><Link to={post.slug}>{post.title}</Link></h1>
                                    <div className="mt-3">
                                        <TruncateText text={post.content} maxLength={90} />
                                    </div>
                                    <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2 mt-4'>
                                        <span className='border rounded-md p-1 opacity-60'>{username || 'chebu'}</span>
                                        <span className='border rounded-md p-1 opacity-60'>{new Date(post.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </article>

            {/* {posts.map((post) => {
                return (
                    <PostCard post={post} key={post._id} />
                )
            })} */}

            <Modal
                show={isOpen}
                position='center'
                onClose={() => setIsOpen(false)}
            >
                <Modal.Header>Create a Post</Modal.Header>
                <Modal.Body>
                    <form className="space-y-6 p-6">
                        <TextInput
                            id='title'
                            type='text'
                            placeholder='Add title...'
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required />
                        {formValidation.titleVal == '' || null ? <></> : <Alert>{formValidation.titleVal}</Alert>}
                        <Select
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="uncategorized">Select a category</option>
                            <option value="it">IT</option>
                            <option value="math">Mathematics</option>
                            <option value="culture">Culture</option>
                            <option value="language">Language</option>
                        </Select>
                        <div className='flex items-center justify-between'>
                            <FileInput id="file-upload" accept='image/*' onChange={(e) => { if (e.target.files) { setFile(e.target.files[0]) } }} />
                            <Button gradientDuoTone='purpleToBlue' outline onClick={handleUploadImg} >
                                {loading ? (
                                    <>
                                        <Spinner size='sm' />
                                        <span className='pl-3'>{imageUploadProgress}%</span>
                                    </>
                                ) : (
                                    'Upload Image'
                                )}
                            </Button>
                        </div>
                        {imageUploadError !== '' ? <Alert>{imageUploadError}</Alert> : <></>}
                        {formData.image && (
                            <img
                                src={formData.image}
                                alt='your upload'
                                className='w-full h-72 object-cover'
                            />
                        )}
                        <ReactQuill theme='snow' placeholder='Body of your post...' className='h-52'
                            onChange={(value) => setFormData({ ...formData, content: value })}
                        />
                        {formValidation.contentVal == '' || null ? <></> : <Alert>{formValidation.contentVal}</Alert>}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        handleModalClick(e)
                    }} >Publish</Button>
                    <Button color="gray" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    )
}
