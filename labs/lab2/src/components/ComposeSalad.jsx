import React, { useState, useEffect } from 'react';
import SelectIngredient from './SaladComponants/SelectIngredient';
import SelectExtra from './SaladComponants/SelectExtra';
import Salad from '../Model/Salad';


function ComposeSalad({ inventory, addToOrder , saladToEdit,updateOrder }) {
  const [foundation, setFoundation] = useState('Sallad');
  const [protein, setProtein] = useState('Kycklingfilé');
  const [extras, setExtras] = useState({Avocado:true, Bacon:true});
  const [dressing, setDressing] = useState('Pesto');

  const [foundationOptions, setFoundationOptions] = useState([]);
  const [proteinOptions, setProteinOptions] = useState([]);
  const [extrasOptions, setExtrasOptions] = useState([]);
  const [dressingOptions, setDressingOptions] = useState([]);

  useEffect(() => {
    setFoundationOptions(Object.keys(inventory).filter(item => inventory[item].foundation));
    setProteinOptions(Object.keys(inventory).filter(item => inventory[item].protein));
    setExtrasOptions(Object.keys(inventory)
    .filter(item => inventory[item].extra)
    .map(item => ({
      name: item,
      price: inventory[item].price
    }))
  );    setDressingOptions(Object.keys(inventory).filter(item => inventory[item].dressing));
  }, [inventory]);

  useEffect(() => {
    if (saladToEdit) {
      setFoundation(saladToEdit.foundation);
      setProtein(saladToEdit.protein);
      setDressing(saladToEdit.dressing);

      // Set extras
      if (saladToEdit.extras && typeof saladToEdit.extras === 'object') {
        setExtras(saladToEdit.extras);
      } else {
        setExtras({});
      }
    }
  }, [saladToEdit]);




  const handleExtraChange = (event) => {
    const { name, checked } = event.target;
    setExtras(prevExtras => ({ ...prevExtras, [name]: checked }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedExtras = Object.keys(extras).filter(key => extras[key]);
    if (!foundation || !protein || selectedExtras.length < 2 || !dressing) {
        alert('Please fill out all fields and select at least two extras.');
        return;
    }

    const newSalad = new Salad();
    newSalad.setFoundation(foundation)
             .setProtein(protein)
             .setDressing(dressing);

    selectedExtras.forEach(extra => newSalad.addExtra(extra));

    console.log(newSalad);
    if (saladToEdit) {
        newSalad.uuid = saladToEdit.uuid;
        updateOrder(newSalad);
      } else {
        addToOrder(newSalad);
      }
    // Reset form
    setFoundation('');
    setProtein('');
    setExtras({});
    setDressing('');
  };

  return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>
        <form onSubmit={handleSubmit}>
          <SelectIngredient
            label="Välj bas"
            value={foundation}
            onChange={(e) => setFoundation(e.target.value)}
            options={foundationOptions}
          />
          <SelectIngredient
            label="Välj protein"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            options={proteinOptions}
          />
          <SelectExtra
              extrasOptions={extrasOptions}
              extras={extras}
              handleExtraChange={handleExtraChange}
          />
          <SelectIngredient
            label="Välj dressing"
            value={dressing}
            onChange={(e) => setDressing(e.target.value)}
            options={dressingOptions}
          />
          <div className="mt-4">
            <button type="submit" className="btn btn-primary">Lägg till i kundvagnen</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ComposeSalad;
