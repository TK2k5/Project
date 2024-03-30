import { EditIcon, EyeIcon, TrashIcon } from '~/components/icons/icons';
import { useEffect, useState } from 'react';

import Breadcrumb from '~/components/Breadcrumbs/Breadcrumb';
import { Button } from '@material-tailwind/react';
import DefaultLayout from '~/layout/DefaultLayout';
import FormProject from './components/form-project';
import { IProject } from '~/types/project.type';
import ProjectDetail from './components/project-detail';
import { motion } from 'framer-motion';
import { useGetAllProjectsQuery } from '~/store/services/project.service';

const ProjectPage = () => {
  const { data } = useGetAllProjectsQuery();

  const [projects, setProjects] = useState<IProject[]>([]);
  const [open, setOpen] = useState({
    detail: false,
    form: false,
  });

  useEffect(() => {
    if (!data) return;
    setProjects(data.items);
  }, [data]);
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Projects" />
        <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="py-6 px-4 md:px-6 xl:px-7.5 flex items-center justify-between">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Top Projects
            </h4>
            <Button
              className="text-white bg-primary"
              onClick={() => setOpen({ ...open, form: !open.form })}
            >
              Add Project
            </Button>
          </div>

          <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5">
            <div className="flex items-center col-span-2">
              <p className="font-medium">Project Name</p>
            </div>
            <div className="items-center hidden col-span-3 sm:flex">
              <p className="font-medium">Desc</p>
            </div>
            <div className="flex items-center col-span-1">
              <p className="font-medium">Actions</p>
            </div>
          </div>

          {projects &&
            projects.length > 0 &&
            projects.map((project) => (
              <div
                className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5"
                key={project.id}
              >
                <div className="flex items-center col-span-2">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <img
                      src={project?.images && project.images[0]}
                      className="h-[120px] w-[120px] rounded-lg"
                      alt=""
                    />
                    <div className="flex flex-col flex-1">
                      <span className="px-3 py-[0.5] text-white rounded-md bg-primary w-fit">
                        Leader
                      </span>
                      <p className="text-sm text-black dark:text-white truncate w-[400px]">
                        <span className="text-lg font-medium">
                          {project.title}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="items-center hidden col-span-3 sm:flex">
                  <p className="text-sm text-black truncate dark:text-white w-[400px]">
                    {project.desc}
                  </p>
                </div>
                <div className="flex items-center col-span-1">
                  <div className="flex items-center space-x-3.5">
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="hover:text-primary"
                      onClick={() => setOpen({ ...open, detail: !open.detail })}
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
                      onClick={() => {
                        setOpen({ ...open, form: !open.form });
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

      <ProjectDetail
        open={open.detail}
        closeDrawer={() => setOpen({ ...open, detail: !open.detail })}
      />
      <FormProject
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

export default ProjectPage;
