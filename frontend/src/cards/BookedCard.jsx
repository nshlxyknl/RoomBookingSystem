import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { useCountdown } from '@/context/UseCountdown';
import { useRoom } from '@/context/RoomContext';
import { API_URL } from '@/config/api';
import { useAuth } from '@/context/AuthContext';

export const BookedCard = ({room}) => {

      const {  roomnum, roomtype, buyer  } = room
      const { userId } = useAuth()

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
        <div >
          <div className='text-sm text-orange-600 font-semibold' >
      <p> ⏱️ {timeLeft} remaining</p>
         </div>
          <div>
            { 
                buyer=== userId?
            <Button onClick={()=>handlecheck(room)} className={"w-full"}>Checkout </Button>:
            <Button disabled className={"w-full"}> Booked </Button>
            }
          </div>
        </div>

      </div>
    </div>
  )
}
