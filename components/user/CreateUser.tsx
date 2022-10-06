import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'

import { useSocket } from '../../context/socket.context'

interface Prop {
  roomname: string
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const CreateUser: NextPage<Prop> = ({ roomname, setIsOpen }) => {
  const { socket, setUsername, setRoomname, setMessages, rooms } = useSocket()
  const [isNewUser, setIsNewUser] = useState<boolean>(true)
  const router = useRouter()

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const data = e.target as typeof e.target & {
      username: { value: string }
    }

    const username = data.username.value

    const foundroom = rooms.find((room) => room.roomname === roomname)

    if (
      foundroom?.usernames.find((user) => user === username) ||
      foundroom?.owner === username
    ) {
      setIsNewUser(false)
      setIsOpen(true)
    } else {
      socket.emit('join_room', roomname, username, () => {
        setRoomname(roomname)

        setMessages([])

        router.push(`/room/${roomname}`)
      })

      setIsNewUser(true)
      setUsername(data.username.value)
      localStorage.setItem('username', username)

      data.username.value = ''

      setIsOpen(false)
    }
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
            className="bg-gray-300 outline-zinc-700 w-full px-2 py-1 rounded-lg disabled:text-gray-600"
            type="text"
            name="roomname"
            value={roomname}
            required
            disabled
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
        {!isNewUser && (
          <span className="text-red-500">Username already exists</span>
        )}
      </div>
      <div className="mx-auto">
        <input
          type="button"
          className="bg-red-300 w-[80px] py-2 mr-5 rounded-xl drop-shadow-lg text-center hover:cursor-pointer hover:scale-105 hover:drop-shadow-xl transition-transform duration-100"
          value="X"
          onClick={() => {
            setIsOpen(false)
          }}
        />
        <input
          className="bg-purple-300 min-w-[100px] py-2 rounded-xl drop-shadow-lg text-center hover:cursor-pointer hover:scale-105 hover:drop-shadow-xl transition-transform duration-100"
          type="submit"
          value="JOIN"
        />
      </div>
    </form>
  )
}

export default CreateUser
