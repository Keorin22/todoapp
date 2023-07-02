import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthData, StateAuth, FormValues } from './types';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async ({ email, password }: { email: string, password:string })  => {
  const { data } = await axios.post('http://localhost:4444/auth/login', { email, password });
  console.log(data)
  return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params: any) => {
  const { data } = await axios.post('/auth/register', params);
  return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/auth/me');
  return data;
});

const initialState: StateAuth = {
  auth: {
    data: null,
    status: 'loading',
  },
  isAuth: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.auth.data = null;
    },
    isAuth: (state) => {
        if(state.auth.data !== null)
        state.isAuth = true
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.auth.status = 'loading';
        state.auth.data = null;
        console.log('pending')
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.auth.status = 'loaded';
        console.log(state)
        state.auth.data = action.payload.token;
        if(state.auth.data !== null)
        state.isAuth = true
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.auth.status = 'error';
        state.auth.data = null;
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.auth.status = 'loading';
        state.auth.data = null;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action: PayloadAction<AuthData>) => {
        state.auth.status = 'loaded';
        state.auth.data = action.payload;
        if(state.auth.data !== null)
        state.isAuth = true
      
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.auth.status = 'error';
        state.auth.data = null;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.auth.status = 'loading';
        state.auth.data = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action: PayloadAction<AuthData>) => {
        state.auth.status = 'loaded';
        state.auth.data = action.payload;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.auth.status = 'error';
        state.auth.data = null;
      });
  },
});

// export const selectIsAuth = (state: StateAuth): boolean => {
//     return state.auth.data !== null;
//   };
  

export const { reducer: authReducer }= authSlice;

export const { logout } = authSlice.actions;