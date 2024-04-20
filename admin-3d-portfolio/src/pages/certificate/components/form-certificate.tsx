import * as yup from 'yup';

import { Drawer, IconButton, Typography } from '@material-tailwind/react';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
  useCreateCertificateMutation,
  useGetOneCertificateQuery,
  useUpdateCertificateMutation,
} from '~/store/services/certificate.service';
import { useEffect, useState } from 'react';

import { ICertificate } from '~/types/certificate';
import ReactQuill from 'react-quill';
import { RootState } from '~/store/store';
import { setCertificateId } from '~/store/slice/certificate.slice';
import { toast } from 'react-toastify';
import { uploadImage } from '../utils/upload-image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormCertificateProps {
  open: boolean;
  closeDrawer: () => void;
}

const schema = yup.object({
  title: yup.string().required('Title is required'),
  link: yup.string().required('Link is required'),
});

const FormCertificate = ({ closeDrawer, open }: FormCertificateProps) => {
  const dispatch = useAppDispatch();
  const { idCertificate } = useAppSelector(
    (state: RootState) => state.certificate,
  );

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [handleCreateCertificate] = useCreateCertificateMutation();
  const [handleUpdateCertificate] = useUpdateCertificateMutation();

  const [desc, setDesc] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const result = await uploadImage(files);
    setImages(result!);
  };

  const { data: dataCertificate } = useGetOneCertificateQuery(
    idCertificate ? idCertificate.toString() : '0',
  );

  useEffect(() => {
    // reset form when close drawer
    if (!open) {
      reset();
      setDesc('');
      setImages([]);
    }
  }, [open, reset]);

  useEffect(() => {
    if (idCertificate && dataCertificate) {
      setValue('title', dataCertificate.title);
      setValue('link', dataCertificate.link || '');
      setDesc(dataCertificate.desc || '');
      setImages(dataCertificate.images || []);
    }
  }, [idCertificate, dataCertificate, setValue]);

  // hand submit form
  const onSubmit = async (data: any) => {
    const { fe, be, db, ...rest } = data;
    const certificateInfo = {
      ...rest,
      desc,
      images,
    } as ICertificate;

    if (idCertificate !== null && data) {
      const newImages =
        dataCertificate?.images !== images ? images : dataCertificate?.images;
      // let newImages;
      // if (dataProject?.images !== images) {
      //   newImages = images;
      // } else {
      //   newImages = dataProject?.images;
      // }
      await handleUpdateCertificate({
        ...certificateInfo,
        id: idCertificate,
        images: newImages,
      }).then(() => {
        reset();
        setDesc('');
        setImages([]);
        closeDrawer();
      });
      toast.success('Update certificate success');
    } else {
      await handleCreateCertificate(certificateInfo).then(() => {
        reset();
        setDesc('');
        setImages([]);
        closeDrawer();
      });
      toast.success('Create certificate success');
    }
    dispatch(setCertificateId(null));
  };

  return (
    <Drawer
      open={open}
      onClose={() => {
        closeDrawer();
        dispatch(setCertificateId(null));
      }}
      className="p-4"
      placement="right"
      size={700}
    >
      <div className="flex items-center justify-between mb-6">
        <Typography variant="h5" color="blue-gray">
          {idCertificate !== null ? 'Update Certificate' : 'Create Certificate'}
        </Typography>
        <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>

      <form
        action="#"
        className="h-full pb-10 overflow-y-scroll"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Certificate Name
              </label>
              <input
                type="text"
                {...register('title')}
                placeholder="Certificate Name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Link
              </label>
              <input
                type="text"
                {...register('link')}
                placeholder="Link"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.link && (
                <p className="text-red-500">{errors.link.message}</p>
              )}
            </div>
          </div>

          <label className="block mb-3 text-black dark:text-white">
            {idCertificate !== null && 'Giữ lại hình ảnh cũ'}
          </label>

          {images.length > 0 && (
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              {images.map((image, _) => (
                <img
                  src={image}
                  alt="image"
                  className="w-[140px] h-[140px] object-cover rounded-full border shadow"
                />
              ))}
            </div>
          )}

          <div className="mb-4.5">
            <label className="block mb-3 text-black dark:text-white">
              {idCertificate !== null
                ? 'Hoặc thay hình ảnh mới'
                : 'Hình ảnh dự án'}
            </label>
            <input
              onChange={(e) => handleUploadImage(e)}
              type="file"
              multiple
              className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
            />
            {images.length === 0 && (
              <p className="text-red-500">This field is required</p>
            )}
          </div>

          <div className="mb-6">
            <label className="mb-2.5 block text-black dark:text-white">
              Miêu tả chi tiết dự án
            </label>
            <ReactQuill theme="snow" value={desc} onChange={setDesc} />
            {desc.trim().length === 0 && (
              <p className="text-red-500">This field is required</p>
            )}
          </div>

          <button className="flex justify-center w-full p-3 font-medium rounded bg-primary text-gray hover:bg-opacity-90">
            {idCertificate !== null
              ? 'Update Certificate'
              : 'Create Certificate'}
          </button>
        </div>
      </form>
    </Drawer>
  );
};

export default FormCertificate;
