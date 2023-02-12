import Link from "next/link"

export default function Nav() {
  return (
    <nav className="flex justify-between items-center py-6">
      <Link href={'/'}>
        <button className="text-2xl font-medium">CreaMinds</button>
      </Link>

      <ul>
        <Link href={'/auth/login'} className="text-xl font-semibold bg-gray-700 text-white p-2 rounded">
          Join Now
        </Link>
      </ul>
    </nav>
  )
}
