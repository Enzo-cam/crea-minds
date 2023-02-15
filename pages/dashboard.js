import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAuthState } from "react-firebase-hooks/auth"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { auth, db } from "@/utils/firebase"

import Message from "@/components/Message"

import {BsTrash2Fill} from 'react-icons/bs'
import {AiFillEdit} from 'react-icons/ai'

export default function Dashboard() {
  const route = useRouter()
  const [user, loading] = useAuthState(auth)
  const [posts, setPosts] = useState([])
  const checkUser = async() =>{
    
    if(loading) return;
    if(!user) return route.push('/auth/login')
    const collectionRef = collection(db, 'posts')
    const queryUser = query(collectionRef, where('user', '==', user.uid))
    const postsUser = onSnapshot(queryUser, (snapshot => {
      setPosts(snapshot.docs.map((doc) => ({...doc.data(), id:doc.id})))
    }))
    return postsUser;

  }

  //User logged?
  useEffect(() => {
    checkUser()
  }, [user, loading])
  
  
  return (
    <div>
        <h1 className="font-bold text-xl border-t-4 border-gray-900 border-b-4 py-2">Here you can see your posts:</h1>

        <div>
          {posts.map((post) => (
            <Message 
              message={post}
              key={post.id}
            >
              <div className="flex gap-5 text-2xl justify-end">
                <button className="text-red-600"><BsTrash2Fill/></button>
                <button className="text-sky-900"><AiFillEdit/></button>
              </div>
            </Message>
          ))}
        </div>
        <button 
          className="font-semibold text-white bg-gray-800 mt-5 py-2 px-4"
          onClick={() => {
            auth.signOut()
            route.push('/')
          }}>
          Sign Out
        </button>
    </div>
  )
}
