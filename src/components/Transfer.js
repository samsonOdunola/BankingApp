import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Transfer = ({activeUser}) => {
    const [ban,setBan]=useState("")
    const [transferAmount, setTransferAmount] = useState()
    const [transferTo, setTransferTo] = useState()
    const navigate = useNavigate();

    const handleSubmit=()=>{     
        creditAccount()
        debitAccount()  
        storeTransaction()
        updateActiveUser()
        alert("Transfer Successful")
        navigate("/home/dashboard")      
        
        
        

    }
    const creditAccount=()=>{
        let alluser=JSON.parse(localStorage.AllUser)
        let receiverActNum=Number(transferTo)
        let index = alluser.findIndex(user=>user.Accountnum===receiverActNum)
        let updatedUser={...alluser[index]}        
        updatedUser.AccountBalance+=Number(transferAmount)
        alluser[index]=updatedUser
        localStorage.AllUser=JSON.stringify(alluser)
    }
    const debitAccount=()=>{
        // store all user info in variable
        let alluser=JSON.parse(localStorage.AllUser)        
        // find the index of the account to be debited using the account number, then store index in variable
        let index = alluser.findIndex(user=>user.Accountnum===activeUser.Accountnum)
        // create updated account object using the index of the account to be debited
        let updatedUser={...alluser[index]}
        // update the balance of the account to be debited
        updatedUser.AccountBalance=updatedUser.AccountBalance-transferAmount
        // update the databbase with the account that was modified
        alluser[index]=updatedUser
        // store the updated account object in the localstorage with the initial key
        localStorage.AllUser=JSON.stringify(alluser)
    }
    const storeTransaction=()=>{
        let debitDetails ={transferAmount,transferTo,ban,type:true}
        let creditDetails ={transferAmount,transferTo:activeUser.Accountnum,ban:activeUser.FirstName+" "+activeUser.LastName,type:false}
        let alluser=JSON.parse(localStorage.AllUser)
        let index = alluser.findIndex(user=>user.Accountnum===activeUser.Accountnum)
        let index2 = alluser.findIndex(user=>user.Accountnum===Number(transferTo))
        let sender={...alluser[index]}
        let receiver={...alluser[index2]}
        sender.recentTransaction.unshift(debitDetails)
        receiver.recentTransaction.unshift(creditDetails)
        alluser[index]=sender
        alluser[index2]=receiver
        localStorage.AllUser=JSON.stringify(alluser)

    }
    const updateActiveUser=()=>{
        let alluser=JSON.parse(localStorage.AllUser)
        let index = alluser.findIndex(user=>user.Accountnum===activeUser.Accountnum)
        localStorage.currentUser=JSON.stringify(alluser[index])        
        
    }

    const getban=(event)=>{     
        
        if(/[\d]{10}/g.test(event.target.value)){
            let alluser =JSON.parse(localStorage.AllUser)
            setTransferTo(event.target.value)
            let user = alluser.find(user=>user.Accountnum===Number(event.target.value))
            if(user !== undefined){
                    setBan(user.FirstName+" "+user.LastName)  
                    
                }else{
                    alert("Account number not found")
                }
            
        }

    }
    
    return <div className="transfer">
        <div className="form2" >
            <h1>TRANSFER</h1>            
            <input value={activeUser.FirstName + " "+activeUser.LastName} readOnly type="text" /><br />
            <input value={activeUser.Accountnum} readOnly type="text" /><br />
            <input onChange={getban}  type="number" placeholder="Beneficiary Account number"/><br />
            <input value={ban} type="text" readOnly placeholder="Beneficiary Name"/><br />
            <input value={transferAmount} onChange={(e)=>setTransferAmount(e.target.value)} type="number" placeholder="Transfer Amount"/><br />
            <button  onClick={handleSubmit}>Transfer</button>

        </div>
        

    </div>;
}


export default Transfer;