import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Layout from '../../components/layout/main'
import ChatPop from '../../components/chat/ChatPop'
import Container from '../../components/layout/container'

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
        <div className="py-24">
          <div className="p-10 border border-purple-300 rounded-3xl m-14">
            <div className="flex items-center justify-center">
              <div className="grow">
                <p className="text-purple-400 text-4xl">Roomname: {roomname}</p>
              </div>
              <div
                className="text-white bg-red-500 px-3 py-1 rounded-lg hover:cursor-pointer hover:scale-105 transition-transform duration-75"
                onClick={handleLeaveClick}
              >
                Leave Room
              </div>
            </div>
            <div className="flex flex-col bg-gray-800 rounded-3xl mt-10">
              <div className="h-[450px] p-5 overflow-auto overscroll-auto">
                <ChatPop />
              </div>

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
      </Layout>
    </Container>
  )
}

export default ChatRoom
