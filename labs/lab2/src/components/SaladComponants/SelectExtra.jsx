import React from 'react'
import SaladCheckBox from './SaladCheckBox';

function SelectExtra({ extrasOptions, extras, handleExtraChange }) {
    return (
      <div className="container col-12 mt-4">
        <div className="row h-200 p-5 bg-light border rounded-3">
          <h3>Välj tillbehör</h3>
          <div className="row row-cols-4">
            {extrasOptions.map(extra => (
              <SaladCheckBox
                key={extra}
                extra={extra}
                checked={!!extras[extra]}
                onChange={handleExtraChange}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
export default SelectExtra;
