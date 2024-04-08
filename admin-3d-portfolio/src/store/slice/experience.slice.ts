import { createSlice } from '@reduxjs/toolkit';

interface ExperienceDetailProps {
  idExperience: number | null;
}

const initialData: ExperienceDetailProps = {
  idExperience: null,
};

const experienceSlice = createSlice({
  name: 'experience',
  initialState: initialData,
  reducers: {
    setExperienceId: (state, action) => {
      state.idExperience = action.payload;
    },
  },
});

export const { setExperienceId } = experienceSlice.actions;

const experienceReducer = experienceSlice.reducer;
export default experienceReducer;
