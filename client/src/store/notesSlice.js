import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  notesData: [],
};

export const createNotes = createAsyncThunk("/createNotes",
  async (data,{rejectWithValue})=>{
    try{
      const response = await axios.post(`${import.meta.env.VITE_URL}/notes/create`,data);
      return response?.data;
    }catch(error){
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchNotes = createAsyncThunk(
  "/fetchNotes",
  async (name,{rejectWithValue}) => {
    try {
      const queryString = new URLSearchParams(name).toString();
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/notes/fetch?${queryString}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteNotes = createAsyncThunk(
  "/deleteNotes",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_URL}/notes/delete/${id}`)
        return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateNotes = createAsyncThunk(
  "/updateNotes",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_URL}/notes/update/${data.id}`,
        {
          title:data.title,
          description:data.description,
          category:data.category
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);



const notesSlice = createSlice({
  name:"notes",
  initialState,
  reducers:{
  },
  extraReducers:(builder)=>{
    builder
      .addCase(createNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNotes.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createNotes.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notesData = action?.payload?.data;
      })
      .addCase(fetchNotes.rejected, (state) => {
        state.isLoading = false;
        state.notesData = [];
      });
  }
})

// export const {searchedNotes} = notesSlice.actions;

export default notesSlice.reducer;