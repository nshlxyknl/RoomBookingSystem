import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthProvider'
import { TabProvider } from './context/TabProvider'
import { RoomProvider } from './context/RoomProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <TabProvider>
      <RoomProvider>
    <App />
    </RoomProvider>
    </TabProvider>
    </AuthProvider>
  </StrictMode>,
)
