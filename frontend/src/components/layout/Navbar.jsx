import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useAuth } from '@/context/AuthContext';
import { usetab } from '@/context/TabContext';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from "sonner"
import { API_URL } from '@/config/api';


export const Navbar = () => {
const { token, logout, role } = useAuth();
const navigate = useNavigate()
const {setTab}=usetab()

const [openPop, setOpenPop] =useState(false)
const [loading, setLoading] =useState(false)
const [roomtype, setRoomtype] =useState("")
const [roomnum, setRoomnum] =useState()

const handleadd = async(e)=>{

   e.preventDefault();

    if (!roomtype || !roomnum) {
      toast.error("Please fill all fields ");
      return;
    }
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/tasktype/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type":"application/json"
        },
        body: JSON.stringify({roomnum,roomtype})
      })

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        alert("upload success");
        setOpenPop(false);
        setRoomnum()
        setRoomtype("")
        

      } else {
        alert("upload failed")
      }

    } catch (error) {
      console.log('not submitted')
      toast.error("error in submission")
    }
    finally {
      setLoading(false)
    }
  }


  const handlelogout = () => {
    logout();
    navigate("/login", { replace: true })
  }

  return (
    <div>

      <header className="fixed top-0 left-0  z-50  w-full shadow-md bg-white dark:bg-gray-900">
        <div className=" max-w-7xl mx-auto flex justify-between items-center px-4 py-4">

          {!token ? (
            <></>
          )
            : (
              <nav className="hidden md:flex space-x-6">
                {
                  (role == 'user') ? (<>

                    <div  className=" ml-15 text-2xl font-bold text-blue-600">
                      MyHotel
                    </div>
                    <div className='flex items-center space-x-2 w-full ml-20'>
                      <div className="relative flex w-[500px] gap-10 justify-center ml-36  ">
                       
                        <button onClick={()=>{setTab('available')}} className='text-xl font-bold text-blue-600' >
                        Available
                        </button>
                        <button onClick={()=>{setTab('booked')}} className='text-xl font-bold text-blue-600'>
                        Booked
                        </button>
                      </div>
                     
                      <Button variant="destructive"  onClick={handlelogout} className={"ml-50"} > Logout
                </Button>
                    </div>
                  </>
                  )
                    : (<>
                      <div className="text-xl font-bold text-blue-600">
                        MyHotel
                      </div>

                       <div className="flex ml-240 gap-12  ">
        <Dialog open={openPop} onOpenChange={setOpenPop} >
          <DialogTrigger asChild>
            <Button onClick={() => setOpenPop(!openPop)}>Add Room</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md p-6 rounded-2xl shadow-lg bg-white ">
            <form onSubmit={handleadd} className="flex flex-col gap-4 mt-4">
              <div className='flex gap-14'>
              <Select value={roomtype} onValueChange={(value)=> setRoomtype(value)} >
                                                         <SelectTrigger>
                                                           <SelectValue placeholder="Room Type" />
                                                         </SelectTrigger>
                                                    <SelectContent>
                                                     <SelectItem value="single">Single</SelectItem>
                                                     <SelectItem value="double">Double</SelectItem>
                                                     <SelectItem value="deluxe">Deluxe</SelectItem>
                                                     </SelectContent>
                                                       </Select>
                    <Input placeholder="Room no." type="Number" value={roomnum}   onChange={(e) => setRoomnum(Number(e.target.value))} className={"w-30"}/> 
                    </div>                                  
              <div className="flex justify-between gap-2 mt-2">
                <Button type="button" onClick={() => setOpenPop(false)}>Cancel</Button>
                <Button type="submit" disabled={loading} >
                  {loading ? "Uploading.." : "Add"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
                       <Button variant="destructive" className="" onClick={handlelogout} > Logout
                </Button>
      </div>
                </>
                    )
                }
              </nav>
            )}
        </div>
      </header>
    </div>
  )
}
