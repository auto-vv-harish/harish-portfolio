import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from "react-hot-toast";
import Song_App from "./Song_App";



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Song_App />
    <Toaster position="top-right" />
  </StrictMode>,
)
