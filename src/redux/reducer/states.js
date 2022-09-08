const initstate = {
  currentUser: [],
};

const states = (state = initstate, action) => {
  if (action.type === "GETUSER") {
    return { ...state, currentUser: action.payload };
  } else {
    return state;
  }
};

export default states;
