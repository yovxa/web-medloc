import React from "react";
import { Card, Typography } from "@mui/material";
import "./CardFlip.css";

const CardFlipComponent: React.FC = () => {
  return (
    <div className="card-flip-container">
      <div className="card-flip">
        <Card
          className="card-front"
          sx={{
            width: 300,
            height: 300,
            margin: 1,
            padding: 1,
            backgroundColor: "#F3FAF7",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <img src="./online.png" width={100} style={{ padding: 10 }} />

          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign={"center"}
          >
            Find your medicine and order now!
          </Typography>
        </Card>

        <Card
          className="card-back"
          sx={{
            width: 300,
            height: 300,
            margin: 1,
            padding: 1,
            backgroundColor: "#F3FAF7",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <Typography variant="h6" textAlign={"center"}>
            Browse a wide range of medicines, health supplements, and more. Fast
            delivery straight to your door!
          </Typography>
        </Card>
      </div>
    </div>
  );
};

export default CardFlipComponent;
