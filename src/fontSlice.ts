import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface FontFamilyState {
  fontFamily: string;
  base64: string | null;
  isLoaded: boolean;
}

const initialState: FontFamilyState = {
  fontFamily: "",
  base64: null,
  isLoaded: false,
};

const fontSlice = createSlice({
  name: "fontFamily",
  initialState,
  reducers: {
    setFontFamily: (state, action: PayloadAction<string>) => {
      state.fontFamily = action.payload;
    },
    setBase64: (state, action: PayloadAction<string | null>) => {
      state.base64 = action.payload;
    },

    setIsLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload;
    },
  },
});

export const { setFontFamily, setBase64, setIsLoaded } =
  fontSlice.actions;

export default fontSlice.reducer;
