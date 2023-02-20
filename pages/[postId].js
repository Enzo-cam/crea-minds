import Message from "@/components/Message"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { auth, db } from "@/utils/firebase"


export default function Comments() {
    const router = useRouter()
    const routeData = router.query;
    const [message, setMessage] = useState('')
    const [allMessages, setAllMessages] = useState([])
    
    console.log(routeData)

    return (
        <div>
            <Message message={routeData}></Message>
            <div className="my-4">
                <div className="flex">
                    <input 
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        value={message}
                        placeholder='Comment on this post'
                        className="bg-brown w-full p-2 text-white"
                    />
                    <button className="bg-gray-700 text-white py-2 px-4 font-medium text-sm ">Submit</button>
                </div>
            </div>
        </div>
    )
}
