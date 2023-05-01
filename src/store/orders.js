import axios from "axios";

const orders = (state = { lineItems: [] }, action) => {
  if (action.type === "SET_ORDER") {
    return action.order;
  }
  return state;
};


export const cartToOrder = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    console.log(token);
    const response = await axios.post("/api/orders", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_ORDER", orders: response.data });
  };
};


export default orders;