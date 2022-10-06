import { NextPage } from 'next'
import { useEffect, useRef } from 'react'
import { nanoid } from 'nanoid'

import { Msg, useSocket } from '../../context/socket.context'

const ChatPop: NextPage = () => {
  const bottomRef = useRef<null | HTMLDivElement>(null)
  const { messages } = useSocket()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'auto',
    })
  }, [messages])

  return (
    <div className="flex flex-col">
      {messages &&
        messages.map((msg: Msg) =>
          msg.username !== localStorage.getItem('username') ? (
            <div key={nanoid()}>
              {msg.type === 'GENERAL' ? (
                <div className="text-white bg-zinc-600 text-center p-2 rounded-lg drop-shadow-lg mb-4">
                  {msg.message}
                </div>
              ) : (
                <div className="flex">
                  <div>
                    <div className="text-gray-300 font-light mb-1 ml-1">
                      {msg.username}
                    </div>
                    <div className="bg-purple-500 py-1 px-3 rounded-xl text-white mb-5 w-fit drop-shadow-lg">
                      {msg.message.split('\n').map((text) => (
                        <span key={nanoid()}>
                          {text}
                          <br />
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-white text-sm font-light ml-3 mt-auto mb-5">
                    {msg.time}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div key={nanoid()}>
              {msg.type === 'GENERAL' ? (
                <div className="text-white bg-zinc-600 text-center p-2 rounded-lg drop-shadow-lg mb-4">
                  {msg.message}
                </div>
              ) : (
                <div className="flex">
                  <div className="text-white text-sm font-light mr-3 mt-auto mb-5 ml-auto">
                    {msg.time}
                  </div>
                  <div>
                    <div className="text-gray-300 font-light mb-1 mr-1 text-right">
                      {msg.username}
                    </div>
                    <div className="bg-pink-500 py-1 px-3 rounded-xl text-white mb-5 w-fit drop-shadow-lg">
                      {msg.message.split('\n').map((text) => (
                        <span key={nanoid()}>
                          {text}
                          <br />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        )}

      <div className="h-1" ref={bottomRef} />
    </div>
  )
}

export default ChatPop
