import logo from './logo.svg';
import './App.css';
import data from './news.js';
import Block from './block';
import Button from './button.js';
import Checkbox from "./checkbox";
import Filter from "./checkbox";
import AccountForm from "./AccountForm";
import ProductForm from "./ProductForm";

function App() {
   // console.log(Button);

  return (
    <div className="App">

        {/* <Filter/>
        <Button key="1"  as={"link"}>Some button</Button>

        <Checkbox key="2" />

        <AccountForm key="3" /> */}

        <ProductForm key="4" />




    </div>
  );
}

export default App;


