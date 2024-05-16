import { Button } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePic } from "../../features/mainSlice";
import { useSnackbar } from "notistack";

const ImageUpload = (props) => {
  const id = props?.id;
  const { users } = useSelector((data) => data.mainSlice);
  const user = users.find((user) => user.id == id);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [selectedFile, setSelectedFile] = useState(user?.pic ?? "");

  const handleFileChange = (event) => {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = (function (theFile) {
      return function (e) {
        var img = document.createElement("img");
        img.src = e.target.result;
        setSelectedFile(e.target.result);
        if (!id && "onFileSelect" in props) {
          props?.onFileSelect(e.target.result);
        } else{
          dispatch(
            updatePic({
              id: id,
              pic: e.target.result,
            })
          );
          enqueueSnackbar("Image Updates Successfully.", {
            variant: "success",
          });
        }
      };
    })(file);

    reader.readAsDataURL(file);
  };

  return (
    <div style={{ marginBottom: "15px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          borderRadius: "50%",
        }}
      >
        {selectedFile ? (
          <img
            id="previewImage"
            src={selectedFile}
            alt="Preview"
            style={{
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              objectFit: "cover",
            }}
          />
        ) : (
          <img
            src="/default_pic.png"
            alt="preview"
            style={{
                borderRadius: "50%",
                width: "100px",
                height: "100px",
                objectFit: "cover",
              }}
          />
        )}
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="contained-button-file"
          type="file"
          onChange={handleFileChange}
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}
      >
        <label htmlFor="contained-button-file">
          <Button variant="outlined" component="span">
            Change Pic
          </Button>
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
