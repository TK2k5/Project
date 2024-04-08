import { EditIcon, EyeIcon, TrashIcon } from '~/components/icons/icons';
import {
  useDeleteExperienceMutation,
  useGetAllExperienceQuery,
} from '~/store/services/experience.service';
import { useEffect, useState } from 'react';

import Breadcrumb from '~/components/Breadcrumbs/Breadcrumb';
import { Button } from '@material-tailwind/react';
import DefaultLayout from '~/layout/DefaultLayout';
import ExperienceDetail from './components/experience-detail';
import FormExperience from './components/form-experience';
import { IExperience } from '~/types/experience.type';
import Loader from '~/common/Loader';
import Swal from 'sweetalert2';
import { formatDate } from '~/utils/format-date';
import { motion } from 'framer-motion';
import { setExperienceId } from '~/store/slice/experience.slice';
import { useAppDispatch } from '~/store/hooks';

const ExperiencePage = () => {
  const { data, isLoading, isError } = useGetAllExperienceQuery();
  const dispatch = useAppDispatch();
  const [handleDeleteExperience] = useDeleteExperienceMutation();

  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [idExperience, setIdExperience] = useState<number>(0);
  const [open, setOpen] = useState({
    detail: false,
    form: false,
  });

  useEffect(() => {
    if (!data) return;
    setExperiences(data);
  }, [data]);
  if (!data) return <div>Loading...</div>;

  // handle delete project
  const handleDelete = async (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleDeleteExperience(id);
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    });
  };

  if (isLoading) return <Loader />;
  if (isError) return <div>Error</div>;
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Experience" />

        <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="py-6 px-4 md:px-6 xl:px-7.5 flex items-center justify-between">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Top Experience
            </h4>
            <Button
              className="text-white bg-primary"
              onClick={() => setOpen({ ...open, form: !open.form })}
            >
              Add Experience
            </Button>
          </div>

          <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5">
            <div className="flex items-center col-span-2">
              <p className="font-medium">Name</p>
            </div>
            <div className="items-center hidden col-span-2 sm:flex">
              <p className="font-medium">Company</p>
            </div>
            <div className="flex items-center col-span-2 justify-center">
              <p className="font-medium">Actions</p>
            </div>
          </div>

          {experiences &&
            experiences.length > 0 &&
            experiences.map((experience) => (
              <div
                className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5"
                key={experience.id}
              >
                <div className="flex items-center col-span-2">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <img
                      src={experience?.images && experience.images[0]}
                      className="h-[120px] w-[120px] rounded-lg"
                      alt=""
                    />
                    <div className="flex flex-col flex-1">
                      <p className="text-sm text-black dark:text-white truncate w-[400px] hover:underline">
                        <span className="text-lg font-medium">
                          {experience.title}
                        </span>
                      </p>
                      <p className="">
                        <span className="text-sm">
                          {formatDate(experience.startDate)}
                        </span>
                        {' - '}
                        <span className="text-sm">
                          {formatDate(experience.endDate)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center col-span-2">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <p className="text-sm text-black dark:text-white truncate  w-[400px]">
                      {experience.company}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center col-span-2">
                  <div className="flex items-center space-x-3.5">
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="hover:text-primary"
                      onClick={() => {
                        setOpen({ ...open, detail: !open.detail });
                        setIdExperience(experience.id);
                      }}
                    >
                      <EyeIcon />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="hover:text-primary"
                      onClick={() => handleDelete(experience.id)}
                    >
                      <TrashIcon />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="hover:text-primary"
                      onClick={() => {
                        setOpen({ ...open, form: !open.form });
                        dispatch(setExperienceId(experience.id));
                      }}
                    >
                      <EditIcon />
                    </motion.button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </DefaultLayout>

      <ExperienceDetail
        id={idExperience}
        open={open.detail}
        closeDrawer={() => setOpen({ ...open, detail: !open.detail })}
      />

      <FormExperience
        open={open.form}
        closeDrawer={() =>
          setOpen({
            ...open,
            form: !open.form,
          })
        }
      />
    </>
  );
};

export default ExperiencePage;
