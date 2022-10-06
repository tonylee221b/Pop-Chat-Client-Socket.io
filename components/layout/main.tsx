import { NextPage } from 'next'
import { motion } from 'framer-motion'

interface Props {
  children: JSX.Element | JSX.Element[]
}

const Layout: NextPage<Props> = ({ children }) => {
  return (
    <motion.div
      className="max-w-screen-xl mx-auto h-full"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.7,
      }}
    >
      {children}
    </motion.div>
  )
}

export default Layout
