import Image from "next/image"

export default function Message({children, message}) {

    const {description, username, avatar} = message

    return (
        <div className="bg-white p-6 border-b-2 rounded-lg">
            <div className="flex items-center gap-2">
                <Image 
                    src={avatar}
                    width={35}
                    height={35}
                    alt={'User photo'}
                    className="rounded-full"
                />
                <h2 className="font-semibold text-lg">{username}</h2>
            </div>
            <div className="py-4">
                <p>{description}</p>
            </div>
            {children}
        </div>
    )
}
