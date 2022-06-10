import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
export default function Logout() {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("chat-app-user");
    navigate("/login");
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9186f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.5rem;
    color: #ebe7ff;
  }
`;
