import Navbar from "./Navbar";
import { Routes, Route,useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import { MdNotifications } from "react-icons/md";
import { useEffect,useState } from "react";
import Transfer from "./Transfer";
import Wallet from "./Wallet";
import { BiMenuAltLeft } from "react-icons/bi";
import { MdOutlineDashboard,MdOutlineAccountBalanceWallet } from "react-icons/md";
import { GrLogout } from "react-icons/gr";
import { TbSend } from "react-icons/tb";
import { Link } from "react-router-dom";

const Home = () => {
    const [activeUser, setActiveUser] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)

    const logout =()=>{
        localStorage.removeItem("currentUser")
        navigate("/")

    }
    
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
    const handleMobilemenu=()=>{
        if(showMenu){
            setShowMenu(false)
        }else{
            setShowMenu(true)   
        }

    }
    const handleMobilemenuClose=()=>{
        if(showMenu){
            setShowMenu(false)
        }      
    }

    return <main onClick={handleMobilemenuClose} >
        <header>
            <BiMenuAltLeft onClick={handleMobilemenu} className="mobileonly mobilenav"/>
            {showMenu&&<div className="mobilenavcontent">
                <p>{loading&&`Hi, ${activeUser.FirstName}`}</p>
                <ul>
                   <Link onClick={()=>setShowMenu(false)} className="link" to="dashboard"><li>< MdOutlineDashboard className="menu-icon"/>Dashboard</li></Link>
                   <Link onClick={()=>setShowMenu(false)} className="link" to="wallet"><li>< MdOutlineAccountBalanceWallet className="menu-icon"/>Wallet </li></Link>
                   <Link onClick={()=>setShowMenu(false)} className="link" to="transfer"><li>< TbSend className="menu-icon"/>Transfer</li></Link>
                   <li className="logoutbtn" onClick={logout}><GrLogout className="menu-icon"/>Logout</li>
                </ul>
            </div>}
            <h1>LoftBank</h1>
            <div className="iconCluster">
                <p>{loading&&`Hi, ${activeUser.FirstName}`}</p>
                <img src={require("../images/image-1.png")} alt="" />
                <MdNotifications  onClick={reset}/>
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