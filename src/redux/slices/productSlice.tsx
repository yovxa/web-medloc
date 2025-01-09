import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Product {
  ProductID: number;
  Name: string;
  Expiry_date: Date;
  Image_data: string;
  Price: number;
  Description: string;
  mg: string;
}

interface ProductState {
  products: Product[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ProductState = {
  products: [],
  status: 'idle',
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('http://localhost:8081/product');
  return (await response.json()) as Product[];
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default productSlice.reducer;
