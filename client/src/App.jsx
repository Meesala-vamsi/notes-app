import React from 'react'
import Home from './pages/Home/Home';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <div>
      <Home />
      </div>
    </>
  );
}

export default App