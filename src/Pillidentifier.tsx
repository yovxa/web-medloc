import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
  Box,
} from "@mui/material";
import React from "react";

export default function PillIdentifier() {
  const [color, setColor] = React.useState("");
  const [shape, setShape] = React.useState("");
  const [pillImprint, setPillImprint] = React.useState("");
  const [mockData, setMockData] = React.useState<{
    name: string;
    strength: string;
    imprint: string;
    color: string;
    shape: string;
  } | null>(null);

  // Mock database of pill data
  const pills = [
    {
      name: "Tramadol Hydrochloride",
      imprint: "AN 627",
      strength: "50 mg",
      color: "White",
      shape: "Round",
    },
    {
      name: "Ibuprofen",
      imprint: "123",
      strength: "10 mg",
      color: "Blue",
      shape: "Oval",
    },
    {
      name: "Aspirin",
      imprint: "X123",
      strength: "20 mg",
      color: "Beige",
      shape: "Capsule",
    },
  ];

  const handleChangeColor = (event: SelectChangeEvent) => {
    setColor(event.target.value);
  };

  const handleChangeShape = (event: SelectChangeEvent) => {
    setShape(event.target.value);
  };

  const handleSearch = () => {
    const foundPill = pills.find(
      (pill) =>
        (pillImprint ? pill.imprint === pillImprint : true) &&
        (color ? pill.color === color : true) &&
        (shape ? pill.shape === shape : true)
    );

    setMockData(foundPill || null);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          padding: 3,
          backgroundColor: "#F3FAF7",
          borderRadius: 2,
          boxShadow: 3,
          marginTop: 10,
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Pill Identifier
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Pill Imprint"
              variant="outlined"
              value={pillImprint}
              onChange={(e) => setPillImprint(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Color</InputLabel>
              <Select
                value={color}
                onChange={handleChangeColor}
                label="Color"
                displayEmpty
              >
                <MenuItem value="White">White</MenuItem>
                <MenuItem value="Beige">Beige</MenuItem>
                <MenuItem value="Blue">Blue</MenuItem>
                <MenuItem value="Black">Black</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Shape</InputLabel>
              <Select
                value={shape}
                onChange={handleChangeShape}
                label="Shape"
                displayEmpty
              >
                <MenuItem value="Round">Round</MenuItem>
                <MenuItem value="Oval">Oval</MenuItem>
                <MenuItem value="Capsule">Capsule</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSearch}
            >
              Search
            </Button>
          </Grid>
        </Grid>
        {mockData ? (
          <Paper sx={{ padding: 2, marginTop: 3 }}>
            <Typography variant="h6">Pill Details:</Typography>
            <Typography variant="body1">
              <strong>Name:</strong> {mockData.name}
            </Typography>
            <Typography variant="body1">
              <strong>Strength:</strong> {mockData.strength}
            </Typography>
            <Typography variant="body1">
              <strong>Imprint:</strong> {mockData.imprint}
            </Typography>
            <Typography variant="body1">
              <strong>Color:</strong> {mockData.color}
            </Typography>
            <Typography variant="body1">
              <strong>Shape:</strong> {mockData.shape}
            </Typography>
          </Paper>
        ) : (
          <Typography
            variant="body1"
            sx={{ marginTop: 3, textAlign: "center", color: "red" }}
          >
            No matching pill found.
          </Typography>
        )}
      </Box>
    </Container>
  );
}
