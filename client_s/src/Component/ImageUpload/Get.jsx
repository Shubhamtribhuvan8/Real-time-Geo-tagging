import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea } from "@mui/material";
import Form from "react-bootstrap/Form";
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
  const [selectedFilter, setSelectedFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("papa");
    setToken(token);
    if (token) {
      fetchData("");
    } else {
      setTimeout(() => {
        navigate("/");
      }, 3000);
      toast.error("Login First!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (event) => {
    fetchData(event.target.value);
    setSelectedFilter(event.target.value);
  };
  const fetchData = async (selectedFilter) => {
    console.log(selectedFilter);
    try {
      const response = await axios.get(
        `http://localhost:8080/geotag/image?filter=${selectedFilter}`
      );
      setAllDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:8080/geotag/${_id}`);
      toast.success("Record deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete record");
    }
  };

  return (
    <Box>
      <br />
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
      <Box>
        <Form.Select
          size="lg"
          style={{ width: "10rem", textAlign: "center" }}
          onChange={handleFilterChange}
          value={selectedFilter || ""}
        >
          <option value="">Filter By Category</option>

          <option value="Pune">Pune</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Ahmadabad">Ahmadabad</option>
          <option value="Hydrabad">Hydrabad</option>
        </Form.Select>
      </Box>
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
            <Card
              elevation={3}
              key={record._id}
              sx={{ maxWidth: isMobile ? "100%" : 345 }}
            >
              <CardActionArea>
                <div style={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="200px"
                    image={record.images}
                    alt="Record Image"
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "94px",
                      left: "180px",
                    }}
                  >
                    <Typography variant="caption" color="inherit">
                      Latitude: {record.latitude}
                    </Typography>{" "}
                    <Typography variant="caption" color="inherit">
                      Longitude: {record.longitude}
                    </Typography>{" "}
                    <Typography variant="caption" color="inherit">
                      Location: {record.locationame}
                    </Typography>
                  </div>
                </div>

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
                  <Button
                    variant="outlined"
                    style={{ width: "6rem" }}
                    onClick={() => handleDelete(record._id)}
                  >
                    Delete
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
      </div>
    </Box>
  );
};

export default GetComponent;
