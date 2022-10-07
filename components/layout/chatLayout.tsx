import { NextPage } from 'next'

interface Props {
  children: JSX.Element
}

const ChatLayout: NextPage<Props> = ({ children }) => {
  return (
    <div className="flex h-full py-32">
      {/* ChatRoom Container */}
      <div className="flex max-h-[500px] md:max-h-[500px] lg:max-h-[600px] my-auto mx-44 md:mx-52 lg:mx-64 w-full h-full">
        {/* ChatRoom Outline */}
        <div className="border-[3px] border-purple-300 flex text-white m-auto w-full h-full rounded-3xl p-5">
          {children}
        </div>
      </div>
    </div>
  )
}

export default ChatLayout
