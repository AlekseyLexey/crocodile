import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store/store";

export type ToolType = "pencil" | "fill" | "clear";

interface CanvasState {
  currentColor: string;
  activeTool: ToolType;
  canvasData: string | null;
  dimensions: {
    width: number;
    height: number;
  };
}

const initialState: CanvasState = {
  currentColor: "#000000",
  activeTool: "pencil",
  canvasData: null,
  dimensions: {
    width: 464,
    height: 426,
  },
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setColor: (state, action: PayloadAction<string>) => {
      state.currentColor = action.payload;
    },
    setTool: (state, action: PayloadAction<ToolType>) => {
      state.activeTool = action.payload;
    },
    saveCanvas: (state, action: PayloadAction<string>) => {
      state.canvasData = action.payload;
    },
    clearCanvas: (state) => {
      state.canvasData = null;
    },
    setDimensions: (
      state,
      action: PayloadAction<{ width: number; height: number }>
    ) => {
      state.dimensions = action.payload;
    },
  },
});

export const { setColor, setTool, saveCanvas, clearCanvas, setDimensions } =
  canvasSlice.actions;

export const selectCanvas = (state: RootState) => state.canvas;

export const canvasReducer = canvasSlice.reducer;
