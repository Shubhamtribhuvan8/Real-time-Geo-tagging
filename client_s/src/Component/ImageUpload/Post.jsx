/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input, InputLabel } from "@mui/material";
import { toast } from "react-toastify";
function PostComponent() {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [dataImage, setDataImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImage = (e) => {
    const data = new FormData();
    const selectedImage = e.target.files[0];
    data.append("file", selectedImage);
    data.append("upload_preset", "Tumblr");
    data.append("cloud_name", "dgqt5ockx");
    setDataImage(data);
    setPreviewImage(URL.createObjectURL(selectedImage));
  };

  const CloudinaryUpload = async (data) => {
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgqt5ockx/image/upload",
        data
      );
      return response.data.url;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dataImage) {
      toast.error("Please upload an image!");
      return;
    }

    try {
      const imageUrl = await CloudinaryUpload(dataImage);
      const data = {
        title: username,
        description: description,
        images: imageUrl,
      };

      const response1 = await axios.post(
        "http://localhost:8080/geotag/image",
        data
      );

      toast.success("Post added and done!");
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Post failed to add or something went wrong!");
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Post Something!
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Do Post Something...!</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <InputLabel>
              Select an image to upload:
              <Input type="file" accept="image/*" onChange={handleImage} />
            </InputLabel>
            {previewImage && (
              <div>
                <img
                  src={previewImage}
                  alt="Preview"
                  width={300}
                  height={300}
                />
              </div>
            )}
            <Button id="login" type="submit" size="large" variant="contained">
              Submit
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default PostComponent;
