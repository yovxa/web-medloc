import * as React from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const steps = ["Personal details", "Payment Method", "Confirm"];

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = React.useState(0);

  // State to store form data
  const [formData, setFormData] = React.useState({
    name: "",
    Phonenumber: "",
    address: "",
    paymentMethod: "",
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      name: "",
      Phonenumber: "",
      address: "",
      paymentMethod: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Restrict non-numeric input for phone number
    if (name === "Phonenumber") {
      const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
      setFormData((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Define step content
  const stepContent = [
    // Step 1: Personal Details Form
    <Box>
      <Typography variant="h6">Personal Details</Typography>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone number"
        name="Phonenumber"
        value={formData.Phonenumber}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        type="number"
      />
      <TextField
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
    </Box>,
    // Step 2: Payment Method Form
    <Box>
      <Typography variant="h6">Payment Method</Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend">Select Payment Method</FormLabel>
        <RadioGroup
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleInputChange}
        >
          <FormControlLabel
            value="creditCard"
            control={<Radio />}
            label="Credit Card"
          />
          <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
          <FormControlLabel
            value="cashOnDelivery"
            control={<Radio />}
            label="Cash on Delivery"
          />
        </RadioGroup>
      </FormControl>
    </Box>,
    // Step 3: Confirm and Review
    <Box>
      <Typography variant="h6">Confirm</Typography>
      <Typography variant="body1">Name: {formData.name}</Typography>
      <Typography variant="body1">Phone number: {formData.Phonenumber}</Typography>
      <Typography variant="body1">Address: {formData.address}</Typography>
      <Typography variant="body1">
        Payment Method: {formData.paymentMethod}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Please confirm your details before proceeding.
      </Typography>
    </Box>,
  ];

  return (
    <Box sx={{ width: "100%", marginTop: 12 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you're finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ mt: 2, mb: 1 }}>{stepContent[activeStep]}</Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              onClick={handleNext}
              disabled={
                (activeStep === 0 &&
                  (!formData.name || !formData.Phonenumber || !formData.address)) ||
                (activeStep === 1 && !formData.paymentMethod)
              }
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
