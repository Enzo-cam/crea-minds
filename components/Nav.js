import Link from "next/link"
import Image from "next/image"
import { auth } from "@/utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth"

export default function Nav() {

  const [user, loading] = useAuthState(auth)

  return (
    <nav className="flex justify-between items-center py-7">
      <Link href={'/'}>
        <button className="text-2xl lg:text-3xl font-semibold">CreaMinds</button>
      </Link>

      <ul>
        {!user && (
          <Link href={'/auth/login'} className="text-xl font-semibold bg-gray-700  text-white p-2 rounded">
            Join Now
          </Link>
        )}

        {user && (
          <div className="flex items-center gap-5">
            <Link href="/post" className="text-medium font-semibold px-4 bg-brown text-white p-2 rounded">
              <button>Post</button>
            </Link>
            <Link href="/dashboard">
              <Image 
                src={user.photoURL}
                height={40}
                width={40}
                alt='User photo'
                className="rounded-full cursor-pointer"
              />
              {/* <button className="text-medium font-semibold px-4 bg-brown text-white p-2 rounded">Dashboard</button> */}
            </Link>
          </div>
        )}
      </ul>
    </nav>
  )
}
