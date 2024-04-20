import { createSlice } from '@reduxjs/toolkit';

interface CertificateDetailProps {
  idCertificate: number | null;
}

const initialData: CertificateDetailProps = {
  idCertificate: null,
};

const certificateSlice = createSlice({
  name: 'certificate',
  initialState: initialData,
  reducers: {
    setCertificateId: (state, action) => {
      state.idCertificate = action.payload;
    },
  },
});

export const { setCertificateId } = certificateSlice.actions;

const certificateReducer = certificateSlice.reducer;
export default certificateReducer;
