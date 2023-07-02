import "./ImageLoader.css";
import React, { FormEventHandler, useEffect, useState } from "react";
import axios from "axios";

function ImageLoader() {
  const [image, setImage] = useState<File | undefined>();
  const [img, setImg] = useState<string>("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <button type="submit" id="submit">
          check for math token
        </button>
      </form>
      <img src={img && img} alt="preview image" />
    </div>
  );
}

export default ImageLoader;
