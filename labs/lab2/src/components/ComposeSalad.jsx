import React, { useState, useEffect } from 'react';
import SelectIngredient from './SaladComponants/SelectIngredient';
import SelectExtra from './SaladComponants/SelectExtra';
import Salad from '../Model/Salad';

function ComposeSalad({ inventory, addToOrder, saladToEdit, updateOrder }) {
  const [foundation, setFoundation] = useState('');
  const [protein, setProtein] = useState('');
  const [extras, setExtras] = useState({});
  const [dressing, setDressing] = useState('');
  const [touched, setTouched] = useState(false);
  const [showExtrasError, setShowExtrasError] = useState(false);

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
    );
    setDressingOptions(Object.keys(inventory).filter(item => inventory[item].dressing));
  }, [inventory]);

  const handleExtraChange = (event) => {
    const { name, checked } = event.target;
    setExtras(prevExtras => ({ ...prevExtras, [name]: checked }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched(true);

    const selectedExtras = Object.keys(extras).filter(key => extras[key]);
    if (!foundation || !protein || selectedExtras.length < 3 || selectedExtras.length > 9 || !dressing) {
      if (selectedExtras.length < 3 || selectedExtras.length > 9) {
        setShowExtrasError(true);
      } else {
        setShowExtrasError(false);
      }
      return;
    }

    setShowExtrasError(false);

    const newSalad = new Salad();
    newSalad.setFoundation(foundation)
      .setProtein(protein)
      .setDressing(dressing);

    selectedExtras.forEach(extra => newSalad.addExtra(extra));

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
    setTouched(false);
  };

  return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>
        <form onSubmit={handleSubmit} className={touched ? "was-validated" : ""} noValidate>
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
          {/* Alert message for extras validation */}
          {showExtrasError && (
            <div className="alert alert-danger mt-2">
              Please select at least three but no more than nine extras.
            </div>
          )}
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
