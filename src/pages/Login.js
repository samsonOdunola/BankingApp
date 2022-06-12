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
            
        },
        validate:(values)=>{
                let errors={}
                if(values.email===""){
                    errors.email="email is required!"
                }
                if(values.password===""){
                    errors.password="password is required!"
                }
                
                return errors


                
                
        }
        
            
            
     
    })
    
    return <form className="form login-form" onSubmit={formik.handleSubmit}>
        <h1>Login</h1>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange}type="email" name="email" placeholder="Email" /><br/>
        {formik.touched.email && <div className="error">{formik.errors.email}</div>}
        <input onBlur={formik.handleBlur} onChange={formik.handleChange}type="password" name="password"placeholder="Password" /><br/>
        {formik.touched.password && <div className="error">{formik.errors.password}</div>}
        <button type="submit">Login</button>
        <p>Dont have an account?<Link className="link" to="/signup"> Create account</Link></p>
    </form>;
}


export default Login;