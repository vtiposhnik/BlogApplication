import { Link } from 'react-router-dom'
import { HiChat, HiEye } from 'react-icons/hi'
import { AiOutlineSearch } from 'react-icons/ai'
import { Button, FileInput, Label, Modal, Select, TextInput } from 'flowbite-react'
import { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Posts() {
    const [isOpen, setIsOpen] = useState(false)

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
                            required />
                        <Select>
                            <option value="uncategorized">Select a category</option>
                            <option value="it">IT</option>
                            <option value="math">Mathematics</option>
                            <option value="culture">Culture</option>
                            <option value="language">Language</option>
                        </Select>
                        <div className='flex items-center justify-between'>
                            <FileInput id="file-upload" accept='image/*' />
                            <Button gradientDuoTone='purpleToBlue' outline >Upload</Button>
                        </div>
                        <ReactQuill theme='snow' placeholder='Body of your post...' className='h-52 ' />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setIsOpen(false)}>Publish</Button>
                    <Button color="gray" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    )
}
