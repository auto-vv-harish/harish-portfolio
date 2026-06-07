import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from "react-hot-toast";



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster position="top-right" />
  </StrictMode>,
)
import Song_App from "./Song_App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Song_App />
  </StrictMode>
);