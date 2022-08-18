import { RootState } from "@/redux_/store";
import { AddEmployeer } from "@/redux_/types/employes";
import { createSlice } from "@reduxjs/toolkit";

const AddEmployeer: AddEmployeer[] = [
  {
    fieldName: "",
    fields: [""],
  },
];

const addEmployeerSlice = createSlice({
  name: "addEmployeerSlice",
  initialState: AddEmployeer,
  reducers: {
    addField: (state, action) => {
      state
        .find((e) => e.fieldName === action.payload.name)
        ?.fields.push(action.payload.show);
    },
  },
});
export const { addField } = addEmployeerSlice.actions;
export const addEmployeerSelector = (store: RootState) =>
  store.addEmployeerSelector;
export default addEmployeerSlice.reducer;
