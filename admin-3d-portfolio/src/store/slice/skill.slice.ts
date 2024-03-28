import { createSlice } from '@reduxjs/toolkit';

interface SkillState {
  idSkill: string | null;
}

const initialState: SkillState = {
  idSkill: null,
};

export const skillSlice = createSlice({
  name: 'skill',
  initialState,
  reducers: {
    setSkillId: (state, action) => {
      state.idSkill = action.payload;
    },
  },
});

export const { setSkillId } = skillSlice.actions;
const skillReducer = skillSlice.reducer;
export default skillReducer;
