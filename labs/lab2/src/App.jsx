import 'bootstrap/dist/css/bootstrap.css'
import inventory from './inventory.mjs';
import ComposeSalad from './components/ComposeSalad';
import ViewOrder from './components/ViewOrder';
import { useState } from 'react';

function App() {
    const [shoppingCart, setShoppingCart] = useState([])

    const addToOrder = (salad) => {
        setShoppingCart(prev => [...prev, salad]);
    }
  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>
      <ViewOrder shoppingCart = {shoppingCart}/>
      <ComposeSalad inventory={inventory} addToOrder={addToOrder}></ComposeSalad>
      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}

export default App;
