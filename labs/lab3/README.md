# Reflection Questions for Lab 3

This document contains reflection questions from the lab assignment. Consider these questions as you work through the lab and after you've completed the implementation.

1. What is the difference between using `<Link>` and `<NavLink>` in your navigation bar?
   - Try it: click on a tab and then outside it to move the focus away from the tab.
   - You can also reload the page and observe any differences.

2. What happens if the user writes an invalid UUID in the URL for the confirmation page?

3. What is the meaning of a leading `/` in a path?
   - What's the difference between:
     ```javascript
     navigate("view-order/confirm/123e4567-e89b-12d3-a456-426614174000")
     ```
     and
     ```javascript
     navigate("/view-order/confirm/123e4567-e89b-12d3-a456-426614174000")
     ```
   - Try both and look in the browser URL field to observe the differences.

4. What happens when you start to compose a salad by selecting a few ingredients, switch to the view order page, and then go back to the compose salad page?
   - What do you see?
   - Why does this happen?

5. How does the use of `useOutletContext()` affect the passing of props between components?

6. How does the implementation of form validation affect the user experience? Are there any improvements you could make?

7. How does the routing structure you've implemented affect the overall organization and maintainability of your code?

8. What challenges did you face when implementing the optional ViewIngredient component? How did you overcome them?
