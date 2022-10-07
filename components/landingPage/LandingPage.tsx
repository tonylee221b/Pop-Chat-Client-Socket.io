import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import HomeIllustration from '../../public/LandingPage1.png'

const LandingPage: NextPage = () => {
  const router = useRouter()

  const handleStartClick = () => {
    router.push('/room')
  }

  return (
    <div className="h-full relative">
      <div className="flex h-full">
        <div className="mx-auto my-auto md:basis-4/5 text-center z-10 grow">
          <p className="text-5xl text-white font-bold">Pop the world</p>
          <p className="text-white text-2xl mt-5">Pop the word!</p>
          <button
            className="btn text-purple-500 mt-20"
            onClick={handleStartClick}
          >
            Start Pop Chat
          </button>
        </div>
        <div className="md:basis-1/5"></div>
        <motion.div
          className="absolute right-0 bottom-24 z-0"
          key="LandingImg"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.7 } }}
          exit={{ y: 30, opacity: 0, transition: { duration: 0.3 } }}
        >
          <div className="relative h-[500px] w-[500px] md:h-[600px] md:w-[600px]">
            <Image
              src={HomeIllustration}
              alt="Landing Page"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LandingPage
