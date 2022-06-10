import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function Contacts({ contacts, currentUser, changedChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  console.log(contacts, "here");
  useEffect(() => {
    console.log(contacts);
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentUser = (index, contact) => {
    setCurrentSelected(index);
    changedChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src="logo" alt="log" />
            <h3>WebPendar</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contanct ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => changeCurrentUser(index, contact)}
                >
                  <div className="avatar">
                    {/* <img src={contact.avatarImage} alt="avatar" /> */}
                    <span title={contact._id}>{contact.avatarImage}</span>
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="current-user">
            <div className="avatar">
              {/* <img src={contact.avatarImage} alt="avatar" /> */}
              {/* <span>{currentUser.avatarImage}</span> */}
            </div>
            <div className="username">
              <h2>{currentUser.username}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  h3 {
    color: #fff;
    text-transform: uppercase;
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    cursor: pointer;
    border-radius: 0.2rem;
    padding: 0.4rem;
    gap: 1rem;
    align-items: center;
    display: flex;
    transition: all 0.5s ease-in-out;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
  }
  .selected {
    background-color: #9186f3;
    color: #000;
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
  .username {
    h2 {
      color: white;
    }
  }
`;
