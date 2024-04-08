import { EditIcon, EyeIcon, TrashIcon } from '~/components/icons/icons';

import Breadcrumb from '~/components/Breadcrumbs/Breadcrumb';
import { Button } from '@material-tailwind/react';
import DefaultLayout from '~/layout/DefaultLayout';
import Loader from '~/common/Loader';
import { formatDate } from '~/utils/format-date';
import { motion } from 'framer-motion';
import { useGetExperiencesQuery } from '~/store/services/experience.service';
import { useState } from 'react';

const ExperiencePage = () => {
  const { data, isLoading, isError } = useGetExperiencesQuery();
  console.log('🚀 ~ ExperiencePage ~ data:', data);
  const [open, setOpen] = useState(false);

  if (isLoading) return <Loader />;
  if (isError) return <div>Error</div>;
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Experience" />

      <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex items-center justify-between">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Top Experience
          </h4>
          <Button className="text-white bg-primary">Add Experience</Button>
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

        {data &&
          data.length > 0 &&
          data.map((experience) => (
            <div
              className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5"
              key={experience.id}
            >
              <div className="flex items-center col-span-2">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <img
                    src={experience?.image}
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
                  >
                    <EyeIcon />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="hover:text-primary"
                  >
                    <TrashIcon />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="hover:text-primary"
                  >
                    <EditIcon />
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </DefaultLayout>
  );
};

export default ExperiencePage;
