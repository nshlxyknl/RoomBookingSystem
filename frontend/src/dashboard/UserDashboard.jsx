import { AvailableCard } from '@/cards/AvailableCard'
import { BookedCard } from '@/cards/BookedCard'
import { useRoom } from '@/context/RoomContext'
import { usetab } from '@/context/TabContext'
import React, { useEffect } from 'react'

export const UserDashboard = () => {

  const {tab}= usetab()
  const { available, booked, fetchRooms } = useRoom();

  useEffect(() => {
    fetchRooms();
  }, []);


  return (
    <div className='h-screen w-70 flex gap-6 mt-30 ml-10 mb-20'>
    {
      tab=="available"?(
        available?.length > 0 ? (
          available.map((room) => (
            <AvailableCard
              key={room._id} room={room} 
            />
          ))
        ) : (
          <p>No available rooms</p>
        )
      ) :
      tab=="booked"? (
        booked?.length > 0 ? (
          booked.map((room) => <BookedCard  key={room._id} room={room} />)
        ) : (
          <p>No booked rooms</p>
        )
      ) :
       ( "What do you wanna see???")
    }
    </div>
  )
}
