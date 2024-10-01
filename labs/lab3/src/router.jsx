import { createBrowserRouter } from "react-router-dom";
import App from './App';
import ComposeSalad from "./components/ComposeSalad";
import ViewOrder from "./components/ViewOrder";
import OrderConfirmation from "./components/OrderConfirmation";

async function inventoryLoader() {
    const inventory = { Sallad: { price: 10, foundation: true, vegan: true } };
    await new Promise(resolve => setTimeout(resolve, 500));
    return inventory;
    }
const router = createBrowserRouter([

  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <p>Welcome to my own salad bar</p>
      },
      {
        path: "compose-salad",
        loader: inventoryLoader,
        element: <ComposeSalad/>
      },
      {
        path: "view-order",
        element: <ViewOrder/>,
        children:[
            {
                path: "confirm/:confirmUuid",
                element: <OrderConfirmation />
            }
        ]
      },
      {
        path: "*",
        element: <h1>404 - Page Not Found</h1>
      },
    ],
  },
]);

export default router;
