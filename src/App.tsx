import {Routes, Route, NavLink} from 'react-router-dom';
import { useState } from "react";

import Settings from './pages/Settings';
import Home from "./pages/Home.tsx";


function App() {

  const [theme, setTheme] = useState<"light" | "dark">("light");
 
 const toggleTheme = () => {
  setTheme(theme === "light" ? "dark" : "light");
 };

  return (

    <div data-theme={theme}>
      {/* --- header/nav section --- */}
      <header style={{ padding: "1rem", borderBottom: "1px solid #ccc"}}>
{/* navLink is nice because it highlights when active */}
          <NavLink to="/" style={{marginRight: "1rem"}}>Home</NavLink>
          <NavLink to ="/settings" className="link">Settings</NavLink>
       
       {/* Theme Button */}
        <button onClick={toggleTheme} style={{marginLeft: "1rem"}}>
        </button>
        </header>

        {/* --- main content --- */}
        <main style={{padding: "1rem"}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element = {<Settings />} />
          </Routes>
        </main>
    </div>
  );
}

export default App;