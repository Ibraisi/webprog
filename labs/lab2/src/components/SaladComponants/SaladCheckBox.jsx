import React from 'react'

function SaladCheckBox({ extra, checked, onChange, price }) {
  return (
    <div className="col mb-3">
      <div className="form-check">
        <input
          type="checkbox"
          id={extra}
          name={extra}
          checked={checked}
          onChange={onChange}
          className="form-check-input"
        />
        <label htmlFor={extra} className="form-check-label">{extra}({price} kr)</label>
      </div>
    </div>
  )
}

export default SaladCheckBox
