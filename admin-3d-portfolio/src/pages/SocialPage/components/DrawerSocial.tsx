import * as yup from 'yup';

import { Drawer, Typography } from '@material-tailwind/react';
import {
  useAddSocialMutation,
  useGetOneSocialQuery,
  useUpdateSocialMutation,
} from '~/store/services/social.service';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

import { RootState } from '~/store/store';
import { setSocialId } from '~/store/slice/social.slice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface DrawerSocialProps {
  open: boolean;
  closeDrawer: () => void;
}

const schema = yup.object({
  social: yup.string().required('Social name is required'),
  link: yup.string().required('Link is required'),
});

const DrawerSocial = ({ open, closeDrawer }: DrawerSocialProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { idSocial } = useAppSelector((state: RootState) => state.social);
  const dispatch = useAppDispatch();

  const { data } = useGetOneSocialQuery(idSocial || '');
  console.log('🚀 ~ DrawerSocial ~ data:', data);

  const [handleAddSocial] = useAddSocialMutation();
  const [handleUpdateSocial] = useUpdateSocialMutation();

  const onSubmit = (data: { social: string; link: string }) => {
    if (idSocial) {
      handleUpdateSocial({ ...data, id: Number(idSocial) });
      toast.success('Social updated successfully');
      dispatch(setSocialId(null));
    } else {
      handleAddSocial(data);
      toast.success('Social added successfully');
      dispatch(setSocialId(null));
    }
    closeDrawer();
  };

  useEffect(() => {
    if (idSocial && !Array.isArray(data) && data) {
      console.log('first');
      setValue('social', data.social);
      setValue('link', data.link);
    } else {
      setValue('social', '');
      setValue('link', '');
    }
  }, [data, idSocial, setValue]);

  return (
    <Drawer
      placement="right"
      size={400}
      open={open}
      onClose={closeDrawer}
      className="p-4"
    >
      <div className="flex items-center justify-between mb-6">
        <Typography variant="h5" color="blue-gray">
          {idSocial ? 'Edit Social' : 'Add Social'}{' '}
        </Typography>
        <button onClick={closeDrawer}>
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
        </button>
      </div>

      <form
        action="#"
        className="flex flex-col h-full w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Social Name
            </label>
            <input
              type="text"
              placeholder="Social name"
              {...register('social')}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {errors.social && (
              <p className="text-sm text-red-500">{errors.social.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="mb-2.5 block text-black dark:text-white">
              Link
            </label>
            <textarea
              rows={6}
              {...register('link')}
              placeholder="Type your Link"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            ></textarea>
            {errors.link && (
              <p className="text-sm text-red-500">{errors.link.message}</p>
            )}
          </div>
        </div>

        <button className="flex mt-auto mb-10 justify-center w-full p-3 font-medium rounded bg-primary text-gray hover:bg-opacity-90">
          {idSocial ? 'Edit Social' : 'Add Social'}
        </button>
      </form>
    </Drawer>
  );
};

const useGetOneSocial = (id: string | null) => {
  if (!id) return null;

  const { data } = useGetOneSocialQuery(id);

  return data;
};

export default DrawerSocial;
