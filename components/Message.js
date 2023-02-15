import Image from "next/image"

export default function Message({message}) {
  return (
    <div className="bg-white p-8 border-b-2 rounded-lg">
        <div className="flex items-center">
            <Image 
                src={""}
                alt={'User photo'}
            />
            <h2>User</h2>
        </div>
        <div>
            <p>Description:</p>
        </div>
    </div>
  )
}
