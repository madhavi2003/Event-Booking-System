
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import "./event.css"
const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ username });
    const eventId = 1;
    navigate(`/event/${eventId}`);
  };

  return (
    <div>
    <div className="Page3">
    <h1 className="item4">Login Form</h1>
    <form onSubmit={handleSubmit}>
        
        <div className="item3">
        <div>
        
        <label>UserName:</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        </div>
      <button type="submit" style={{marginTop:"30px",paddingRight:"15px",borderRadius:"5px",paddingLeft:"15px"}}>Login</button>
      </div>
      
    </form>
    </div>
    </div>
  );
};

export default Login;
