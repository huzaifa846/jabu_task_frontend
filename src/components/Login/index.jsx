import {useState} from "react"
import axios from "axios"
import { reactLocalStorage } from "reactjs-localstorage";
import { useNavigate } from "react-router-dom";
import "./login.css"


function Login(props) {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
      e.preventDefault();
      const response = await axios.post("http://localhost:8000/api/login", {
          email: email,
          password: password,
      });
      if(response.status === 200){
        reactLocalStorage.set("api_token", response.data.user.api_token)
        navigate('/')
      }
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" action="#">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Log In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={handleLogin}>
              Log In
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login