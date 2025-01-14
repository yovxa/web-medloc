import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

const steps = ["Personal details", "Payment Method", "Confirm"];

interface Orders {
  UserID: number;
  CartID: number;
  Name: string;
  PhoneNumber: string;
  Address: string;
  Street: string;
  BuildingNumber: string;
  Payment: string;
}

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = useState<Orders>({
    UserID: 0,
    CartID: 0,
    Name: "",
    PhoneNumber: "",
    Address: "",
    Street: "",
    BuildingNumber: "",
    Payment: "",
  });
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userID = currentUser?.UserID;
  const Navigate = useNavigate();

  useEffect(() => {
    if (userID) {
      fetch(`http://localhost:8081/orders?UserID=${userID}`)
        .then((response) => response.json())
        .then((data) => {
          setFormData(data);
        })
        .catch((error) => console.error("Error fetching order:", error));
    }
  }, [userID]);

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      await handleSubmit();
      setActiveStep((prevStep) => prevStep + 1);

    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const orderData = {
      ...formData,
      UserID: currentUser.UserID,
      CartID: 1,
    };

    try {
      const response = await fetch("http://localhost:8081/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const text = await response.text();
        console.log(text);
      } else {
        console.error("There was an error inserting the data!");
      }
    } catch (error) {
      console.error("There was an error inserting the data!", error);
    }
  };

  const stepContent = [
    <Box key="personal-details">
      <Typography variant="h6">Personal Details</Typography>
      <TextField
        label="Name"
        name="Name"
        id="Name"
        value={formData.Name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone number"
        name="PhoneNumber"
        id="PhoneNumber"
        value={formData.PhoneNumber}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        type="number"
      />
      <TextField
        label="Address"
        name="Address"
        id="Address"
        value={formData.Address}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Street"
        name="Street"
        id="Street"
        value={formData.Street}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Building Number"
        name="BuildingNumber"
        id="BuildingNumber"
        value={formData.BuildingNumber}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
    </Box>,
    <Box key="payment-method">
      <Typography variant="h6">Payment Method</Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend">Select Payment Method</FormLabel>
        <RadioGroup
          name="Payment"
          id="Payment"
          value={formData.Payment || ""}
          onChange={handleInputChange}
        >
          <FormControlLabel
            value="credit Card"
            control={<Radio />}
            label="Credit Card"
          />
          <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
          <FormControlLabel
            value="cash On Delivery"
            control={<Radio />}
            label="Cash on Delivery"
          />
        </RadioGroup>
      </FormControl>
    </Box>,
    <Box key="confirm">
      <Typography variant="h6">Confirm</Typography>
      <Typography variant="body1">Name: {formData.Name}</Typography>
      <Typography variant="body1">
        Phone number: {formData.PhoneNumber}
      </Typography>
      <Typography variant="body1">Address: {formData.Address}</Typography>
      <Typography variant="body1">Street: {formData.Street}</Typography>
      <Typography variant="body1">
        Building Number: {formData.BuildingNumber}
      </Typography>
      <Typography variant="body1">
        Payment Method: {formData.Payment}
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
            <Button onClick={() => Navigate("/")}>Back to home</Button>
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
                  (!formData.Name ||
                    !formData.PhoneNumber ||
                    !formData.Address)) ||
                (activeStep === 1 && !formData.Payment)
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
