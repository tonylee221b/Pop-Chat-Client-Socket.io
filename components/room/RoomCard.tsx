import { NextPage } from 'next'

import { Room } from '../../context/socket.context'

interface Props {
  room: Room
}

const RoomCard: NextPage<Props> = ({ room }) => {
  return (
    <div
      className="text-zinc-700 bg-purple-400 h-[150px] px-3 py-2 rounded-xl
        hover:scale-105 hover:cursor-pointer
        transition-transform duration-75"
    >
      <div className="flex flex-col h-full">
        <div className="text-white text-4xl grow">{room.roomname}</div>
        <div className="text-white text-md text-end">
          Created by: {room.owner}
        </div>
      </div>
    </div>
  )
}

export default RoomCard
