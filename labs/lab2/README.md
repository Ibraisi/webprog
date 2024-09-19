Reflection Question 1:
The render function in React should be a pure function, meaning that its output should only depend on the component's props and state.

However, if the render output depends on other data (like variables or functions) that change over time but aren't part of the state, it can cause issues like:

Unpredictable UI: The UI may update unexpectedly because React won’t know when the render output should change. React optimizes re-renders based on state and props, so any external changes won't trigger re-renders.
Performance problems: If the render output depends on external data, React might keep re-rendering without the user intending it to, leading to inefficient behavior.
In simple terms: React's system works best when all changes happen through state or props. Relying on other sources for changes confuses React, making it hard to keep the UI in sync with the data.

Reflection Question 2:
If an array like foundations is recomputed every time the component renders, and it depends on something like an inventory that rarely changes, this can be inefficient.

Why? Because:

Even though inventory rarely changes, the calculation happens on every render.
This wastes computational resources and might slow down your app unnecessarily.
A solution would be to use useMemo to memoize the computed array. This means React will only recompute the array when the inventory actually changes, saving unnecessary recalculations:

js
Copy code
const foundations = useMemo(() => computeFoundations(inventory), [inventory]);
This way, foundations only updates when inventory changes, making the component more efficient.
