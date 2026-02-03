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
    <div className='mt-30 mb-20 min-h-screen w-full'>
  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 px-4'>
    {
      tab === "available" ? (
        available?.length > 0 ? (
          available.map((room) => (
            <AvailableCard
              key={room._id} 
              room={room} 
            />
          ))
        ) : (
          <p className="text-gray-500">No available rooms</p>
        )
      ) : tab === "booked" ? (
        booked?.length > 0 ? (
          booked.map((room) => (
            <BookedCard 
              key={room._id} 
              room={room} 
            />
          ))
        ) : (
          <p className="text-gray-500">No booked rooms</p>
        )
      ) : (
        <p className="text-gray-500">What do you wanna see???</p>
      )
    }
  </div>
</div>
  )
}
