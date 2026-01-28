import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useRoom } from '@/context/RoomContext'
import React, { useEffect } from 'react'

export const StaffDashboard = () => {

  const { all, fetchRooms, handlecheck } = useRoom()

  // useEffect(() => {
  //   fetchRooms();
  // }, []);
  
  return (
    <div className=" mt-20 overflow-hidden h-screen flex flex-col gap-8">
      <p className='text-2xl font-bold flex items-center justify-center mt-6'>My Rooms history</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Room Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
            <TableHead>Checkin Time</TableHead>
            <TableHead>Checkout Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {all && all.length > 0 ? (
            all.map((room) => (
              <TableRow key={room._id}>
                <TableCell>{room.roomnum}</TableCell>
                <TableCell> {room.status} </TableCell>
                <TableCell> { room.status=="available"?
                  <Button onClick={()=>handlecheck(room)}>Checkout</Button> :
                  <Button disabled> Checkedout</Button> 
                }
                   </TableCell>
                <TableCell> {room.bookedAt ? new Date(room.bookedAt).toLocaleString() : "—"}</TableCell>
                <TableCell>{room.expiresAt ? new Date(room.expiresAt).toLocaleString() : "—"}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No romms at the moment.
              </TableCell>
            </TableRow>
          )}

        </TableBody>
      </Table>
    </div>)
}
