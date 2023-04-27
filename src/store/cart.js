import axios from "axios";
const cart = (state = { lineItems: [] }, action) => {
  if (action.type === "SET_CART") {
    return action.cart;
  }
  if (action.type === "CREATE_ITEM") {
    state = { lineItems: [...state, action.item] };
  }
  if (action.type === "UPDATE_CART") {
    return action.cart;
  }
  return state;
};

export const fetchCart = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get("/api/orders/cart", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_CART", cart: response.data });
  };
};

// needs testing
// export const createItem = () => {
//   return async (dispatch) => {
//     const response = await axios.post("/api/orders/cart", item, {
//       headers: {
//         authorization: token,
//       },
//     });
//     dispatch({ type: "CREATE_ITEM", item: response.data });
//   };
// };

export const updateCart = (cart) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.put("/api/orders/cart", cart, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "UPDATE_CART", cart: response.data });
  };
};

export default cart;
