import "./ImageLoader.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function ImageLoader() {
  const [image, setImage] = useState<File>(); //This state hool handles the file which will be send to the backend
  const [img, setImg] = useState<string>(""); // This state hook handles the name of the image. it will be used to display the target image

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image as File);

    const result = await axios.post("http://localhost:3000/OCR", formData, {
      headers: { "content-Type": "mutlipart/formData" },
    });
    // console.log(result.data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //this function will be executed when a image is selected
    if (e?.target?.files != null) {
      console.log(e.target.files[0]);
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImg(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    } else {
      console.error("insert a file");
    }
  };

  useEffect(() => {
    if (image) {
      console.log(image);
    }
  }, [image]);

  return (
    <div className="ImageLoader">
      <form onSubmit={submit}>
        Upload Image:
        <input
          type="file"
          name="image"
          id="imageInput"
          onChange={handleChange}
        ></input>
        <button type="submit" id="submit" disabled={!image}>
          check for math token
        </button>
      </form>
      <img src={img && img} alt="preview image" />
    </div>
  );
}

export default ImageLoader;
