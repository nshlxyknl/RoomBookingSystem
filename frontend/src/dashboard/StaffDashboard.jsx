import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useRoom } from '@/context/RoomContext'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

export const StaffDashboard = () => {

  const { booked, fetchRooms, handlecheck, getTimeLeft } = useRoom()
  

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className=" mt-20 overflow-hidden h-screen flex flex-col gap-8">
      <p className='text-2xl font-bold flex items-center justify-center mt-6'>Booked Rooms</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Room Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Booked by</TableHead>
            <TableHead>Change status</TableHead>
            <TableHead>Checkin Time</TableHead>
            <TableHead>Remaining Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {booked && booked.length > 0 ? (
            booked
            .map((room) => (
              <TableRow key={room._id}>
                <TableCell>{room.roomnum}</TableCell>
                <TableCell> {room.status} </TableCell>
                <TableCell> {room.buyer?.username} </TableCell>
                <TableCell> {room.status == "booked" ?
                  <Button onClick={async() => {
                   await handlecheck(room);   
                   toast.success(`Room number ${room.roomnum} checkedout`)}}>Checkout</Button> : "—"}
                </TableCell>
                <TableCell> {room.bookedAt ? new Date(room.bookedAt).toLocaleString() : "—"}</TableCell>
                <TableCell>⏱️{getTimeLeft(room.expiresAt)} remaining</TableCell>
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
