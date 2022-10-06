import type { NextPage } from 'next'

import Container from '../components/layout/container'
import Layout from '../components/layout/main'
import LandingPage from '../components/landingPage/LandingPage'

const Home: NextPage = () => {
  return (
    <Container>
      <Layout>
        <LandingPage />
      </Layout>
    </Container>
  )
}

export default Home
