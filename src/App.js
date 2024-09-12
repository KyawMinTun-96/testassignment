import React from "react";
import InfiniteScroll from "./components/InfiniteScroll";
import ProductList from './components/ProductList';
import FocusableInput from "./components/FocusableInput";

function App() {
  return (
    <div className="app py-10">
      <div className="container-xl">
        <ProductList/>
        <FocusableInput/>
        <InfiniteScroll/>
      </div>
    </div>
  );
}

export default App;
