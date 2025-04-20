import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  properties: [],
  property: null,
  featuredProperties: [],
  nearbyProperties: [],
  page: 1,
  pages: 1,
  totalProperties: 0,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Get all properties with filters
export const getProperties = createAsyncThunk(
  'property/getProperties',
  async (filters, thunkAPI) => {
    try {
      // Build query string from filters
      let queryString = '';
      if (filters) {
        queryString = `?${new URLSearchParams(filters).toString()}`;
      }

      const { data } = await axios.get(`/api/properties${queryString}`);
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get property by ID
export const getPropertyById = createAsyncThunk(
  'property/getPropertyById',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/properties/${id}`);
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get featured properties
export const getFeaturedProperties = createAsyncThunk(
  'property/getFeaturedProperties',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/api/properties/featured');
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get nearby properties
export const getNearbyProperties = createAsyncThunk(
  'property/getNearbyProperties',
  async ({ lat, lng, radius }, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `/api/properties/nearby?lat=${lat}&lng=${lng}&radius=${radius}`
      );
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create property
export const createProperty = createAsyncThunk(
  'property/createProperty',
  async (propertyData, thunkAPI) => {
    try {
      const { userInfo } = thunkAPI.getState().auth;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        '/api/properties',
        propertyData,
        config
      );
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update property
export const updateProperty = createAsyncThunk(
  'property/updateProperty',
  async ({ id, propertyData }, thunkAPI) => {
    try {
      const { userInfo } = thunkAPI.getState().auth;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/properties/${id}`,
        propertyData,
        config
      );
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete property
export const deleteProperty = createAsyncThunk(
  'property/deleteProperty',
  async (id, thunkAPI) => {
    try {
      const { userInfo } = thunkAPI.getState().auth;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`/api/properties/${id}`, config);
      return id;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user properties
export const getUserProperties = createAsyncThunk(
  'property/getUserProperties',
  async (_, thunkAPI) => {
    try {
      const { userInfo } = thunkAPI.getState().auth;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get('/api/properties/user', config);
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    resetProperty: (state) => {
      state.property = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all properties
      .addCase(getProperties.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.properties = action.payload.properties;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.totalProperties = action.payload.totalProperties;
      })
      .addCase(getProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get property by ID
      .addCase(getPropertyById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPropertyById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.property = action.payload;
      })
      .addCase(getPropertyById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get featured properties
      .addCase(getFeaturedProperties.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeaturedProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.featuredProperties = action.payload;
      })
      .addCase(getFeaturedProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get nearby properties
      .addCase(getNearbyProperties.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNearbyProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.nearbyProperties = action.payload;
      })
      .addCase(getNearbyProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create property
      .addCase(createProperty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.properties.unshift(action.payload);
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update property
      .addCase(updateProperty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.property = action.payload;
        state.properties = state.properties.map((property) =>
          property._id === action.payload._id ? action.payload : property
        );
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete property
      .addCase(deleteProperty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.properties = state.properties.filter(
          (property) => property._id !== action.payload
        );
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get user properties
      .addCase(getUserProperties.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.properties = action.payload;
      })
      .addCase(getUserProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetProperty } = propertySlice.actions;
export default propertySlice.reducer; 