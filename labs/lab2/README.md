# Lab 2 Reflection Questions and Answers

## Question 1
**Q: The render function must be a pure function of props and the component state, the values returned by useState(). What happens if the output of the render function is depending on other data that changes over time?**

A: If the render function depends on data that changes over time outside of props and state, it can lead to inconsistent UI updates and unpredictable behavior. React might not re-render when that external data changes, causing the UI to be out of sync with the actual data.

## Question 2
**Q: In the code above, the foundations array is computed every time the component is rendered. The inventory changes very infrequent so you might think this is inefficient. Can you cache foundations so it is only computed when props.inventory changes? Hint, read about the second parameter to useEffect, "Learn React"/"Escape Hatches"/"Synchronizing with Effects", https://react.dev/learn/synchronizing-with-effects. Is it a good idea? Read You Might Not Need an Effect: https://react.dev/learn/you-might-not-need-an-effect**

A: You can use useMemo to cache the foundations array, computing it only when props.inventory changes. However, for simple computations, this optimization might not be necessary and could add complexity. The React team often advises against premature optimization.

## Question 3
**Q: Should you move the foundation state to the Select component above? To answer this you need to consider what happens when the user submits the form.**

A: It's generally better to keep the foundation state in the parent ComposeSalad component. This allows the form submission logic to easily access all the salad data in one place, and maintains a single source of truth for the entire form state.

## Question 4
**Q: What triggers react to call the render function and update the DOM?**

A: React triggers a re-render when:
- The component's state changes (via setState)
- The component's props change
- The parent component re-renders

## Question 5
**Q: When the user change the html form state (DOM), does this change the state of your component?**

A: No, changing the HTML form state (DOM) does not directly change the state of your React component. You need to explicitly update the component's state using setState (or a state setter function from useState) in response to form events.

## Question 6
**Q: What is the value of this in the event handling call-back functions?**

A: In modern React with function components and hooks, 'this' is not typically used in event handling callbacks. If you're using arrow functions or functions defined inside the component, 'this' will be undefined or refer to the global object (in non-strict mode).

## Question 7
**Q: How is the prototype chain affected when copying an object with copy = {...sourceObject}?**

A: When using the spread operator {...sourceObject}, you create a shallow copy of the object. The prototype chain of the new object is not preserved; it will be a plain object inheriting directly from Object.prototype, regardless of the source object's prototype chain.
