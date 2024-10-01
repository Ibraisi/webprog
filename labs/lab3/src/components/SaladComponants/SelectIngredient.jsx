import React, { useId } from 'react';

function SelectIngredient({ label, onChange, value, options }) {
  const id = useId();

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <select
        required
        id={id}
        className="form-select"
        value={value}
        onChange={onChange}
      >
        <option value="">{value}</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <div className="invalid-feedback">This field is required.</div>
      <div className="valid-feedback">Correct</div>

    </div>
  );
}

export default SelectIngredient;
