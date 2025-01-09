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
          <img src="./medicine.png" width={100} style={{ padding: 10 }} />

          <Typography gutterBottom variant="h5">
            Use pill identifier
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
            Easily identify any pill by its color, shape, and imprint. Find out
            what medicine you're taking in just a few simple steps!
          </Typography>
        </Card>
      </div>
    </div>
  );
};

export default CardFlipComponent;
