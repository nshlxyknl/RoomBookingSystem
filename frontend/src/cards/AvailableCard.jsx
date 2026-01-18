import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRoom } from '@/context/RoomContext'
import React, {  useState } from 'react'


export const AvailableCard = ({room}) => {

  const [time, setTime]=useState("")

    const { _id: roomId, roomnum, roomtype, price,status } = room
    const {handlecheck}=useRoom()
    
    const handlepay = async (e) => {
e.preventDefault();

if (!time || !roomId || !roomtype || !price) {
      alert("Please select a time or missing booking info")
      return
    }

    try {
      const res = await fetch("http://localhost:4000/tasktype/pay", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          time, roomId,
           price, roomtype,status, roomnum
        })
      });

      const data = await res.json();
      window.location.href = data.url;
      await handlecheck(room,time)
    } catch (error) {
      console.error("error in payment")
    }
  }

  return (
     <div className='w-70 h-55 '>
      <div className='h-35  '>
          <img
            src={`http://localhost:4000${room.image}`}
            alt={roomtype}
            className="bg-cover h-35 rounded-xl"
          />
      </div>
      <div>
        <h1 className='font-bold'>Room number {roomnum} </h1>
        <h1 className='font-bold'>Type {roomtype} </h1>
        <br></br>
        <form onSubmit={handlepay} className='flex gap-6'>
          <div>
            <Select value={time} onValueChange={(value)=> setTime(value)} >
                                                         <SelectTrigger >
                                                <SelectValue placeholder="Select Time" /> 
                                                         </SelectTrigger>
                                                    <SelectContent>
                                                     <SelectItem value="aday">1 day</SelectItem>
                                                     <SelectItem value="aweek">1 week</SelectItem>
                                                     </SelectContent>
                                                       </Select>
          </div>
          <div>
               <Button type="submit">Book</Button>

          </div>

         </form>

      </div>
    </div>
  )
}

