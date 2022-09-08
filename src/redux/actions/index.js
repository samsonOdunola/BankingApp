const currentUser = (user) => {
  return { type: "GETUSER", payload: user };
};
export { currentUser };
