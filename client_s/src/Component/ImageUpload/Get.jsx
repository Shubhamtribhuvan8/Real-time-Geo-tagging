import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Logout from "../Login_Signup/Logout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PostComponent from "./Post";
const GetComponent = () => {
  const [Details, setAllDetails] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [token, setToken] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("papa");
    setToken(token);
    if (token) {
      fetchData();
      const interval = setInterval(() => {
        fetchData();
      }, 2000);
      return () => {
        clearInterval(interval);
      };
    } else {
      setTimeout(() => {
        navigate("/");
      }, 100);
      toast.error("Login First!");
    }
  }, [navigate]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/geotag/image");
      setAllDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "3px",
        }}
      >
        {token && <Logout />}
        {token && <PostComponent />}
      </Box>
      <br />
      <br />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {Details &&
          Details.map((record) => (
            <Card key={record._id} sx={{ maxWidth: isMobile ? "100%" : 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={record.images}
                  alt="Record Image"
                />
                <CardContent style={{ width: "100%" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {record.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {record.details}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {record.description}
                  </Typography>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  ></div>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
      </div>
    </Box>
  );
};

export default GetComponent;
