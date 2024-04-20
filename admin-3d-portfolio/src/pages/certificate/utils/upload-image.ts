import axios from 'axios';

const PRESET_NAME = 'Marathon';
const CLOUD_NAME = 'dkpmaaqcj';
const FOLDER_NAME = 'Marathon';
const UPLOAD_IMAGE = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export const uploadImage = async (
  files: FileList | null,
): Promise<string[] | undefined> => {
  if (files) {
    const urls = [];
    const formData = new FormData(); // tạo ra 1 đối tượng form data
    formData.append('upload_preset', PRESET_NAME);
    formData.append('folder', FOLDER_NAME);

    for (const file of files) {
      formData.append('file', file);
      const response = await axios.post(UPLOAD_IMAGE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      urls.push(response.data.url);
    }
    return urls;
  }
};
