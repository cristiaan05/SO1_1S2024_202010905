import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [imagen, setImagen] = useState("");

  async function fetchPost(imagen) {
    try {
      const response = await fetch("http://localhost:3000/addImagen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imagen: imagen }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error(error);
    }
  }

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    const formData = new FormData();
    // Handle the captured image, e.g., save it to state or send it to a server
    fetchPost(imageSrc, formData);
  }, [webcamRef]);

  const getImages = async() => {
    try {
      const response = await fetch("http://localhost:3000/getImagenes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await response.json();
      console.log('data', data)
      alert(JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div style={{display:"flex", justifyContent:"end", padding:"60px"}}>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      {/* <button onClick={getImages}>Go to Other Path</button> */}
    </div>
    <div style={{display:"flex", justifyContent:"center", padding:"60px"}}>
      <button onClick={capture}>Capture Photo</button>
     </div> 
    </>
  );
};

export default WebcamCapture;
