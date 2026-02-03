import React, { useState } from 'react'
import RoomContext from './RoomContext';
import { API_URL } from '@/config/api';
import { useCountdown } from './UseCountdown';

export const RoomProvider = ({children}) => {
const [available, setAvailable]=useState()
const [booked, setBooked]=useState()
const [all, setAll]=useState()


const getTimeLeft = (expiresAt) => {
  if (!expiresAt) return "—"

  const diff = new Date(expiresAt) - Date.now()
  if (diff <= 0) return "Expired"

   const totalMinutes = Math.floor(diff / (1000 * 60));
      const days = Math.floor(totalMinutes / (60 * 24));
      const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
      const minutes = totalMinutes % 60;

      let result = "";
      if (days > 0) result += `${days}d `;
      if (hours > 0) result += `${hours}h `;
      result += `${minutes}m`;

  return result
}


    const fetchRooms = async () => {
    try {
      const res = await fetch(`${API_URL}/tasktype/all`, {
        method:"GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await res.json();
      setAll(data.rooms)
      setAvailable(data.rooms.filter(room => room.status === 'available'));
      setBooked(data.rooms.filter(room => room.status === 'booked'));
    console.log("Rooms with buyer:", data);

    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handlecheck= async (room,time)=>{

   if (!room?._id) {
      console.error('No room ID');
      return;
    }

          const { _id: roomId, status } = room

try {
 const res= await fetch(`${API_URL}/tasktype/update`,{
  method:"PUT",
  headers:{
    "Authorization":`Bearer ${localStorage.getItem('token')}`,
    "Content-Type":"application/json"
  },
  body: JSON.stringify({status,roomId,time})
 })
 
  if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

 const data = await res.json();
    console.log('Room updated:', data.room);
    await fetchRooms()
} catch (error) {
  console.log(error)
}
}

  return (
    <RoomContext.Provider value={{available,booked,setAvailable,setBooked,all,setAll, fetchRooms, handlecheck, getTimeLeft}}>
        {children}
    </RoomContext.Provider>
  )
}
