import { useState,useEffect } from "react";
import { Formik, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
const Wallet = () => {
    const [modal, setModal] = useState(false);
    const [activeUser, setActiveUser] = useState()
    const [loading, setLoading] = useState(false)
    const navigate= useNavigate()
    
    const createWallet = () => {        
        setModal(true);
    }
    const deleteWallet = (index,Amount) => {        
        let alluser=JSON.parse(localStorage.AllUser)
        let userAccountnum = activeUser.Accountnum;
        let indexs = alluser.findIndex(user=>user.Accountnum===userAccountnum)        
        let updatedUser={...alluser[indexs]}
        let userWallet = activeUser.wallets        
        userWallet.splice(index,1)        
        updatedUser.wallets = userWallet
        updatedUser.AccountBalance +=Amount        
        alluser[indexs]=updatedUser
        localStorage.AllUser=JSON.stringify(alluser)
        updateActiveUser()
        alert("Wallet Deleted")
        navigate("/home/wallet")

        

        
        

    }
    const debitAccount=(Amount)=>{        
        let alluser=JSON.parse(localStorage.AllUser)
        let userAccountnum = JSON.parse(localStorage.currentUser).Accountnum;
        let index = alluser.findIndex(user=>user.Accountnum===userAccountnum)        
        let updatedUser={...alluser[index]}        
        updatedUser.AccountBalance=updatedUser.AccountBalance-Amount       
        alluser[index]=updatedUser        
        localStorage.AllUser=JSON.stringify(alluser)
    }
    const getCurrentUser=()=>{
        let currentUser =JSON.parse(localStorage.currentUser)
        setActiveUser(currentUser)
        setLoading(true)
        
        
    }
    useEffect(() => {
        getCurrentUser()
        
        
    }, [modal])
    const closeModal = (walletName,Amount) => {
        let alluser=JSON.parse(localStorage.AllUser)
        let userAccountnum = JSON.parse(localStorage.currentUser).Accountnum;
        let index = alluser.findIndex(user=>user.Accountnum===userAccountnum)
        let userWallet = JSON.parse(localStorage.currentUser).wallets; 
        let amount = Number(Amount)
        let newWallet = {walletName, amount};
        userWallet.push(newWallet);
        alluser[index].wallets = userWallet;
        localStorage.AllUser=JSON.stringify(alluser)
        debitAccount(amount)
        updateActiveUser()
        setModal(false);
        
    }
    const updateActiveUser=()=>{
        let alluser=JSON.parse(localStorage.AllUser)
        let userAccountnum = JSON.parse(localStorage.currentUser).Accountnum;
        let index = alluser.findIndex(user=>user.Accountnum===userAccountnum)
        localStorage.currentUser=JSON.stringify(alluser[index])        
        
    }
    

    const formik=useFormik(
        {
            initialValues:{
                walletName:"",   
                Amount:""                         
                
            },
            onSubmit:(values)=>{               
                closeModal(values.walletName,values.Amount)
                
                
                
            },            

            validate:(values)=>{
                let errors={}
                if(values.walletName===""){
                    errors.walletName="Wallet Name is required!"
                }
                if(values.Amount===""){
                    errors.walletName="Amount is required!"
                }
                
                return errors


                
                
            }
            
        }
        
       
    )
     
    
    return <div className="mainwalletcontainer">
        {modal && <form onSubmit={formik.handleSubmit} className="popup form2">
            <h2>Create Wallet</h2> 
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="walletName" placeholder="Wallet Name" /><br/>
            {formik.touched.walletName && <div className="error">{formik.errors.walletName}</div>} 
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="Amount" placeholder="Amount" /><br/>
            {formik.touched.Amount && <div className="error">{formik.errors.Amount}</div>}           
            <button onClick={(walletName,Amount)=>closeModal}>Create</button>
        </form>}
        <div className="walletcontainer">
            {loading && activeUser.wallets.map((wallet,index)=>{
                const {walletName,amount}=wallet
                return <div key={index} className="wallet">
                    <h3>{walletName}</h3>
                    <p>$ {amount}</p>
                    <div className="wallet-buttons"><button>Fund</button><button onClick={()=>deleteWallet(index,amount)} >Delete</button><button>Withdraw</button></div>
                    <div className="fundwallet"></div>
                </div>
            })}
               
    </div>
    <button className="createwallet" onClick={createWallet}>Create Wallet</button>
    </div>;
}


export default Wallet;