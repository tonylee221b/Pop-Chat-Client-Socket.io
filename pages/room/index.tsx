import { NextPage } from 'next'
import { useState } from 'react'
import { HiOutlinePlus } from 'react-icons/hi'
import { motion } from 'framer-motion'
import { nanoid } from 'nanoid'

import Layout from '../../components/layout/main'
import Container from '../../components/layout/container'
import { useSocket, Room } from '../../context/socket.context'

import CreateRoom from '../../components/room/CreateRoom'
import RoomCard from '../../components/room/RoomCard'
import CreateUser from '../../components/user/CreateUser'

const variants = {
  open: {
    clipPath: 'inset(0% 0% 0% 0% round 10px)',
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    clipPath: 'inset(50% 50% 50% 50% round 10px)',
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.4,
    },
  },
}

const Room: NextPage = () => {
  const [isCreateClicked, setIsCreateClicked] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [clickedRoom, setClickedRoom] = useState<string>('')
  const { rooms } = useSocket()

  const handleJoinClick = (room: Room) => {
    setClickedRoom(room.roomname)
    setIsOpen(true)
  }

  return (
    <Container>
      <Layout>
        <div className="pt-32">
          <div className="border border-purple-300 rounded-3xl p-5 max-h-[900px] min-h-[50vh] flex flex-col">
            {/* Header */}
            <div className="flex">
              <div className="grow">
                <p className="text-white text-3xl">Rooms</p>
              </div>
              <button
                className="btn flex items-center justify-center disabled:text-gray-400 disabled:cursor-default"
                onClick={() => {
                  setIsCreateClicked(!isCreateClicked)
                }}
                disabled={isOpen}
              >
                <HiOutlinePlus className="mr-2" />
                Create
              </button>
            </div>

            {/* Room List */}
            <div className="flex relative grow pt-10 px-5">
              {!isCreateClicked && rooms && rooms.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full h-full">
                  {rooms.map((room: Room) => (
                    <div onClick={() => handleJoinClick(room)} key={nanoid()}>
                      <RoomCard room={room} />
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className={`text-white text-xl font-light my-auto mx-auto ${
                    isCreateClicked ? 'hidden' : ''
                  }`}
                >
                  <p>No Rooms yet...</p>
                </div>
              )}

              {/* CreateRoom */}
              <motion.div
                initial={false}
                animate={isCreateClicked ? 'open' : 'closed'}
                className={`flex ${isCreateClicked ? 'grow' : ''}`}
              >
                <motion.div
                  variants={variants}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <CreateRoom setIsCreateClicked={setIsCreateClicked} />
                </motion.div>
              </motion.div>

              {/* CreateUser */}
              {rooms && clickedRoom && (
                <motion.div
                  initial={false}
                  animate={isOpen ? 'open' : 'closed'}
                  className={`flex ${isOpen ? 'grow' : ''}`}
                >
                  <motion.div
                    variants={variants}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <CreateUser roomname={clickedRoom} setIsOpen={setIsOpen} />
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </Container>
  )
}

export default Room
