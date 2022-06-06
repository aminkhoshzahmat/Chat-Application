import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, ["navigate"]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      if (data.status === false) {
        alert(`${data.message}`);
      }

      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      alert("Password is required");
      return false;
    } else if (username === "") {
      alert("Username is required");
      return false;
    }

    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src="" alt="" />
            <h1>WebPendar</h1>
            <input
              type="text"
              placeholder="type your username"
              name="username"
              onChange={(e) => handleChange(e)}
              min="3"
            />
            <input
              type="password"
              placeholder="type your password"
              name="password"
              onChange={(e) => handleChange(e)}
              min="5"
            />

            <button type="submit">Login In</button>
            <span>
              Don't have an account? <Link to="/register">Register</Link>
            </span>
          </div>
        </form>
      </FormContainer>
    </>
  );
}

const FormContainer = styled.div``;
export default Login;
