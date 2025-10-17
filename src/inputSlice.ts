import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const COLOR_TRIPLETS: readonly (readonly [string, string, string])[] = [
  ["#1E272E", "#2F3640", "#E8F1F8"],
  ["#22313F", "#34495E", "#F0F6FF"],
  ["#0E2A33", "#145361", "#E3F8FF"],
  ["#2B2E1E", "#49543B", "#F3F7E8"],
  ["#2E1E28", "#4A3344", "#F8EAF2"],
  ["#1F1E2E", "#3B3960", "#EAE9FF"],
  ["#1E2E25", "#3B5F4A", "#E8F9EE"],
  ["#2E241E", "#5A3D2E", "#FFEFE7"],
  ["#1E1F2E", "#33355E", "#E8E9FF"],
  ["#2E1E1E", "#5C3333", "#FFEAEA"],
  ["#1E2B2E", "#3A6066", "#E7F8FA"],
  ["#1E262E", "#3B4C5A", "#EDF2F6"],
  ["#2E1E2A", "#57334E", "#FFE8F1"],
  ["#1E2E2B", "#3A5E5A", "#E8F9F5"],
  ["#2E2A1E", "#5C5633", "#F7F4E3"],
  ["#1E1E2E", "#34345A", "#ECECFF"],
  ["#1E282E", "#39545F", "#E9F3F8"],
  ["#2E1E23", "#5B3342", "#FFE8EE"],
  ["#1E2E1E", "#3A5F3A", "#EAF8E9"],
  ["#2E201E", "#5C3A33", "#FFECE7"],
];

interface InputState {
  readonly colorTheme: readonly (readonly [string, string, string])[];
  selected: number;
  fullName: string;
  jobTitle: string;
  textFontSize: number;
  selectedTechStack: string[];
  fullNameBlock: boolean;
  jobTitleBlock: boolean;
  techBlock: boolean;
  loading: boolean;
}

const initialState: InputState = {
  colorTheme: COLOR_TRIPLETS,
  selected: 0,
  fullName: "Sergent Pepper",
  jobTitle: "Software Developer",
  textFontSize: 2.5,
  selectedTechStack: [],
  fullNameBlock: false,
  jobTitleBlock: false,
  techBlock: false,
  loading: false,
};

const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    setColorPair: (state, action: PayloadAction<number>) => {
      state.selected = action.payload;
    },
    setFullName: (state, action: PayloadAction<string>) => {
      state.fullName = action.payload;
    },
    setJobTitle: (state, action: PayloadAction<string>) => {
      state.jobTitle = action.payload;
    },
    setFontSize: (state, action: PayloadAction<number>) => {
      state.textFontSize = action.payload;
    },
    addTechToStack: (state, action: PayloadAction<string>) => {
      if (!state.selectedTechStack.includes(action.payload))
        state.selectedTechStack = [...state.selectedTechStack, action.payload];
    },
    removeTechFromStack: (state, action: PayloadAction<string>) => {
      state.selectedTechStack = state.selectedTechStack.filter(
        (tech) => tech !== action.payload
      );
    },
    resetTechStack: (state) => {
      state.selectedTechStack = [];
    },
    setFullNameBlock: (state) => {
      state.fullNameBlock = true;
    },
    resetFullNameBlock: (state) => {
      state.fullNameBlock = false;
    },
    setJobtitleBlock: (state) => {
      state.jobTitleBlock = true;
    },
    resetJobtitleBlock: (state) => {
      state.jobTitleBlock = false;
    },
    setTechBlock: (state) => {
      state.techBlock = true;
    },
    resetTechBlock: (state) => {
      state.techBlock = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setColorPair,
  setFullName,
  addTechToStack,
  removeTechFromStack,
  resetTechStack,
  setJobTitle,
  setFullNameBlock,
  resetFullNameBlock,
  setJobtitleBlock,
  resetJobtitleBlock,
  setTechBlock,
  resetTechBlock,
  setFontSize,
  setLoading,
} = inputSlice.actions;

export default inputSlice.reducer;
