import { Avatar, Button, TextInput } from "flowbite-react"
import { useDispatch, useSelector } from "react-redux"
import { logOutSuccess } from "../redux/user/userSlice"

export default function DashProfile() {
    const { currentUser } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST'
            })
            const data = await res.json()

            if (!res.ok) {
                data.message
            } else {
                dispatch(logOutSuccess())
            }
        } catch (error) {
            console.log(error)
        }
    }

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
            <Button onClick={handleLogout}>
                Sign Out
            </Button>
        </section>
    )
}
