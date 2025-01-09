import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the CartItem interface
interface CartItem {
  CartID: number;
  ProductID: number;
  Quantity: number;
  Total_price: number;
}

// Define the state for the cart slice
interface CartState {
  cart: CartItem[];
  status: "idle" | "loading" | "failed";
}

// Initial state
const initialState: CartState = {
  cart: [],
  status: "idle",
};

// Fetch cart items for the current user
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userID: number) => {
    const response = await fetch(`http://localhost:8081/cart?userID=${userID}`);
    return (await response.json()) as CartItem[];
  }
);

// Add a product to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({
    ProductID,
    Quantity,
    userID,
  }: {
    ProductID: number;
    Quantity: number;
    userID: number;
  }) => {
    await fetch("http://localhost:8081/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ProductID, Quantity, userID }),
    });
    const response = await fetch(`http://localhost:8081/cart?userID=${userID}`);
    return (await response.json()) as CartItem[];
  }
);

// Update an item in the cart
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({
    CartID,
    Quantity,
    userID,
  }: {
    CartID: number;
    Quantity: number;
    userID: number;
  }) => {
    await fetch("http://localhost:8081/cart", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ CartID, Quantity, userID }),
    });
    const response = await fetch(`http://localhost:8081/cart?userID=${userID}`);
    return (await response.json()) as CartItem[];
  }
);

// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Optional: Add synchronous reducers if needed
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.status = "failed";
      })
      // Add to cart
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      // Update cart
      .addCase(updateCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
