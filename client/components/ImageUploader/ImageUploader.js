import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Dropzone from "react-dropzone";

import "./ImageUploader.scss";

const style = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

function StyledDropzone(props) {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </div>
  );
}

<StyledDropzone />;

const ImageUploader = ({ callback }) => {

  const handleUpload = async (files) => {
    try {
      const file = files[0];
      const response = await axios.post("/api/upload", {
        filename: file.name,
        filetype: file.type,
      });

      const signedUrl = response.data;
      const options = {
        headers: {
          "Content-Type": file.type,
        },
      };

      const awsResponse = await axios.put(signedUrl, file, options);
      console.log("awsResponse: ", awsResponse);
      callback("https://capstone-fsa.s3.amazonaws.com/"+file.name);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Dropzone onDrop={handleUpload}>
        {({ getRootProps, getInputProps }) => (
          <section className="image-uploader">
            <div {...getRootProps({ style })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};

export default ImageUploader;
