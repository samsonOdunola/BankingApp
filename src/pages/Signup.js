import { Link,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { Formik, useFormik } from "formik";
const Signup = () => {
    const navigate=useNavigate();
    const [alluser, setAlluser] = useState([]);
    
    function generateRandomnumber(Accounttype) {
        if (Accounttype === "Savings") {
            return Number(""+101+(Math.floor(Math.random() * 10000000 + 1)));
        }else if(Accounttype === "Current"){
            return Number(""+202+(Math.floor(Math.random() * 10000000 + 1)));
        }
        
    }
    const saveUsertoDB = (values,generateRandomnumber) => {
        let Accountnum =generateRandomnumber
        let AccountBalance = 2000
        let recentTransaction = []
        let user = {...values,Accountnum,AccountBalance,recentTransaction};
        if(!localStorage.AllUser){
            let finalAllUser=[] 
            finalAllUser.push(user)
            localStorage.AllUser=JSON.stringify(finalAllUser)
        }else{
            let finalAllUser=JSON.parse(localStorage.AllUser)            
            finalAllUser.push(user)
            localStorage.AllUser=JSON.stringify(finalAllUser)
        }
        
        // console.log(alluser)
        // console.log(finalAllUser)      
               
        // setAlluser(finalAllUser)
        
        
         
        // console.log(user)
        
    }


    const formik=useFormik(
        {
            initialValues:{
                FirstName:"",
                LastName:"",
                Gender:"",
                Accounttype:"",
                email:'',
                password:'',
                
            },
            onSubmit:(values)=>{
                console.log("working")
                console.log(values)                
                saveUsertoDB(values,generateRandomnumber(values.Accounttype));
                navigate("/")
                
                
            },            

            validate:(values)=>{
                let errors={}
                if(values.FirstName===""){
                    errors.FirstName="FirstName is required!"
                }
                if(values.LastName==""){
                    errors.LastName="last Name is required!"
                }
                return errors


                
                
            }
            
        }
        
    )
    console.log(formik.errors.FirstName)
    
    

    // create function that create account number based on type of account selected
    // create function that create account number based on type of account selected
    return <form className="form signup-form" onSubmit={formik.handleSubmit}>
        <h1>Sign Up</h1>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange}type="text" name="FirstName" placeholder="First Name" /><br/>
        {formik.touched.FirstName && <div className="error">{formik.errors.FirstName}</div>}
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="LastName"placeholder="Last Name" /><br/>
        {formik.touched.LastName && <div className="error">{formik.errors.FirstName}</div>}
        <select onBlur={formik.handleBlur} name="Gender" onChange={formik.handleChange} > 
            <option selected disabled>Gender</option>           
            <option value="Male" >Male</option>
            <option value="Female">Female</option>
        </select><br/>
        <div className="error">{formik.errors.Gender}</div>
        <select onBlur={formik.handleBlur} name="Accounttype" onChange={formik.handleChange} > 
            <option selected disabled>Account type</option>           
            <option value="Savings" >Savings</option>
            <option value="Current">Current</option>
        </select><br/>
        <div className="error">{formik.errors.Accounttype}</div>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name="email"type="email" placeholder="Email"/><br/>
        <div className="error">{formik.errors.email}</div>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name="password" type="password" placeholder="password" /><br/>
        <div className="error">{formik.errors.password}</div>
        <input type="checkbox" />I agree to the terms and conditions<br/>
        <button  type="submit">Create Account</button>
        <p>Have an account? <Link className="link" to="/">Login</Link></p>
    </form>;
}


export default Signup;