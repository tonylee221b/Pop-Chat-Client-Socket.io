import { NextPage } from 'next'
import Image from 'next/image'

import Layout from '../components/layout/main'
import Container from '../components/layout/container'

import TonyLogo from '../public/tony_pvt.jpeg'

const About: NextPage = () => {
  return (
    <Container>
      <Layout>
        <div className="pt-32 px-5 flex flex-wrap">
          <div className="grow mb-10">
            <p className="text-white font-bold text-3xl">About</p>
            <p className="text-white text-xl mt-24">
              Pop Chat is a chat application project created by DarkCoder
            </p>
            <p className="text-white text-xl md:ml-48 mt-5">
              using{' '}
              <span className="font-bold text-purple-300">
                NextJS, TailwindCSS, Express, and Socket.IO
              </span>
            </p>
          </div>
          <div className="relative w-52 h-52 rounded-full border-2 border-purple-400 mx-auto">
            <Image
              src={TonyLogo}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </div>
      </Layout>
    </Container>
  )
}

export default About
