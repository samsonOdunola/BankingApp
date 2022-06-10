import Navbar from "./Navbar";
import { Routes, Route,useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import { MdNotifications } from "react-icons/md";
import { useEffect,useState } from "react";
import Transfer from "./Transfer";
import Wallet from "./Wallet";


const Home = () => {
    const [activeUser, setActiveUser] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    useEffect(() => {
        getCurrentUser()
        
        

    },[])
    const getCurrentUser=()=>{
        let currentUser =JSON.parse(localStorage.currentUser)
        setActiveUser(currentUser)
        setLoading(true)
        
    }
    const reset=()=>{
        console.log("working")
        localStorage.removeItem("AllUser")
        localStorage.removeItem("currentUser")
        navigate("/signup")

    }

    return <main>
        <header>
            <h1>LoftBank</h1>
            <div className="iconCluster">
                <p>{loading&&`Hi, ${activeUser.FirstName}`}</p>
                <img src={require("../images/image-1.png")} alt="" />
                <MdNotifications onClick={reset}/>
            </div>
            
        </header>
        <section>
           <Navbar/>            
           <Routes>                         
               <Route path="dashboard" element={<Dashboard activeUser={activeUser}/>}></Route>
               <Route path="transfer" element={<Transfer activeUser={activeUser}/>}></Route>
               <Route path="wallet" element={<Wallet activeUser={activeUser}/>}></Route>
           </Routes>
        </section>
        
    </main>;
}


export default Home;