import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { FcGoogle } from 'react-icons/fc'
import { auth } from '@/utils/firebase'
import { useRouter } from 'next/router'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useEffect } from 'react'

export default function Login() {
    const route = useRouter()
    const [user, loading] = useAuthState(auth)

    const googleProvider = new GoogleAuthProvider()
    
    const googleLogin = async() => {
        try {
            //SIWP take 2 arguments, the AUTH from firebase to set the user and the Provider.
            const result = await signInWithPopup(auth, googleProvider)
            route.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(user){
            route.push('/')
        }else{
            console.log('Loading')
        }
    }, [user])
    

    return (
        <div className="shadow-lg mt-20 mb-20 p-10 text-gray-800 rounded-lg">
            <h2 className="text-2xl font-medium">Join</h2>
            
            <div className="py-2">
                <h3 className="py-4">Sign in with one of the provides:</h3>
                <button onClick={googleLogin} className="text-white bg-gray-700 w-full p-4 font-semibold rounded-lg flex gap-4 align-middle">
                    <FcGoogle className='text-2xl' />
                    Sign in with Google
                </button>
            </div>
        </div>
    )
}
