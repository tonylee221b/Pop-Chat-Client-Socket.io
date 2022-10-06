import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'

import { useSocket } from '../../context/socket.context'

interface Prop {
  setIsCreateClicked: Dispatch<SetStateAction<boolean>>
}

const CreateRoom: NextPage<Prop> = ({ setIsCreateClicked }) => {
  const { socket, setUsername, setRoomname, setMessages } = useSocket()
  const router = useRouter()

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const data = e.target as typeof e.target & {
      roomname: { value: string }
      username: { value: string }
      /*
        roomname: string
        maxNum: number
        curNum: number
        owner: string
        usernames: string[]
            */
    }

    const roomname = data.roomname.value
    const username = data.username.value

    setUsername(data.username.value)
    localStorage.setItem('username', username)

    setIsCreateClicked(false)

    data.roomname.value = ''
    data.username.value = ''

    socket.emit('create_room', roomname, username, () => {
      setRoomname(roomname)

      setMessages([])

      router.push(`/room/${roomname}`)
    })
  }

  return (
    <form
      className="h-[500px] w-[400px] bg-white p-10 flex flex-col"
      onSubmit={handleSubmit}
    >
      <div className="grow">
        <label className="text-xl mb-2">
          Room Name :
          <input
            className="bg-gray-300 outline-zinc-700 w-full px-2 py-1 rounded-lg"
            type="text"
            name="roomname"
            required
          />
        </label>
      </div>
      <div className="grow">
        <label className="text-xl mb-2">
          User Name :
          <input
            className="bg-gray-300 outline-zinc-700 w-full px-2 py-1 rounded-lg"
            type="text"
            name="username"
            required
          />
        </label>
      </div>
      <div className="mx-auto">
        <input
          type="button"
          className="bg-red-300 w-[80px] py-2 mr-5 rounded-xl drop-shadow-lg text-center hover:cursor-pointer hover:scale-105 hover:drop-shadow-xl transition-transform duration-100"
          value="X"
          onClick={() => {
            setIsCreateClicked(false)
          }}
        />
        <input
          className="bg-purple-300 min-w-[100px] mx-auto py-2 rounded-xl drop-shadow-lg text-center hover:cursor-pointer hover:scale-105 hover:drop-shadow-xl transition-transform duration-100"
          type="submit"
          value="CREATE"
        />
      </div>
    </form>
  )
}

export default CreateRoom
