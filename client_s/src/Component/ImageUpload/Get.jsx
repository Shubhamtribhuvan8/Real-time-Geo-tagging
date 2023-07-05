import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const GetComponent = () => {
  const [Details, setAllDetails] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/geotag/image");
      setAllDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
  );
};

export default GetComponent;
