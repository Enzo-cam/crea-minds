import { auth, db } from "@/utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore"
import {toast} from 'react-toastify'

export default function Post() {
    const [user, loading] = useAuthState(auth)
    const [post, setPost] = useState({description : ''})
    const route = useRouter()
    const routeData = route.query;

    const submitPost = async(e) => {
        e.preventDefault()

        if(!post.description){
            toast.error('Please put something to post.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500
            })
            return
        }

        if(post?.hasOwnProperty('id')){
            const docRef = doc(db, 'posts', post.id)
            const updatePost = {...post, timestamp: serverTimestamp()}
            await updateDoc(docRef, updatePost)
            return route.push('/')
        }else{
            //Creating a collection and adding a post:
            const collectionRef = collection(db, "posts")
            try {
                await addDoc(collectionRef, {
                    ...post,
                    timestamp: serverTimestamp(),
                    user: user.uid,
                    avatar: user.photoURL,
                    username: user.displayName
                })
    
                setPost({description: ''})
                route.push('/')
            } catch (error) {
                console.log(error)
            }
        }

    }

    const checkingUser = async() =>{
        if(loading) return;
        if(!user) route.push('/auth/login ')
        if(routeData.id){
            setPost({description : routeData.description, id: routeData.id})
        }
    }

    useEffect(() => {
        checkingUser()
    }, [user, loading])
    

    return (
        <div className="my-20 py-12 px-8 shadow-lg rounded-lg max-w-md mx-auto ">
            <form onSubmit={submitPost}>
                <h1 className="text-2xl font-semibold">
                    {post.hasOwnProperty('id') ? 'Edit your post' : 'Create a new post'}
                </h1>
                <div className="py-4">
                    <h3 className="text-lg font-medium py-2">Description</h3>
                    <textarea 
                        value={post.description} 
                        className="h-48 w-full rounded-md bg-brown p-2 text-white resize-none"
                        maxLength={320}
                        onChange={(e) => setPost({...post, description: e.target.value})}
                    >
                        
                    </textarea>
                    <p className='pt-2'>{post.description.length}/320</p>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-brown w-50 p-2 font-medium my-2 text-center px-6 rounded-lg text-white uppercase">Post it</button>
                </div>
            </form>
        </div>
    )
}
