import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Buffer } from "buffer";

export default function SetAvatar() {
  const api = "https://api.multiavatar.com";
  //   const navigate = useNavigatee();

  const [avatars, setAvatars] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const setProfilePicture = async () => {};
  useEffect(() => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      //   const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
      async function getImage() {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        return image;
      }
      const image = getImage();
      console.log(image);
      const buffer = new Buffer(image.data, "base64");
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  }, []);

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Pick an avatar as your profile picture</h1>
        </div>
        <div className="avatars">
          {avatars.map((avatar, index) => {
            return (
              <div
                key={index}
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div``;
