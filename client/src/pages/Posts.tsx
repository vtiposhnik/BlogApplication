import { Link, useNavigate } from 'react-router-dom'
import { HiChat, HiEye } from 'react-icons/hi'
import { AiOutlineSearch } from 'react-icons/ai'
import { Button, FileInput, Alert, Modal, Select, Spinner, TextInput } from 'flowbite-react'
import { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../firebase'

interface FormData {
    title: string | null,
    content: string | null,
    image: string | null,
    category: string | null
}

export default function Posts() {
    const [isOpen, setIsOpen] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [imageUploadProgress, setImageUploadProgress] = useState('');
    const [imageUploadError, setImageUploadError] = useState('');
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        title: null,
        content: null,
        image: null,
        category: null
    });
    // const [publishError, setPublishError] = useState(null);

    // const navigate = useNavigate();
    // useEffect(() => {
    //     console.log(formData, file)
    // }, [formData, file])

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
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
        <section className="p-5 flex flex-wrap">
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

            <article className="w-[60%] border rounded-lg mx-auto max-h-[15rem] px-5 py-3 shadow-md">
                <h1 className=""><Link to=''>Random Artice Title</Link></h1>
                <div className="mt-3">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus repellendus laboriosam amet pariatur, eligendi, recusandae veniam quos magni mollitia eaque odio inventore sunt officiis libero, doloremque adipisci dolorum exercitationem aut.</p>
                </div>
                <div className='grid grid-cols-2 gap-2 mt-4'>
                    <span className='border rounded-md p-1 opacity-60'>authorName</span>
                    <span className='border rounded-md p-1 opacity-60'>2024-05-02 17:45</span>
                    <span className='border rounded-md p-1 opacity-60 flex gap-4'><HiChat size={25} color='gray' /> 45</span>
                    <span className='border rounded-md p-1 opacity-60 flex gap-4'><HiEye size={25} color='gray' /> 245 views</span>
                </div>
            </article>

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
                                alt='upload'
                                className='w-full h-72 object-cover'
                            />
                        )}
                        <ReactQuill theme='snow' placeholder='Body of your post...' className='h-52'
                            onChange={(value) => setFormData({ ...formData, content: value })}
                        />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        setIsOpen(false)
                        handleSubmit(e)
                    }} >Publish</Button>
                    <Button color="gray" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    )
}
