import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const COLORS_QUADRUPLETS: readonly (readonly [
  string,
  string,
  string,
  string
])[] = [
  ["#1E272E", "#2F3640", "#E8F1F8", "Midnight Steel"],
  ["#22313F", "#34495E", "#F0F6FF", "Urban Twilight"],
  ["#0E2A33", "#145361", "#E3F8FF", "Deep Teal Mist"],
  ["#2B2E1E", "#49543B", "#F3F7E8", "Olive Grove"],
  ["#2E1E28", "#4A3344", "#F8EAF2", "Mulberry Velvet"],
  ["#1F1E2E", "#3B3960", "#EAE9FF", "Indigo Smoke"],
  ["#1E2E25", "#3B5F4A", "#E8F9EE", "Emerald Veil"],
  ["#2E241E", "#5A3D2E", "#FFEFE7", "Rust Ember"],
  ["#1E1F2E", "#33355E", "#E8E9FF", "Sapphire Haze"],
  ["#2E1E1E", "#5C3333", "#FFEAEA", "Crimson Dust"],
  ["#1E2B2E", "#3A6066", "#E7F8FA", "Seafoam Drift"],
  ["#1E262E", "#3B4C5A", "#EDF2F6", "Slate Whisper"],
  ["#2E1E2A", "#57334E", "#FFE8F1", "Rose Quartz"],
  ["#1E2E2B", "#3A5E5A", "#E8F9F5", "Aqua Frost"],
  ["#2E2A1E", "#5C5633", "#F7F4E3", "Golden Field"],
  ["#1E1E2E", "#34345A", "#ECECFF", "Violet Dusk"],
  ["#1E282E", "#39545F", "#E9F3F8", "Arctic Wave"],
  ["#2E1E23", "#5B3342", "#FFE8EE", "Cherry Smoke"],
  ["#1E2E1E", "#3A5F3A", "#EAF8E9", "Forest Dew"],
  ["#2E201E", "#5C3A33", "#FFECE7", "Clay Hearth"],
] as const;

interface InputState {
  readonly colorTheme: readonly (readonly [string, string, string, string])[];
  selected: number;
  fullName: string;
  jobTitle: string;
  nameFontSize: number;
  jobTitleFontSize: number;
  techIconsSize: number;
  letterSpacingName: number;
  letterSpacingJobTitle: number;
  selectedTechStack: string[];
  fullNameBlock: boolean;
  jobTitleBlock: boolean;
  techBlock: boolean;
  loading: boolean;
  nameIsBold: boolean;
  jobTitleIsBold: boolean;
}

const initialState: InputState = {
  colorTheme: COLORS_QUADRUPLETS,
  selected: 0,
  fullName: "Sergent Pepper",
  jobTitle: "Backend Engineer",
  nameFontSize: 50,
  jobTitleFontSize: 35,
  techIconsSize: 55,
  letterSpacingName: 12,
  letterSpacingJobTitle: 5,
  selectedTechStack: [],
  fullNameBlock: false,
  jobTitleBlock: false,
  techBlock: false,
  loading: false,
  nameIsBold: false,
  jobTitleIsBold: false,
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
    setNameFontSize: (state, action: PayloadAction<number>) => {
      state.nameFontSize = action.payload;
    },
    setJobtitleFontSize: (state, action: PayloadAction<number>) => {
      state.jobTitleFontSize = action.payload;
    },
    setTechIconsSize: (state, action: PayloadAction<number>) => {
      state.techIconsSize = action.payload;
    },
    setLetterSpacingName: (state, action: PayloadAction<number>) => {
      state.letterSpacingName = action.payload;
    },
    setLetterSpacingJobtitle: (state, action: PayloadAction<number>) => {
      state.letterSpacingJobTitle = action.payload;
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
    setNameIsBold: (state, action: PayloadAction<boolean>) => {
      state.nameIsBold = action.payload;
    },
    setJobTitleIsBold: (state, action: PayloadAction<boolean>) => {
      state.jobTitleIsBold = action.payload;
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
  setNameFontSize,
  setJobtitleFontSize,
  setTechIconsSize,
  setLetterSpacingName,
  setLetterSpacingJobtitle,
  setLoading,
  setNameIsBold,
  setJobTitleIsBold,
} = inputSlice.actions;

export default inputSlice.reducer;
