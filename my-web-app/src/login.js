import React from 'react'
import './login.css'
import { FaGoogle, FaFacebook } from "react-icons/fa";

const Login = () => {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form">
        <div className="login-input-fields">
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Email" 
            required 
          />
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Password" 
            required 
          />
        </div>

        <div className="login-buttons">
          <button type="submit">Login</button>
          <button type="button">Cancel</button>
        </div>

        <div className="login-links">
          <a href="#forgot-password">Forgot Password?</a>
          <a href="#register">Register</a>
        </div>

        <hr />

        <div className="login-social-login">
          <p>Or sign in with</p>
          <div className="login-social-icons">
            <FaGoogle className="login-google" />
            <FaFacebook className="login-facebook" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login