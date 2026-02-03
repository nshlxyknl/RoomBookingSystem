import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { API_URL } from '@/config/api'
import { useRoom } from '@/context/RoomContext'
import React, {  useState } from 'react'
import { toast } from 'sonner'


export const AvailableCard = ({room}) => {

  const [time, setTime]=useState("")

    const { _id: roomId, roomnum, roomtype, price,status } = room
    const {handlecheck}=useRoom()
    
    const handlepay = async (e) => {
e.preventDefault();

if (!time || !roomId || !roomtype || !price) {
      toast.error("Please select a time or missing booking info")
      return
    }

    try {
      const res = await fetch(`${API_URL}/tasktype/pay`, {
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
     <div className='flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow'>
      <div className='w-full h-full overflow-hidden rounded-t-lg'>
          <img
            src={`${API_URL}${room.image}`}
            alt={roomtype}
            className="w-full h-full object-cover"
          />
      </div >
      <div className='flex flex-col flex-1 p-4 gap-4'>
        <h1 className='font-bold text-lg'>Room number {roomnum} </h1>
          <p className='text-gray-600'>Type: {roomtype}</p>
                  <p className='text-blue-600 font-semibold'>$ {price/100}</p>

        <br></br>
          <div className='flex-1' >
            <Select value={time} onValueChange={(value)=> setTime(value)} >
                                                         <SelectTrigger className={'w-full'} >
                                                <SelectValue placeholder="Select Time " /> 
                                                         </SelectTrigger>
                                                    <SelectContent>
                                                     <SelectItem value="aday">1 day</SelectItem>
                                                     <SelectItem value="aweek">1 week</SelectItem>
                                                     </SelectContent>
                                                       </Select>
          </div>
          <div>
            
          </div>
        <form onSubmit={handlepay} className='w-full'>
          <div>
               <Button type="submit" className={"w-full"}>Book</Button>

          </div>

         </form>

      </div>
    </div>
  )
}

