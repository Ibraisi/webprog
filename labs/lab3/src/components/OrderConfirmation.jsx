import React from 'react';
import { useParams, useOutletContext } from 'react-router-dom';

function OrderConfirmation() {
    const { confirmUuid } = useParams(); // Retrieve the confirmUuid parameter from the URL
    const { shoppingCart } = useOutletContext(); // Access the context provided by the parent (ViewOrder component or higher)

    // Find the salad in the shopping cart with the matching UUID
    const confirmedSalad = shoppingCart?.find(salad => salad.uuid === confirmUuid);

    if (!confirmedSalad) {
        return <div className="alert alert-warning">No salad found with the given ID.</div>;
    }

    return (
        <div className="alert alert-success" role="alert">
            Your salad has been added to the order!
            <br />
            Salad ID: {confirmUuid}
            <br />
            Price: {confirmedSalad.getPrice()} kr
        </div>
    );
}

export default OrderConfirmation;
