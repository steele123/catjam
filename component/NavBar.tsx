import { MoonIcon, SunIcon } from '@heroicons/react/solid'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'

export default function NavBar() {
    const { theme, setTheme } = useTheme()

    return (
        <div className="border-b bg-gray-100 dark:border-gray-700 dark:bg-lightblack py-2 flex items-center">
            <div className="pl-5 flex-1">
                <Link href="/">
                    <a>
                        <Image alt="" src="/catjam.gif" quality={100} width={50} height={50} />
                    </a>
                </Link>
            </div>
            <div className="flex ml-5 flex-none">
                <Link href="/">
                    <a>Home</a>
                </Link>
                <a className="pl-5" href="https://github.com/steele123/catjam">Github</a>
            </div>
            <div className="flex-1 flex justify-end pr-5">
                {theme === "dark" ? (
                    <button className="text-yellow-300" onClick={() => setTheme("light")}>
                        <SunIcon width={30} />
                    </button>
                ): (
                    <button className="text-gray-700" onClick={() => setTheme("dark")}>
                        <MoonIcon width={30} />
                    </button>
                )}
            </div>
        </div>
    )
}