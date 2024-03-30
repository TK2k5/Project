import * as yup from 'yup';

import { Drawer, Typography } from '@material-tailwind/react';
import {
  useAddSkillMutation,
  useGetOneSkillQuery,
  useUpdateSkillMutation,
} from '~/store/services/skill.service';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

import { RootState } from '~/store/store';
import { setSkillId } from '~/store/slice/skill.slice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface DrawerSkillProps {
  open: boolean;
  closeDrawer: () => void;
}

const schema = yup.object({
  title: yup.string().required('Skill name is required'),
  desc: yup.string().required('Desc is required'),
});

const DrawerSkill = ({ open, closeDrawer }: DrawerSkillProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { idSkill } = useAppSelector((state: RootState) => state.skill);
  const dispatch = useAppDispatch();

  const { data } = useGetOneSkillQuery(idSkill || '');
  console.log('🚀 ~ DrawerSkill ~ data:', data);

  const [handleAddSkill] = useAddSkillMutation();
  const [handleUpdateSkill] = useUpdateSkillMutation();

  const onSubmit = (data: { title: string; desc: string }) => {
    if (idSkill) {
      handleUpdateSkill({ ...data, id: Number(idSkill) });
      toast.success('Skill updated successfully');
      dispatch(setSkillId(null));
    } else {
      handleAddSkill(data);
      toast.success('Skill added successfully');
      dispatch(setSkillId(null));
    }
    closeDrawer();
  };

  useEffect(() => {
    if (idSkill && !Array.isArray(data) && data) {
      console.log('first');
      setValue('title', data.title);
      setValue('desc', data.desc);
    } else {
      setValue('title', '');
      setValue('desc', '');
    }
  }, [data, idSkill, setValue]);

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
          Add Skill
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
              Skill Name
            </label>
            <input
              type="text"
              placeholder="Skill name"
              {...register('title')}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="mb-2.5 block text-black dark:text-white">
              Desc
            </label>
            <textarea
              rows={6}
              {...register('desc')}
              placeholder="Type your Desc"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            ></textarea>
            {errors.desc && (
              <p className="text-sm text-red-500">{errors.desc.message}</p>
            )}
          </div>
        </div>

        <button className="flex mt-auto mb-10 justify-center w-full p-3 font-medium rounded bg-primary text-gray hover:bg-opacity-90">
          Send Message
        </button>
      </form>
    </Drawer>
  );
};

const useGetOneSkill = (id: string | null) => {
  if (!id) return null;

  const { data } = useGetOneSkillQuery(id);

  return data;
};

export default DrawerSkill;
