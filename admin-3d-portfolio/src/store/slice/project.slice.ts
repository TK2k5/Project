import { createSlice } from '@reduxjs/toolkit';

interface ProjectDetailProps {
  idProject: number | null;
}

const initialData: ProjectDetailProps = {
  idProject: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState: initialData,
  reducers: {
    setProjectId: (state, action) => {
      state.idProject = action.payload;
    },
  },
});

export const { setProjectId } = projectSlice.actions;

const projectReducer = projectSlice.reducer;
export default projectReducer;
