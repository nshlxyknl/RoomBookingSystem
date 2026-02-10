import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthProvider'
import { TabProvider } from './context/TabProvider'
import { RoomProvider } from './context/RoomProvider'
import { GoogleOAuthProvider } from '@react-oauth/google'

const CLIENT_ID="800452047417-g9gm7pggs6386ma9bvgce0t7nudbal8g.apps.googleusercontent.com"

console.log("Google Client ID:", CLIENT_ID ? "✓ Loaded" : "✗ Missing");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider 
      clientId={CLIENT_ID}
      onScriptLoadError={() => console.error('Google OAuth script failed to load')}
      onScriptLoadSuccess={() => console.log('Google OAuth script loaded successfully')}
    >
      <AuthProvider>
        <TabProvider>
          <RoomProvider>
            <App/>
          </RoomProvider>
        </TabProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
)
