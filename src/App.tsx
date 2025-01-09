import "./App.css";
import ProductsPage from "./ProductsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./Navbar";
import HomePage from "./HomePage";
import Pillidentifier from "./Pillidentifier";
import SearchPharmacy from "./SearchPharmacy";
import SymptomChecker from "./SymptomChecker";
import CartPage from "./CartPage";
import SignIn from "./LoginPage";
import { UserProvider } from "./userContext";
import SignUp from "./SignupPage";
import CheckoutPage from "./CheckoutPage";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<ResponsiveAppBar />}>
            <Route index element={<HomePage />} />
            <Route path="searchpharmacy" element={<SearchPharmacy />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="pillidentifier" element={<Pillidentifier />} />
            <Route path="symptomchecker" element={<SymptomChecker />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
