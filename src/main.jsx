import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </StrictMode>
)

