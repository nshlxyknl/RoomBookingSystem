import { useContext, createContext }  from "react"

const RoomContext= createContext() 

export const useRoom = ()=> useContext(RoomContext)

export default RoomContext