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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
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
