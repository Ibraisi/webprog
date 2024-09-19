import React from 'react';

function ViewOrder({ shoppingCart }) {
    return (
        <div className="mb-3">
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h2 className="mb-0">Your Order</h2>
                </div>
                <ul className="list-group list-group-flush">
                    {shoppingCart?.map((salad, index) => (
                        <li key={salad.uuid} className="list-group-item">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-1">Salad {index + 1}</h5>
                                <span className="badge bg-primary rounded-pill">{salad.getPrice()} kr</span>
                            </div>
                            <p className="mb-1 text-muted">
                                {[
                                    salad.foundation,
                                    salad.protein,
                                    ...Object.keys(salad.extras),
                                    salad.dressing
                                ].filter(Boolean).join(', ')}
                            </p>
                        </li>
                    ))}
                </ul>
                <div className="card-footer text-end">
                    <h3 className="mb-0">Total: {shoppingCart.reduce((total, salad) => total + salad.getPrice(), 0)} kr</h3>
                </div>
            </div>
        </div>
    );
}

export default ViewOrder;
