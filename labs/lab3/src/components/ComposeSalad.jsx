import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate, useNavigation } from 'react-router-dom';
import SelectIngredient from './SaladComponants/SelectIngredient';
import SelectExtra from './SaladComponants/SelectExtra';
import Salad from '../Model/Salad';

function ComposeSalad() {
  const { addToOrder, saladToEdit, updateOrder, setSaladToEdit } = useOutletContext();
  const navigate = useNavigate();

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

  // Spinner state
  const [loading, setLoading] = useState(true);

  // Function to fetch all ingredients from the server
  async function fetchAllIngredients(kind) {
    const response = await fetch(`http://localhost:8080/${kind}s`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${kind}s: ${response.status}`);
    }
    const ingredientNames = await response.json();
    const ingredientPromises = ingredientNames.map(name => fetchIngredient(kind, name));
    const ingredientDetails = await Promise.all(ingredientPromises);

    return ingredientDetails.reduce((acc, detail, index) => {
      acc[ingredientNames[index]] = detail;
      return acc;
    }, {});
  }

  // Function to fetch a single ingredient
  async function fetchIngredient(kind, name) {
    const response = await fetch(`http://localhost:8080/${kind}s/${name}`);
    if (!response.ok) {
      throw new Error(`${name} returned status ${response.status}`);
    }
    return response.json();
  }

  // Function to load the inventory
  async function inventoryLoader() {
    try {
      const foundations = await fetchAllIngredients('foundation');
      const proteins = await fetchAllIngredients('protein');
      const extras = await fetchAllIngredients('extra');
      const dressings = await fetchAllIngredients('dressing');

      setFoundationOptions(Object.keys(foundations));
      setProteinOptions(Object.keys(proteins));
      setExtrasOptions(Object.keys(extras).map(item => ({
        name: item,
        price: extras[item].price
      })));
      setDressingOptions(Object.keys(dressings));
      setLoading(false); // Set loading to false when data is loaded
    } catch (error) {
      console.error('Error loading inventory:', error);
    }
  }

  useEffect(() => {
    inventoryLoader();
  }, []);

  useEffect(() => {
    if (saladToEdit) {
      setFoundation(saladToEdit.foundation);
      setProtein(saladToEdit.protein);
      setDressing(saladToEdit.dressing);
      setExtras(
        Object.keys(saladToEdit?.extras || {}).reduce((acc, key) => {
          acc[key] = saladToEdit.extras[key];
          return acc;
        }, {})
      );
    }
  }, [saladToEdit]);

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

    // Reset form and navigate
    setFoundation('');
    setProtein('');
    setExtras({});
    setDressing('');
    setTouched(false);
    setSaladToEdit(null);
    navigate(`/view-order/confirm/${newSalad.uuid}`);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>{saladToEdit ? 'Edit Your Salad' : 'Compose Your Salad'}</h2>
        <form onSubmit={handleSubmit} className={touched ? "was-validated" : ""} noValidate>
          <SelectIngredient
            label="Choose base"
            value={foundation}
            onChange={(e) => setFoundation(e.target.value)}
            options={foundationOptions}
          />
          <SelectIngredient
            label="Choose protein"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            options={proteinOptions}
          />
          <SelectExtra
            extrasOptions={extrasOptions}
            extras={extras}
            handleExtraChange={handleExtraChange}
          />
          {showExtrasError && (
            <div className="alert alert-danger mt-2">
              Please select at least three but no more than nine extras.
            </div>
          )}
          <SelectIngredient
            label="Choose dressing"
            value={dressing}
            onChange={(e) => setDressing(e.target.value)}
            options={dressingOptions}
          />
          <div className="mt-4">
            <button type="submit" className="btn btn-primary">
              {saladToEdit ? 'Update Salad' : 'Add to Cart'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ComposeSalad;
