import axios from "axios";
const cart = (state = { lineItems: [] }, action) => {
  if (action.type === "SET_CART") {
    return action.cart;
  }
  if (action.type === "CREATE_ITEM") {
    state = { lineItems: [...state.lineItems, action.lineItems] };
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

export const createItem = (product) => {
  const token = window.localStorage.getItem("token");
  return async (dispatch) => {
    const response = await axios.post("/api/orders/cart", product, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "CREATE_ITEM", product: response.data });
  };
};

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
