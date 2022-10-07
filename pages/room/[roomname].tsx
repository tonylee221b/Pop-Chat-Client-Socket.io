import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Layout from '../../components/layout/main'
import ChatPop from '../../components/chat/ChatPop'
import Container from '../../components/layout/container'
import ChatLayout from '../../components/layout/chatLayout'

import { useSocket } from '../../context/socket.context'

const ChatRoom: NextPage = () => {
  const router = useRouter()
  const { roomname } = router.query
  const { socket } = useSocket()

  const handleLeaveClick = () => {
    socket.emit(
      'leave_room',
      roomname,
      localStorage.getItem('username'),
      () => {
        localStorage.setItem('username', '')

        router.push('/room')
      }
    )
  }

  const handleMessageSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const data = e.target as typeof e.target & {
      form: { value: string }[]
    }

    const inputText: string = data.form[0].value
    data.form[0].value = ''

    if (inputText !== '') {
      socket.emit('send_message', {
        roomname: roomname,
        message: inputText,
        username: localStorage.getItem('username'),
      })
    }
  }

  const submitOnEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      handleMessageSubmit(e)
    } else {
      return null
    }
  }

  return (
    <Container>
      <Layout>
        <ChatLayout>
          {/* Content Container */}
          <div className="m-auto w-full h-full flex flex-col text-white">
            {/* Title */}
            <div className="flex items-center m-3">
              <div className="grow">
                <p className="text-purple-400 text-2xl font-bold">
                  Roomname: {roomname}
                </p>
              </div>
              <div
                className="text-white bg-red-500 px-3 py-1 rounded-lg hover:cursor-pointer hover:scale-105 transition-transform duration-75"
                onClick={handleLeaveClick}
              >
                Leave Room
              </div>
            </div>

            {/* Chat Container */}
            <div className="flex flex-col h-full min-h-0 mt-5 bg-gray-800 rounded-3xl">
              {/* Chat Window */}
              <div className="w-full flex flex-col h-full">
                {/* Chat */}
                <div className="overflow-auto scrollbar-hide flex flex-col grow mt-2 mx-2 rounded-t-2xl">
                  <div className="grow p-2">
                    <ChatPop />
                  </div>
                </div>

                {/* Form */}
                <div>
                  <form className="flex rounded-b-3xl bg-gray-600">
                    <textarea
                      id="message"
                      rows={4}
                      name="message"
                      className="w-full bg-gray-600 p-5 rounded-b-3xl outline-none text-gray-100 resize-none"
                      placeholder="Your message..."
                      onKeyDown={(e) => submitOnEnter(e)}
                    ></textarea>
                    <button
                      type="submit"
                      className="bg-gray-500 text-white px-10 m-3 rounded-3xl drop-shadow-md hover:cursor-pointer hover:drop-shadow-2xl"
                      onClick={handleMessageSubmit}
                    >
                      SEND
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </ChatLayout>
      </Layout>
    </Container>
  )
}

export default ChatRoom
