import { useState } from 'react';

function ComposeSalad(props) {
  const foundationList = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  const [foundation, setFoundation] = useState('Salad');
  const [extras, setExtra] = useState({ Bacon: true, Fetaost: true });

  const hadleFoundationChange = (event) => {
    setFoundation(event.target.value);
  }
  return (
    <div className="continer col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>
        <fieldset class="col-md-12">
          <label for="foundation" class="form-label">Välj bas</label>
          <select value={foundation} class="form-select" id="foundation" onChange={hadleFoundationChange}>
            {foundationList.map(name => <option key={name} value={name}>{name}</option>)}
          </select>
        </fieldset>

      </div>
    </div>
  );
}
export default ComposeSalad;
