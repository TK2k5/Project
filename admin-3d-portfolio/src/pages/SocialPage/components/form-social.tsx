import * as yup from 'yup';

import { Drawer, IconButton, Typography } from '@material-tailwind/react';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
  useCreateSocialMutation,
  useGetOneSocialQuery,
  useUpdateSocialMutation,
} from '~/store/services/social.service';

import { ISocial } from '~/types/social.type';
import { RootState } from '~/store/store';
import { setSocialId } from '~/store/slice/social.slice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormSocialProps {
  open: boolean;
  closeDrawer: () => void;
}

const schema = yup.object({
  social: yup.string().required('Social is required'),
  link: yup.string().required('Link is required'),
});

const FormSocial = ({ closeDrawer, open }: FormSocialProps) => {
  const dispatch = useAppDispatch();
  const { idSocial } = useAppSelector((state: RootState) => state.social);

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [handleCreateSocial] = useCreateSocialMutation();
  const [handleUpdateSocial] = useUpdateSocialMutation();

  const { data: dataSocial } = useGetOneSocialQuery(
    idSocial ? idSocial.toString() : '0',
  );

  useEffect(() => {
    // reset form when close drawer
    if (!open) {
      reset();
    }
  }, [open, reset]);

  useEffect(() => {
    if (idSocial && dataSocial) {
      setValue('social', dataSocial.social);
      setValue('link', dataSocial.link || '');
    }
  }, [idSocial, dataSocial, setValue]);

  // hand submit form
  const onSubmit = async (data: any) => {
    const { fe, be, db, ...rest } = data;
    const socialInfo = {
      ...rest,
    } as ISocial;

    if (idSocial !== null && data) {
      await handleUpdateSocial({
        ...socialInfo,
        id: Number(idSocial),
      }).then(() => {
        reset();

        closeDrawer();
      });
      toast.success('Update social success');
    } else {
      await handleCreateSocial(socialInfo).then(() => {
        reset();

        closeDrawer();
      });
      toast.success('Create social success');
    }
    dispatch(setSocialId(null));
  };

  return (
    <Drawer
      open={open}
      onClose={() => {
        closeDrawer();
        dispatch(setSocialId(null));
      }}
      className="p-4"
      placement="right"
      size={700}
    >
      <div className="flex items-center justify-between mb-6">
        <Typography variant="h5" color="blue-gray">
          {idSocial !== null ? 'Update Social' : 'Create Social'}
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
                Social Name
              </label>
              <input
                type="text"
                {...register('social')}
                placeholder="Social Name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.social && (
                <p className="text-red-500">{errors.social.message}</p>
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

          <button className="flex justify-center w-full p-3 font-medium rounded bg-primary text-gray hover:bg-opacity-90">
            {idSocial !== null ? 'Update Social' : 'Create Social'}
          </button>
        </div>
      </form>
    </Drawer>
  );
};

export default FormSocial;
