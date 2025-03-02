import { Box, Typography } from "@mui/material";
import "./App.css";
import CardFlipComponent1 from "./cardflip1";
import CardFlipComponent2 from "./cardflip2";
import CardFlipComponent3 from "./cardflip3";

export default function HomePage() {
  const mapping = [
    ["search pharmacy", "/searchpharmacy"],
    ["products", "/products"],
    ["pill identifier", "/pillidentifier"],
    ["symptom checker", "/symptomchecker"],
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          marginTop: 8,
          height: "100vh",
          flexDirection: "column",
          position:'static',
        }}
      >
        <Box
          sx={{
            height: "300px",
            width: "100%",
            background: "linear-gradient(to bottom, #023E8A 0%, #CAF0F8 100%)",
            position: "absolute",
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "70%", padding: 10 }}>
            <Typography
              color="white"
              align="right"
              variant="h2"
              style={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
              }}
            >
              Find your nearest
            </Typography>
            <Typography
              color="white"
              variant="h3"
              align="right"
              style={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
              }}
            >
              pharmacy easier!
            </Typography>
          </div>

          <div style={{ width: "40%", padding: 10 }}>
            <img src="./map.png" style={{ width: 200 }} />
          </div>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 500,
            position: "static",
            marginTop: 45,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box>
              <CardFlipComponent1 />
            </Box>
            <Box>
              <CardFlipComponent2 />
            </Box>
            <Box>
              <CardFlipComponent3 />
            </Box>
          </Box>
        </Box>
      </Box>

      <div
        style={{
          background: "#023E8A",
          left: 0,
          height: "13vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          position: "absolute",
          marginTop: 170,
        }}
      >
        {mapping.map(([page, link]) => (
          <Typography
            key={link}
            component="a"
            href={link}
            variant="subtitle2"
            sx={{
              paddingLeft: 3,
              color: "white",
              textDecoration: "none",
              textTransform: "uppercase",
              fontSize: 12,
            }}
          >
            {page}
          </Typography>
        ))}

        <Typography
          variant="subtitle1"
          align="center"
          sx={{
            paddingLeft: 20,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "white",
            textDecoration: "none",
          }}
        >
          MedLoc
        </Typography>
        <Typography
          variant="caption"
          color="lightgray"
          alignSelf={"center"}
          sx={{ display: "flex", justifyContent: "right", width: "80vh" }}
        >
          @final project
        </Typography>
      </div>
    </>
  );
}
