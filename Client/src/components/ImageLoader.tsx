import "./ImageLoader.css";
import React, { FormEventHandler, useState } from "react";
import axios from "axios";

function ImageLoader() {
  const [image, setImage] = useState<file | null>();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files != null) {
      setImage(e.target.files[0]);
      console.log(image);
    } else {
      console.error("insert a file");
    }
  };

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
      <img src={image && image} alt="preview image" />
    </div>
  );
}

export default ImageLoader;
