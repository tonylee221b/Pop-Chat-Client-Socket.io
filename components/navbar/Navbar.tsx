import { NextPage } from 'next'
import Link from 'next/link'

const Navbar: NextPage = () => {
  return (
    <div className="bg-black z-50 relative">
      <div className="max-w-screen-xl h-16 flex items-center p-3 mx-auto">
        <div>
          <Link href="/">
            <a className="navbar__logo">POP CHAT</a>
          </Link>
        </div>
        <div className="flex-1"></div>
        <div className="mr-2">
          <Link href="/about">
            <a className="navbar__btn">About</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
