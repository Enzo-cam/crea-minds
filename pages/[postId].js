import Message from "@/components/Message"
import { useRouter } from "next/router"
import Image from "next/image"
import { useEffect, useState } from "react"
import { auth, db } from "@/utils/firebase"
import { arrayUnion, doc, getDoc, onSnapshot, Timestamp, updateDoc } from "firebase/firestore"


export default function Comments() {
    const router = useRouter()
    const routeData = router.query;
    const [message, setMessage] = useState('')
    const [allMessages, setAllMessages] = useState([])
    
    // Submiting the comment.
    const submitMessage = async() =>{
        if(!auth.currentUser) return router.push('/auth/login')

        if(!message){
            toast.error('Your comment can\'t be empty.',{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500
            })
        }

        const docRef = doc(db, "posts", routeData.id)
        try {
            await updateDoc(docRef,{
                // With arrayUnion we can pass objects and it convert to elements of an object.
                comments: arrayUnion({
                    message,
                    avatar: auth.currentUser.photoURL,
                    userName: auth.currentUser.displayName,
                    time: Timestamp.now()
                })
            })
            setMessage('')    
        } catch (error) {
            console.log(error)
        }
        
    }

    //Getting all comments 
    const getComments = async() =>{
        const docRef = doc(db, "posts", routeData.id) //Getting the reference to the post
        const docSnap = onSnapshot(docRef, (snap) => {
            setAllMessages(snap.data().comments)
        }) //Once obtained the comments, we put it in the STATE to show them.

        return docSnap
    }

    useEffect(() => {
        if(!router.isReady) return;
        console.log('Run this function')
        getComments()
    }, [router.isReady])
    
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
                    <button 
                        onClick={submitMessage}
                        className="bg-gray-700 text-white py-2 px-4 font-medium text-sm "
                    >
                        Submit
                    </button>
                </div>
                <div className="py-6">
                    <h2 className="font-bold">Comments</h2>
                    {allMessages?.map((message) => (
                        <div
                            className="bg-white p-4 my-4 border-2"
                            key={message.time}
                        >
                            <div className="flex gap-1 items-center">
                                <Image 
                                    src={message.avatar}
                                    width={30}
                                    height={30}
                                    className='rounded-full'
                                    alt="Usuario picture"
                                />
                                <h2 className="font-medium">{message.userName}</h2>
                            </div>
                            <h2 className="mt-2">{message.message}</h2>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    )
}
