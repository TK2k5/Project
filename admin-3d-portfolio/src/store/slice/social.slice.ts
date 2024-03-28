import { createSlice } from '@reduxjs/toolkit';

interface SocialState {
  idSocial: string | null;
}

const initialState: SocialState = {
  idSocial: null,
};

export const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {
    setSocialId: (state, action) => {
      state.idSocial = action.payload;
    },
  },
});

export const { setSocialId } = socialSlice.actions;
const socialReducer = socialSlice.reducer;
export default socialReducer;
