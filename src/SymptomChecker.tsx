import { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
  Typography,
  Container,
  Box,
  Grid,
  Paper,
} from "@mui/material";

export default function SymptomChecker() {
  const [Age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [gender, setGender] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const mockData = [
    {
      age: "17-29 years (Young adult)",
      gender: "Male",
      symptom: "headache",
      result: "Migraine. Suggested treatment: Pain relievers and rest.",
    },
    {
      age: "40-65 years (Adult)",
      gender: "Female",
      symptom: "lower back pain",
      result:
        "Muscle Strain. Suggested treatment: Physical therapy and hot compress.",
    },
    {
      age: "65+ over (Senior)",
      gender: "Male",
      symptom: "joint pain",
      result: "Osteoarthritis. Suggested treatment: Painkillers and exercise.",
    },
    {
      age: "30-39 years (Adult)",
      gender: "Female",
      symptom: "stomach pain",
      result:
        "Indigestion. Suggested treatment: Antacids and dietary adjustments.",
    },
    {
      age: "6-16 years (Older child)",
      gender: "Male",
      symptom: "neck pain",
      result: "Poor posture. Suggested treatment: Ergonomic changes.",
    },
  ];

  const handleChangeAge = (event: SelectChangeEvent) => {
    setAge(event.target.value);
    setResult(null);
  };

  const handleChangeGender = (event: SelectChangeEvent) => {
    setGender(event.target.value);
    setResult(null);
  };

  const handleChangeSymptoms = (event: SelectChangeEvent) => {
    setSymptoms(event.target.value);
    setResult(null);
  };

  const handleCheck = () => {
    const match = mockData.find(
      (item) =>
        item.age === Age && item.gender === gender && item.symptom === symptoms
    );
    setResult(match ? match.result : "No matching diagnosis found.");
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
          Symptom Checker
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="Age">Age</InputLabel>
              <Select
                labelId="Age"
                id="Age"
                value={Age}
                label="Age"
                onChange={handleChangeAge}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"1-5 years (Younger child)"}>
                  1-5 years (Younger child)
                </MenuItem>
                <MenuItem value={"6-16 years (Older child)"}>
                  6-16 years (Older child)
                </MenuItem>
                <MenuItem value={"17-29 years (Young adult)"}>
                  17-29 years (Young adult)
                </MenuItem>
                <MenuItem value={"30-39 years (Adult)"}>
                  30-39 years (Adult)
                </MenuItem>
                <MenuItem value={"40-65 years (Adult)"}>
                  40-65 years (Adult)
                </MenuItem>
                <MenuItem value={"65+ over (Senior)"}>
                  65+ over (Senior)
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="Gender">Gender</InputLabel>
              <Select
                labelId="Gender"
                id="Gender"
                value={gender}
                label="Gender"
                onChange={handleChangeGender}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Male"}>Male</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="Symptoms">Symptoms</InputLabel>
              <Select
                labelId="Symptoms"
                id="Symptoms"
                value={symptoms}
                label="Symptoms"
                onChange={handleChangeSymptoms}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"headache"}>headache</MenuItem>
                <MenuItem value={"lower back pain"}>lower back pain</MenuItem>
                <MenuItem value={"joint pain"}>joint pain</MenuItem>
                <MenuItem value={"neck pain"}>neck pain</MenuItem>
                <MenuItem value={"stomach pain"}>stomach pain</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCheck}
            >
              Check Symptoms
            </Button>
          </Grid>
        </Grid>

        {result && (
          <Paper sx={{ padding: 2, marginTop: 3 }}>
            <Typography variant="h6" gutterBottom>
              Diagnosis Result:
            </Typography>
            <Typography variant="body1" sx={{ color: "blue" }}>
              {result}
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
}
