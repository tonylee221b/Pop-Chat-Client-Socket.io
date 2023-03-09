import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { io, Socket } from 'socket.io-client'

import { SOCKET_URL } from '../config/socket.config'

export const socket = io(SOCKET_URL, {
  withCredentials: true,
})

// Type declaration
export interface Msg {
  message: string
  time: string
  username: string
  type: string
}

export interface Room {
  roomname: string
  maxNum?: number
  curNum: number
  owner: string
  usernames: string[]
  messages: Msg[]
}

interface SocketContextType {
  socket: Socket
  username?: string
  setUsername: (newUsername: string) => void
  roomname?: string
  setRoomname: (newRoomname: string) => void
  rooms: Room[]
  messages?: Msg[]
  setMessages: (msgs: Msg[]) => void
}

const initData: SocketContextType = {
  socket,
  setUsername: () => false,
  setRoomname: () => false,
  setMessages: () => false,
  rooms: [],
}

const SocketContext = createContext<SocketContextType>(initData)

const SocketProvider = (props: any) => {
  const [username, setUsername] = useState('')
  const [roomname, setRoomname] = useState('')
  const [rooms, setRooms] = useState<Set<Room>>()
  const [messages, setMessages] = useState<Msg[]>([])
  const router = useRouter()

  useEffect(() => {
    window.onfocus = () => {
      document.title = 'Pop Chat'
    }
  }, [])

  useEffect(() => {
    socket.on('show_rooms', (roomList) => {
      setRooms(roomList)
    })

    socket.on('new_message', (msg) => {
      if (!document.hasFocus()) document.title = 'New Message...'

      setMessages(msg)
    })

    socket.on('created_room', () => {
      setMessages([])
    })

    socket.on('joined_room', (foundRoom: Room) => {
      setMessages(foundRoom.messages)
    })

    socket.on('left_room', (foundRoom: Room) => {
      setMessages(foundRoom.messages)
    })

    socket.on('room_deleted', () => {
      router.push('/room')
    })
  }, [socket])

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        rooms,
        roomname,
        setRoomname,
        messages,
        setMessages,
      }}
      {...props}
    />
  )
}

export const useSocket = () => useContext(SocketContext)

export default SocketProvider
