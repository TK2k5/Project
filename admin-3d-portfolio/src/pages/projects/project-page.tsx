import { EditIcon, EyeIcon, TrashIcon } from '~/components/icons/icons';
import {
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
} from '~/store/services/project.service';
import { useEffect, useState } from 'react';

import Breadcrumb from '~/components/Breadcrumbs/Breadcrumb';
import { Button } from '@material-tailwind/react';
import DefaultLayout from '~/layout/DefaultLayout';
import FormProject from './components/form-project';
import { IProject } from '~/types/project.type';
import { Link } from 'react-router-dom';
import ProjectDetail from './components/project-detail';
import Swal from 'sweetalert2';
import { formatDate } from '~/utils/format-date';
import { motion } from 'framer-motion';

const ProjectPage = () => {
  const { data } = useGetAllProjectsQuery();
  const [handleDeleteProject] = useDeleteProjectMutation();

  const [projects, setProjects] = useState<IProject[]>([]);
  const [idProject, setIdProject] = useState<number>(0);
  const [open, setOpen] = useState({
    detail: false,
    form: false,
  });

  useEffect(() => {
    if (!data) return;
    setProjects(data);
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
        await handleDeleteProject(id);
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    });
  };

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
            <div className="flex items-center col-span-3">
              <p className="font-medium">Project Name</p>
            </div>
            <div className="items-center hidden col-span-2 sm:flex">
              <p className="font-medium">Techonology</p>
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
                <div className="flex items-center col-span-3">
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
                      <Link
                        to={project.linkDemo as string}
                        className="text-sm text-black dark:text-white truncate w-[400px] hover:underline"
                      >
                        <span className="text-lg font-medium">
                          {project.title}
                        </span>
                      </Link>
                      <p className="">
                        <span className="text-sm">
                          {formatDate(project.startDate as string)}
                        </span>
                        {' - '}
                        <span className="text-sm">
                          {formatDate(project.endDate!)}
                        </span>
                      </p>
                      <p className="text-sm truncate w-[300px]">
                        <span className="font-semibold">Link code:</span>
                        <Link
                          className="truncate underline hover:text-primary w-[300px"
                          to={project.linkCode!}
                          target="_blank"
                        >
                          {project.linkCode}
                        </Link>
                      </p>
                      {project.linkDemo && (
                        <p className="text-sm truncate w-[300px]">
                          <span className="font-semibold">Link demo:</span>
                          <Link
                            className="truncate underline hover:text-primary w-[300px"
                            to={project.linkCode!}
                            target="_blank"
                          >
                            {project.linkDemo}
                          </Link>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className=" hidden col-span-2 sm:flex flex-col justify-center">
                  <p
                    title={project.techonology.frontend?.join(', ')}
                    className="text-sm text-black truncate dark:text-white w-[300px]"
                  >
                    <span className="font-semibold text-black">
                      Front end:{' '}
                    </span>
                    <span className="capitalize">
                      {project.techonology.frontend?.join(', ')}
                    </span>
                  </p>
                  <p
                    title={project.techonology.backend?.join(', ')}
                    className="text-sm text-black truncate dark:text-white w-[300px]"
                  >
                    <span className="font-semibold text-black">Back end: </span>
                    <span className="capitalize">
                      {project.techonology.backend?.join(', ')}
                    </span>
                  </p>
                  <p
                    title={project.techonology.database?.join(', ')}
                    className="text-sm text-black truncate dark:text-white w-[300px]"
                  >
                    <span className="font-semibold text-black">Devops: </span>
                    <span className="capitalize">
                      {project.techonology.database?.join(', ')}
                    </span>
                  </p>
                </div>
                <div className="flex items-center col-span-1">
                  <div className="flex items-center space-x-3.5">
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="hover:text-primary"
                      onClick={() => {
                        setOpen({ ...open, detail: !open.detail });
                        setIdProject(project.id);
                      }}
                    >
                      <EyeIcon />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="hover:text-primary"
                      onClick={() => handleDelete(project.id)}
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
        id={idProject}
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
