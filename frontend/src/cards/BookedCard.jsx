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
     <div className='flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden '>
      <div className='w-full h-48 overflow-hidden rounded-t-lg'>
          <img
            src={`${API_URL}${room.image}`}
            alt={roomtype}
            className="w-full h-full object-cover"
          />
      </div>
      <div className='flex flex-col flex-1 p-4 gap-3'>
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
