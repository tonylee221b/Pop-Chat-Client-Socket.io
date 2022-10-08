import '../styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'

import Navbar from '../components/navbar/Navbar'
import SocketProvider from '../context/socket.context'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>Pop Chat</title>
      </Head>
      <Navbar />
      <AnimatePresence mode="wait">
        <SocketProvider>
          <Component {...pageProps} key={router.route} />
        </SocketProvider>
      </AnimatePresence>
    </>
  )
}

export default MyApp
