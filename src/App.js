import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Routes,Route } from "react-router-dom";
import Home from "./components/Home";
function App() {
  return <div className="App">
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/home/*" element={<Home />} />
  </Routes>
  </div>
}

export default App;
