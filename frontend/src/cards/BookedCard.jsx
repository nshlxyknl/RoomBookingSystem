import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { useCountdown } from '@/context/UseCountdown';
import { useRoom } from '@/context/RoomContext';
import { API_URL } from '@/config/api';

export const BookedCard = ({room}) => {

      const {  roomnum, roomtype } = room

    const timeLeft = useCountdown(room.expiresAt);

const {handlecheck}=useRoom()

// useEffect(() => {
//   const interval = setInterval(() => {
//   window.location.reload()
//   },60*1000);

//   return () => clearInterval(interval);
// }, [])


  return (
     <div className='w-70 h-55  '>
      <div className='h-35'>
          <img
            src={`${API_URL}${room.image}`}
            alt={roomtype}
            className="bg-cover h-35 rounded-xl"
          />
      </div>
      <div className='ml-2'>
        <h1 className='font-bold'>Room number {roomnum} </h1>
        <h1 className='font-bold'>Type {roomtype}</h1>
        <br></br>
        <div className='flex flex-col gap-3'>
          <div>
      <p> {timeLeft} remaining</p>
         </div>
          <div>
            <Button onClick={()=>handlecheck(room)} className={"w-50"}>Checkout </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
