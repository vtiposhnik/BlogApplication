import { Avatar, Button, TextInput } from "flowbite-react"
import { useSelector } from "react-redux"

export default function DashProfile() {
    const { currentUser } = useSelector((state) => state.user)

    return (
        <section className="flex flex-col gap-4 items-center p-6 text-center">
            <h1>Profile</h1>
            <div>
                <Avatar size={40} alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded bordered />
            </div>
            <div id='user-info' className="">
                <p><i>User: </i>{currentUser.username}</p>
                {/* <p><i>Role:</i>{currentUser.role}</p> */}
                <p><i>Email: </i>{currentUser.email}</p>
                <p><i>LastSeen: </i>{currentUser.updatedAt}</p>
            </div>
            <div id='about' className="w-[60%]">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta, impedit nulla. Fugiat voluptatum quos soluta omnis nulla, maiores ullam
                non earum deleniti harum eligendi aliquam temporibus nisi voluptate eos doloremque.
            </div>
            <Button>
                Sign Out
            </Button>
        </section>
    )
}
