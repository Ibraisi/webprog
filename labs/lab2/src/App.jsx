import 'bootstrap/dist/css/bootstrap.css'
import inventory from './inventory.mjs';
import ComposeSalad from './components/ComposeSalad';
import ViewOrder from './components/ViewOrder';
import { useState } from 'react';

function App() {
    const [shoppingCart, setShoppingCart] = useState([])
    const [saladToEdit, setSaladToEdit] = useState(null)

    const addToOrder = (salad) => {
        setShoppingCart(prev => [...prev, salad]);
    }
    const removeFromOrder = (id) => {
        setShoppingCart(prev => prev.filter(salad => salad.uuid !== id));
    };
    const saladToEditHanlder = (id) => {
        const foundSalad = shoppingCart?.find((salad) => salad.uuid === id);
        setSaladToEdit(foundSalad);
        console.log(foundSalad);
      }

      const updateOrder = (updatedSalad) => {
        setShoppingCart(prev => prev.map(salad =>
            salad.uuid === updatedSalad.uuid ? updatedSalad : salad
        ));
        setSaladToEdit(null);
    }


  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>
      <ViewOrder shoppingCart = {shoppingCart} removeFromOrder={removeFromOrder} editShoppingCart={saladToEditHanlder} />
      <ComposeSalad inventory={inventory} addToOrder={addToOrder} saladToEdit={saladToEdit} updateOrder={updateOrder} ></ComposeSalad>
      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}

export default App;
