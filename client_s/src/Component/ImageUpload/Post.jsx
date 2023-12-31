import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
function PostComponent() {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [dataImage, setDataImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [locationame, setLocationName] = useState("");
  const [locationName2, setLocationName2] = useState("");
  const [name, setname] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUsername("");
    setDescription("");
    setDataImage(null);
    setPreviewImage(null);
  };
  const navigate = useNavigate();

  const handleImage = (e) => {
    const selectedImage = e.target.files[0];
    const data = new FormData();
    data.append("file", selectedImage);
    data.append("upload_preset", "Tumblr");
    data.append("cloud_name", "dgqt5ockx");
    setDataImage(data);
    setPreviewImage(URL.createObjectURL(selectedImage));
  };

  const cloudinaryUpload = async (data) => {
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
      const imageUrl = await cloudinaryUpload(dataImage);
      console.log(locationName2);
      const data = {
        title: username,
        description: description,
        images: imageUrl,
        latitude: latitude,
        longitude: longitude,
        locationame: locationame,
        name: name,
      };

      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(
        "https://fair-ruby-kingfisher-tux.cyclic.app/geotag/image",
        data
      );

      toast.success("Post added!");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Post failed to add or something went wrong!");
    }
  };
  useEffect(() => {
    const names = localStorage.getItem("name");
    setname(names);
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLatitude(latitude);
            setLongitude(longitude);
            fetchLocationName(latitude, longitude);
          },
          (error) => {
            console.error(error);
            toast.error("Failed to retrieve your location");
          }
        );
      }
    };

    const fetchLocationName = (latitude, longitude) => {
      axios
        .get("https://fair-ruby-kingfisher-tux.cyclic.app/geotag/ipinfo")
        .then((response) => {
          setLocationName2(response.data.city);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to retrieve location information");
        });
      axios
        .get(
          `https://api.opencagedata.com/geocode/v1/json?key=995bfff87a984344b1fec4b56817cc54&q=${latitude}+${longitude}`
        )
        .then((response) => {
          const locationName =
            response.data.results[0]?.components.city || "Unknown Location";
          setLocationName(locationName);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to retrieve location information");
        });
    };

    getLocation();
  }, [latitude, longitude]);

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
              required="true"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <TextField
              margin="dense"
              required="true"
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
              <Input
                type="file"
                accept="image/*"
                required="true"
                onChange={handleImage}
              />
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
