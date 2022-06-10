import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Buffer } from "buffer";
import { SetAvatarRoute } from "../utils/APIRoutes";

export default function SetAvatar() {
  const api = "https://api.multiavatar.com";
  const navigate = useNavigate();

  const [avatars, setAvatars] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      alert("Please select an avatar");
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${SetAvatarRoute}/${user._id}`, {
        image: selectedAvatar,
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        alert("Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
    //   const data = [];
    //   for (let i = 0; i < 4; i++) {
    //     //   const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
    //     // async function getImage() {
    //       const image = await axios.get(
    //         `${api}/${Math.round(Math.random() * 1000)}`
    //       );
    //       // return image;
    //     // }
    //     // const image = getImage();
    //     console.log(image);
    //     const buffer = new Buffer(image.data, "base64");
    //     data.push(buffer.toString("base64"));
    //   }
    //   setAvatars(data);
    // setTimeout(() => {
    setIsLoading(false);
    // }, 500);
  }, []);

  return (
    <>
      {isloading ? (
        <Container>
          <h1>Loading...</h1>
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {[0, 1, 2, 3].map((avatar, index) => {
              return (
                <div key={index} className={`avatar ${index}`}>
                  {/* <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  onClick={() => setSelectedAvatar(index)}
                /> */}
                  <button
                    className={selectedAvatar === index ? "selected" : ""}
                    onClick={() => setSelectedAvatar(index)}
                  >
                    {index}
                  </button>
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture}>Set profile picture</button>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  .selected {
    padding: 10px;
  }
`;
