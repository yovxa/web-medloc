import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Card,
  CardContent,
  Divider,
  CardMedia,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

export default function SearchPharmacy() {
  const [search, setSearch] = useState("");
  const [place, setPlace] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePlaceChange = (e: SelectChangeEvent<string>) => {
    setPlace(e.target.value);
  };

  const fetchResults = () => {
    if (!search.trim() || !place.trim()) {
      setResults([]);
      return;
    }

    fetch(
      `http://localhost:8081/search/medicine?name=${encodeURIComponent(
        search
      )}&place=${encodeURIComponent(place)}`
    )
      .then((response) => response.json())
      .then((data) => setResults(data))
      .catch((error) => console.error("Error fetching search results:", error));
  };

  return (
    <>
      <div style={{ marginTop: 100 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            alignItems: "center",
          }}
        >
          <TextField
            label="Search by Medicine name"
            variant="outlined"
            sx={{ width: 400 }}
            value={search}
            onChange={handleSearch}
            disabled={!place}
          />

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="place-select-label">Select Place</InputLabel>
            <Select
              labelId="place-select-label"
              id="place-select"
              value={place}
              label="Select Place"
              onChange={handlePlaceChange}
            >
              <MenuItem value="abu nusair">abu nusair</MenuItem>
              <MenuItem value="shafa badran">shafa badran</MenuItem>
              <MenuItem value="khalda">khalda</MenuItem>
              <MenuItem value="7th circle">7th circle</MenuItem>
            </Select>
          </FormControl>

          <button
            onClick={fetchResults}
            style={{
              padding: "10px 20px",
              backgroundColor: "#023E8A",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              height: 40,
            }}
          >
            Search
          </button>
        </Box>
        <Typography
          variant="caption"
          align="center"
          color="darkred"
          sx={{ visibility: place ? "hidden" : "visible", marginLeft: 92 }}
        >
          Choose place first
        </Typography>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {results.map((result) => (
            <Card
              key={result.StoreID}
              sx={{
                width: 600,
                margin: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                height: 350,
                backgroundColor: "#F3FAF7",
              }}
            >
              <CardMedia
                component="img"
                alt={result.Name}
                height={190}
                src={"http://localhost:8081/" + result.Image}
                sx={{
                  width: "auto",
                  padding: 2,
                }}
              />
              <CardContent>
                <Typography variant="h5" fontWeight={"bold"}>
                  {result.MedicineName}
                </Typography>
                <Typography variant="body2" lineHeight={3}>
                  Branch: {result.BranchName}
                </Typography>
                <Divider sx={{ width: 350 }} />
                <Typography variant="body2" lineHeight={3}>
                  Location:
                  <Typography
                    variant="body2"
                    component={"a"}
                    href={result.Location_Link}
                    sx={{ textDecoration: "none", color: "#5465FF" }}
                  >
                    {" " + result.BranchName}
                  </Typography>
                </Typography>
                <Divider />

                <Typography variant="body2" lineHeight={3}>
                  Stock: {result.Stock}
                </Typography>
                <Divider />

                <Typography variant="body2" lineHeight={3}>
                  Price: {result.Price} JD
                </Typography>
                <Divider />

                <Typography variant="body2" lineHeight={3}>
                  Expiry: {new Date(result.Expiry_date).toLocaleDateString()}
                </Typography>
                <Divider />

                <Typography variant="body2" lineHeight={3}>
                  Manufacturer: {result.Manufactorer}
                </Typography>
                <Divider />
              </CardContent>
            </Card>
          ))}
        </Box>
      </div>
    </>
  );
}
