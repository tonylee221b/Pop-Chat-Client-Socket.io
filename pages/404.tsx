import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import Layout from '../components/layout/main'
import NotFoundImg from '../public/NotFound1.png'

const NotFound: NextPage = () => {
  return (
    <div className="bg-black flex h-[calc(100vh-64px)]">
      <Layout>
        <div className="my-32 text-center">
          <p className="text-white text-6xl">Page Not Found...</p>
          <p className="text-white text-2xl mt-5">
            Go back &nbsp;
            <Link href="/">
              <a className="text-teal-400">Home</a>
            </Link>
          </p>
        </div>
        <div className="relative w-[600px] h-[600px]">
          <Image src={NotFoundImg} layout="fill" objectFit="cover" />
        </div>
      </Layout>
    </div>
  )
}

export default NotFound
