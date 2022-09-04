import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ProductDescription from "./Pages/ProductDescription/ProductDescription";
import Checkout from "./Pages/Checkout/Checkout";
import "./App.css";
// npx json-server -p 3500 -w data/db.json
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productUrl" element={<ProductDescription />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
};

export default App;
