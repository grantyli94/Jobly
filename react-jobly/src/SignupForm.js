import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Error from "./Error";
import UserContext from "./UserContext";

/**
 * Renders a form for users to sign up
 * 
 * Props:
 *  - handleSIgnUp: function rec'd from parent that updates states when the form is submited
 */
function SignupForm({ handleSignUp }) {
  console.log("SignupForm Renders");

  const initialData = {username: "", password: "", firstName: "", lastName: "", email: ""}
  const [formData, setFormData] = useState(initialData);
  const [err, setErr] = useState([]);
  const history = useHistory();
  const currUser = useContext(UserContext);

  function handleChange(evt) {
    const input = evt.target;
    setFormData(formData => ({
      ...formData,
      [input.name]: input.value,
    }));
  }

  async function handleSubmit(evt) { 
    evt.preventDefault(); 
    try {
      await handleSignUp(formData);
    } catch(e) {
      setErr(e);
    }
  }

  if(currUser){
    history.push("/companies");
  }

  return (
    <div className="SignupForm">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            id="username"
            onChange={handleChange}
            value={formData.username}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={formData.password}
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            name="firstName"
            id="firstName"
            onChange={handleChange}
            value={formData.firstName}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            name="lastName"
            id="lastName"
            onChange={handleChange}
            value={formData.lastName}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <input type="Submit" value="Submit" />
      </form>
      <Error errors={err}/>
    </div>
  )
}

export default SignupForm