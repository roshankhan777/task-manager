import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks";

const errorText = (e) => e.response?.data?.message || e.message;

// ---- API calls (async thunks) ----
export const fetchTasks = createAsyncThunk("tasks/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (e) {
    return rejectWithValue(errorText(e));
  }
});

export const addTask = createAsyncThunk("tasks/add", async (task, { rejectWithValue }) => {
  try {
    const res = await axios.post(API_URL, task);
    return res.data;
  } catch (e) {
    return rejectWithValue(errorText(e));
  }
});

export const updateTask = createAsyncThunk("tasks/update", async ({ id, changes }, { rejectWithValue }) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, changes);
    return res.data;
  } catch (e) {
    return rejectWithValue(errorText(e));
  }
});

export const deleteTask = createAsyncThunk("tasks/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (e) {
    return rejectWithValue(errorText(e));
  }
});

// ---- Slice ----
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    filter: "All", // All, Pending, Done
    loading: false,
    error: null,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const i = state.items.findIndex((t) => t._id === action.payload._id);
        if (i !== -1) state.items[i] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t._id !== action.payload);
      })
      // koi bhi call fail ho to error save karo
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || "Something went wrong";
        }
      );
  },
});

export const { setFilter, clearError } = taskSlice.actions;
export default taskSlice.reducer;