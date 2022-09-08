import { configureStore } from "@reduxjs/toolkit";
import states from "./reducer/states";

export default configureStore({
  reducer: { states },
});
