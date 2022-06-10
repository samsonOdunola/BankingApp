import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    
    
    const formik= useFormik({
        initialValues:{
            email:"",
            password:"",
        },
        onSubmit:(values)=>{
            console.log(values)
            if(localStorage.AllUser){
                let alluser = JSON.parse(localStorage.AllUser);
            for (let i = 0; i < alluser.length; i++) {                
                if (alluser[i].email === values.email && alluser[i].password === values.password) {
                    localStorage.currentUser=JSON.stringify(alluser[i]);                   
                    
                }
            }

            }
            navigate("/home/dashboard")
            
        }
            
            

    })
    return <form className="form login-form" onSubmit={formik.handleSubmit}>
        <h1>Login</h1>
        <input onChange={formik.handleChange}type="email" name="email" placeholder="Email" /><br/>
        <input onChange={formik.handleChange}type="password" name="password"placeholder="Password" /><br/>
        <button type="submit">Login</button>
        <p>Dont have an account?<Link className="link" to="/signup"> Create account</Link></p>
    </form>;
}


export default Login;