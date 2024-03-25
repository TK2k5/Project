import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useGetOneSkillQuery,
  useUpdateSkillMutation,
} from '~/store/services/skill.service';

import { Button } from '@material-tailwind/react';
import DefaultLayout from '~/layout/DefaultLayout';
import { ISkill } from '~/types/skill.type';
import { useForm } from 'react-hook-form';

const EditSkill = () => {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<ISkill>();
  const { id } = useParams(); // Đảm bảo rằng id được định dạng đúng
  const [updateSkillMutation] = useUpdateSkillMutation(); // Corrected the function name

  const onSubmit = handleSubmit((data) => {
    const { title, desc } = data;
    updateSkillMutation({ id: Number(id), title, desc }); // Convert id to a number
    navigate('/skills');
  });

  const { data: skill, isLoading, isError } = useGetOneSkillQuery(String(id));

  if (isLoading) return <div>Loading...</div>;
  if (!skill) return <div>No product found</div>;
  if (isError) return <div>Error</div>;
  return (
    <DefaultLayout>
      <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Edit skill</h3>
        </div>
        <form action="#" onSubmit={onSubmit}>
          <div className="mx-2 my-2">
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Skill Name
              </label>
              <input
                defaultValue={skill.title}
                {...register('title')}
                type="text"
                placeholder="Select skill"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Description
              </label>
              <textarea
                defaultValue={skill.desc}
                {...register('desc')}
                rows={6}
                placeholder="Type your description"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>

            <button className="flex justify-center w-full p-3 font-medium rounded bg-primary text-gray hover:bg-opacity-90">
              Edit skill
            </button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default EditSkill;
