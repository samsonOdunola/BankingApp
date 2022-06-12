import { IoCopyOutline } from "react-icons/io5";
import { useEffect,useState } from "react";
import { SiVisa } from "react-icons/si";
import { FaRegCreditCard } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
const Dashboard = () => {
    const [activeUser, setActiveUser] = useState()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getCurrentUser()
        
        
    }, [])
    // console.log(activeUser.AccountBalance)
    const getCurrentUser=()=>{
        let currentUser =JSON.parse(localStorage.currentUser)
        setActiveUser(currentUser)
        setLoading(true)
        
    }
    function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return <div className="dashboard">
        {loading&&<div className="accountinfo">            
            <h3>Total Balance({activeUser.Accounttype} Account)</h3>
            <p>$ {numberWithCommas(activeUser.AccountBalance)}</p>
            <p className="acctnum">{activeUser.Accountnum} < IoCopyOutline className="copyicon" onClick={()=>navigator.clipboard.writeText(activeUser.Accountnum)}/></p>
            <div className="recent">
                <h3>Recent Transactions</h3>
                {activeUser.recentTransaction.map((transaction,index)=>{
                    const{transferAmount,transferTo,ban,type}=transaction
                    return <div key={index} className="transaction">
                    <div className="leftside">
                        <div className="transacimg"></div>
                        <div>
                            <p className="transacname">{ban}</p>
                            <p>{type?"DEBIT":"CREDIT"}</p>
                        </div>
                    </div>
                    <div className={`transacvalue ${type?"debit":"credit"}`}>{type?-transferAmount:transferAmount}</div>
                </div>
                })}
                
            </div>
        </div>}
        {loading&&<div className="cardinfo">
            <div className="head"><h3>Credit Cards</h3> < FaRegCreditCard className="cardicon"/></div>
            <div className="creditcard">
                <p className="cardname">Loft Bank | AlphaBank</p>
                <p className="cardnum"> 4532 4141 5341 3221</p>
                <div><p>08/24</p><SiVisa className="visaicon"/></div>
            </div>
            <div className="sendagain">
                <h1>Send Again</h1>
                <div className="container">
                    <button className="icon"><FiArrowRight/></button>
                    <div className="icon people"></div>
                    <div className="icon people"></div>
                </div>
                
            </div>
        </div>}
        

    </div>;
}


export default Dashboard;