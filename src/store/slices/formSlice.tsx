import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type initialStateType = {
  current: Person;
};

interface Person {
    name: string;

    birthday?: Date;

    country: string;
};

interface UpdatePath {
    path: string;

    value: any;
};

const initialState: initialStateType = {
  current: {
    name: "",
    birthday: undefined,
    country: ""
  }
};

export const formSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<UpdatePath>) => {
        var x = action.payload;
        state.current[x.path as keyof Person] = x.value;
    }
  },
});

export const { update } = formSlice.actions;
    
export const getPerson = (state: RootState) => state.person.current;

export default formSlice.reducer;