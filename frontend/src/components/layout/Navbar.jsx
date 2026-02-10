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
  const { setTab } = usetab()

  const [menuOpen, setMenuOpen] = useState(false)
  const [openPop, setOpenPop] = useState(false)
  const [loading, setLoading] = useState(false)
  const [roomtype, setRoomtype] = useState("")
  const [roomnum, setRoomnum] = useState()

  const handleadd = async (e) => {

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
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ roomnum, roomtype })
      })

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        toast.success("upload success");
        setOpenPop(false);
        setRoomnum()
        setRoomtype("")


      } else {
        toast.error("upload failed")
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
    <>
 { token && (
      <header className="fixed top-0 left-0  z-50  w-full  bg-white dark:bg-gray-900 shadow-md">
        <div className=" max-w-7xl mx-auto flex justify-between items-center px-4 py-4">          
             
              <nav className="flex items-center justify-between w-full  ">
                    <div className="  text-2xl font-bold text-blue-600 shrink-0 "> 
                      MyHotel
                    </div>
                {
                  (role == 'user') ? (<>
                    <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => { setTab('available'); setMenuOpen(false); }} 
                className='text-lg font-semibold text-blue-600 hover:text-blue-800 transition'
              >
                Available
              </button>
              <button 
                onClick={() => { setTab('booked'); setMenuOpen(false); }} 
                className='text-lg font-semibold text-blue-600 hover:text-blue-800 transition'
              >
                Booked
              </button>
            </div>

            <Button 
              variant="destructive" 
              onClick={handlelogout}
              className="hidden md:flex"
            >
              Logout
            </Button>

            <button
              className="md:hidden text-2xl font-bold text-gray-600 dark:text-gray-300"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>

            {menuOpen && (
              <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 md:hidden">
                <div className="flex flex-col gap-4 p-4">
                  <button 
                    onClick={() => { setTab('available'); setMenuOpen(false); }} 
                    className='text-lg font-semibold text-blue-600 hover:text-blue-800 py-2'
                  >
                    Available
                  </button>
                  <button 
                    onClick={() => { setTab('booked'); setMenuOpen(false); }} 
                    className='text-lg font-semibold text-blue-600 hover:text-blue-800 py-2'
                  >
                    Booked
                  </button>
                  <Button 
                    variant="destructive" 
                    onClick={handlelogout}
                    className="w-full"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            )}
                  </>
                  )
                    : (<>

            <Dialog open={openPop} onOpenChange={setOpenPop}>
              <DialogTrigger asChild>
                <Button onClick={() => setOpenPop(!openPop)}>Add Room</Button>
              </DialogTrigger>
              <DialogContent className="max-w-md p-6 rounded-2xl shadow-lg bg-white">
                <form onSubmit={handleadd} className="flex flex-col gap-4 mt-4">
                  <div className='flex flex-col md:flex-row gap-4 md:gap-2'>
                    <Select value={roomtype} onValueChange={(value) => setRoomtype(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Room Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="double">Double</SelectItem>
                        <SelectItem value="deluxe">Deluxe</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input 
                      placeholder="Room no." 
                      type="number" 
                      value={roomnum} 
                      onChange={(e) => setRoomnum(Number(e.target.value))} 
                      className="w-full md:w-32"
                    />
                  </div>
                  <div className="flex justify-between gap-2 mt-2">
                    <Button type="button" onClick={() => setOpenPop(false)}>Cancel</Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Uploading..." : "Add"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            <Button 
              variant="destructive" 
              onClick={handlelogout}
              className="hidden md:flex"
            >
              Logout
            </Button>

            {/* Hamburger Menu - Mobile */}
            <button
              className="md:hidden text-2xl font-bold text-gray-600 dark:text-gray-300"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>

            {/* Mobile Menu */}
            {menuOpen && (
              <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 md:hidden">
                <div className="flex flex-col gap-3 p-4">
                  <Button 
                    variant="destructive" 
                    onClick={handlelogout}
                    className="w-full"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            )}
                    </>
                    )
                }
              </nav>
        </div>
      </header>

            )}
            </>
            )
}
