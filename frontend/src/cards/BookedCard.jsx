import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { useCountdown } from '@/context/UseCountdown';
import { useRoom } from '@/context/RoomContext';

export const BookedCard = ({room}) => {

      const {  roomnum, roomtype } = room

    const timeLeft = useCountdown(room.expiresAt);

const {handlecheck}=useRoom()

useEffect(() => {
  const interval = setInterval(() => {
  window.location.reload()
  },60*1000);

  return () => clearInterval(interval);
}, [])


  return (
     <div className='min-w-[300px] h-80 '>
      <div className='h-35'>
          <img
            src={`http://localhost:4000${room.image}`}
            alt={roomtype}
            className="object-cover rounded-xl"
          />
      </div>
      <div className='ml-2'>
        <h1 className='font-bold'>Room number {roomnum} </h1>
        <h1 className='font-bold'>Type {roomtype}</h1>
        <br></br>
        <div className='flex flex-col gap-3'>
          <div>
      <p>Time left: {timeLeft} remaining</p>
         </div>
          <div>
            <Button onClick={()=>handlecheck(room)} className={"w-60"}>Checkout </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
