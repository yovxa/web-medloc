import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Fab,
  styled,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";

const Btn = styled(Button)({
  color: "#023E8A",
  borderRadius: 15,
  padding: 5,
  "&:hover": {
    color: "white",
    backgroundColor: "#023E8A",
    ":active": {
      color: "#023E8A",
      backgroundColor: "transparent",
    },
  },
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface Product {
  ProductID: number;
  Name: string;
  Expiry_date: Date;
  Image: string;
  Price: number;
  Description: string;
  mg: string;
  Category: "Medicine" | "Cosmetics";
}

interface CartItem {
  CartID: number;
  Quantity: number;
  Total_price: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "Medicine" | "Cosmetics" | ""
  >(""); // State for selected category
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:8081/product")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));

    fetch("http://localhost:8081/cart")
      .then((response) => response.json())
      .then((data) => setCart(data))
      .catch((error) => console.error("Error fetching cart:", error));
  }, []);

  const handleAddToCart = (product: Product) => {
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}"); // Fetch the current user from localStorage
    const userID = currentUser?.UserID; // Replace 'id' with the actual key for user ID in your user object

    if (!userID) {
      alert("Please log in to add items to the cart.");
      return;
    }

    fetch("http://localhost:8081/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ProductID: product.ProductID,
        userID,
        Quantity: 1,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to add to cart.");
        }
      })
      .then(() => {
        setCart((prevCart) => [
          ...(Array.isArray(prevCart) ? prevCart : []), 
          { CartID: Date.now(), Quantity: 1, Total_price: product.Price },
        ]);
        alert(`${product.Name} has been added to your cart.`);
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        alert("An error occurred. Please try again.");
      });
  };  

  const filteredProducts = products.filter(
    (product) =>
      product.Name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory ? product.Category === selectedCategory : true)
  );

  const handleCategoryChange = (
    event: React.MouseEvent<HTMLElement>,
    newCategory: "Medicine" | "Cosmetics" | ""
  ) => {
    setSelectedCategory(newCategory);
  };

  const handleClickOpen = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <div
        className="products-container"
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 10,
          marginTop: "70px",
          height: "85vh",
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: 2,
            gap: 2,
          }}
        >
          <TextField
            label="Search"
            variant="outlined"
            sx={{ width: 550 }}
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
          <ToggleButtonGroup
            value={selectedCategory}
            exclusive
            onChange={handleCategoryChange}
            aria-label="Category"
          >
            <ToggleButton value="">All</ToggleButton>
            <ToggleButton value="medicine">Medicine</ToggleButton>
            <ToggleButton value="cosmetics">Cosmetics</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {filteredProducts.map((item) => (
            <Card
              key={item.ProductID}
              sx={{
                minWidth: 250,
                margin: 1,
                padding: 1,
                backgroundColor: "#F3FAF7",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardMedia
                component="img"
                alt={item.Name}
                height="auto"
                src={"http://localhost:8081/" + item.Image}
                sx={{
                  width: 200,
                }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  textAlign={"center"}
                >
                  {item.Name}
                </Typography>
                <Typography
                  variant="caption"
                  textAlign={"center"}
                  component="div"
                  sx={{ color: "text.secondary" }}
                >
                  {item.mg || ""}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: 200,
                }}
              >
                <div>
                  <Typography>{item.Price} JD</Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "end",
                  }}
                >
                  <Btn size="small" onClick={() => handleAddToCart(item)}>
                    Add to cart
                  </Btn>
                  <Btn size="small" onClick={() => handleClickOpen(item)}>
                    Learn More
                  </Btn>
                </div>
              </CardActions>
            </Card>
          ))}
        </Box>
      </div>

      {selectedProduct && (
        <BootstrapDialog onClose={handleClose} open={!!selectedProduct}>
          <DialogTitle sx={{ m: 0, p: 2 }}>{selectedProduct.Name}</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography gutterBottom>{selectedProduct.Description}</Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Back
            </Button>
          </DialogActions>
        </BootstrapDialog>
      )}

      <div
        style={{
          bottom: "30px",
          right: "30px",
          position: "fixed",
          zIndex: 1000,
        }}
      >
        <Fab LinkComponent={"a"} href="/cart">
          <ShoppingCartIcon color="inherit" />
        </Fab>
      </div>
    </>
  );
}
