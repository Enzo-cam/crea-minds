import { auth } from "@/utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Dashboard() {
  const route = useRouter()
  const [user, loading] = useAuthState(auth)

  const checkUser = async() =>{
    if(loading) return;
    if(!user) return route.push('/auth/login')
  }

  //User logged?
  useEffect(() => {
    checkUser()
  }, [user, loading])
  
  
  return (
    <div>
        <h1>Your posts</h1>

        <div>Posts</div>
        <button onClick={() => {
          auth.signOut()
          route.push('/')
          }}>
          Sign Out
        </button>
    </div>
  )
}
