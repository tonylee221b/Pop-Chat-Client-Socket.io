import { NextPage } from 'next'

interface Props {
  children: JSX.Element
}

const Container: NextPage<Props> = ({ children }) => {
  return (
    <div className="w-screen full__height">
      <div className="w-full h-full bg-black">{children}</div>
    </div>
  )
}

export default Container
