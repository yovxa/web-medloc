import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const Btn = styled(Button)({
  color: "#023E8A",
  borderRadius: 20,
  "&:hover": {
    color: "white",
    backgroundColor: "#023E8A",
    ":active": {
      color: "#023E8A",
      backgroundColor: "transparent",
    },
  },
});

const Btn2 = styled(Button)({
  color: "white",
  backgroundColor: "#023E8A",
  width: 200,
  borderRadius: 20,
  "&:hover": {
    ":active": {
      color: "#023E8A",
      backgroundColor: "transparent",
    },
  },
});

interface CartItem {
  CartID: number;
  ProductID: number;
  Quantity: number;
  Total_price: number;
  Name: string;
  Image: string;
  Price: number;
  UserID: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userID = currentUser?.UserID;

  function handleClick() {
    navigate("/checkout");
  }

  useEffect(() => {
    console.log("Logged in userID:", userID);

    if (!userID) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:8081/cart?UserID=${userID}`)
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data);
        calculateTotal(data);
      })
      .catch((error) => console.error("Error fetching cart:", error));
  }, [userID, navigate]);

  const handleQuantityChange =
    (cartID: number) => (event: SelectChangeEvent<number>) => {
      const newQuantity = Number(event.target.value);
      fetch(`http://localhost:8081/cart`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          CartID: cartID,
          Quantity: newQuantity,
          userID,
        }),
      })
        .then((response) => response.json())
        .then(() => {
          fetch(`http://localhost:8081/cart?UserID=${userID}`)
            .then((response) => response.json())
            .then((data) => {
              setCartItems(data);
              calculateTotal(data);
            });
        })
        .catch((error) => console.error("Error updating quantity:", error));
    };

  const handleDelete = (cartID: number) => {
    fetch(`http://localhost:8081/cart/${cartID}?userID=${userID}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const updatedCart = cartItems.filter((item) => item.CartID !== cartID);
        setCartItems(updatedCart);
        calculateTotal(updatedCart);
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  const calculateTotal = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + item.Total_price, 0);
    setTotalPrice(total);
  };

  return (
    <Box sx={{ padding: 2, marginTop: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 3,
        }}
      ></Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ width: "60%" }}>
          {cartItems.map((item) => (
            <Card
              key={item.CartID}
              sx={{
                marginBottom: 2,
                display: "flex",
                alignItems: "center",
                backgroundColor: "#F3FAF7",
              }}
            >
              <CardMedia
                component="img"
                alt={item.Name}
                height={120}
                image={`http://localhost:8081/${item.Image}`}
                sx={{ width: 120 }}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{item.Name}</Typography>
                <Typography>Price: {item.Price} JD</Typography>
              </CardContent>
              <CardActions>
                <FormControl size="small" sx={{ minWidth: 80 }}>
                  <InputLabel>Qty</InputLabel>
                  <Select
                    value={item.Quantity}
                    onChange={handleQuantityChange(item.CartID)}
                  >
                    {[...Array(10).keys()].map((num) => (
                      <MenuItem key={num} value={num + 1}>
                        {num + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Btn size="small" onClick={() => handleDelete(item.CartID)}>
                  <DeleteIcon />
                </Btn>
              </CardActions>
            </Card>
          ))}
        </Box>
        <Card
          sx={{
            width: "34%",
            padding: 3,
            height: 150,
            position: "fixed",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: 94,
            backgroundColor: "#F3FAF7",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Order Summary
          </Typography>
          <Typography variant="h6">
            Total: {totalPrice.toFixed(2)} JD
          </Typography>
          <Btn2 sx={{ marginTop: 3 }} onClick={handleClick}>
            Checkout
          </Btn2>
        </Card>
      </Box>
    </Box>
  );
}
