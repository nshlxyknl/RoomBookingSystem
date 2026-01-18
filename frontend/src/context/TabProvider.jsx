import React, { useState } from 'react'
import TabContext from './TabContext'

export const TabProvider = ({children}) => {

    const [tab, setTab]= useState("")
  return (
   
    <TabContext.Provider value={{tab,setTab}}>
        {children}
    </TabContext.Provider>
  )
}
