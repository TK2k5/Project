import { EditIcon, EyeIcon, TrashIcon } from '~/components/icons/icons';
import {
  useDeleteSocialMutation,
  useGetAllSocialQuery,
} from '~/store/services/social.service';
import { useEffect, useState } from 'react';

import Breadcrumb from '~/components/Breadcrumbs/Breadcrumb';
import { Button } from '@material-tailwind/react';
import DefaultLayout from '~/layout/DefaultLayout';
import FormSocial from './components/form-social';
import { ISocial } from '~/types/social.type';
import { Link } from 'react-router-dom';
import Loader from '~/common/Loader';
import SocialDetail from './components/social-detail';
import Swal from 'sweetalert2';
import clsxm from '~/utils/clsxm';
import { motion } from 'framer-motion';
import { setSocialId } from '~/store/slice/social.slice';
import { useAppDispatch } from '~/store/hooks';

const SocialPage = () => {
  const { data, isLoading, isError } = useGetAllSocialQuery();
  const dispatch = useAppDispatch();
  const [handleDeleteSocial] = useDeleteSocialMutation();

  const [socials, setSocials] = useState<ISocial[]>([]);
  const [idSocial, setIdSocial] = useState<number>(0);
  const [open, setOpen] = useState({
    detail: false,
    form: false,
  });

  const ursersPerPage = 2;
  // trang hiện tại
  const [currentPage, setCurrentPage] = useState<number>(1);
  // lấy ra index của users cuối cùng trên trang hiện tại
  const indexOfLastUser = currentPage * ursersPerPage;
  // lấy ra index của users đầu tiên trên trang hiện tại
  const indexOfFirstUser = indexOfLastUser - ursersPerPage;
  // lấy ra users hiện tại
  const currentUsers = socials.slice(indexOfFirstUser, indexOfLastUser);

  // total page
  const totalPage = Math.ceil(socials.length / ursersPerPage);

  useEffect(() => {
    if (!data) return;
    setSocials(data);
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
        await handleDeleteSocial(id);
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
        <Breadcrumb pageName="Social" />

        <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="py-6 px-4 md:px-6 xl:px-7.5 flex items-center justify-between">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Top Social
            </h4>
            <Button
              className="text-white bg-primary"
              onClick={() => setOpen({ ...open, form: !open.form })}
            >
              Add Social
            </Button>
          </div>

          <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5">
            <div className="flex items-center col-span-2">
              <p className="font-medium">Name</p>
            </div>
            <div className="items-center hidden col-span-2 sm:flex">
              <p className="font-medium">Link</p>
            </div>
            <div className="flex items-center col-span-2 justify-center">
              <p className="font-medium">Actions</p>
            </div>
          </div>

          {currentUsers &&
            currentUsers.length > 0 &&
            currentUsers.map((social) => (
              <div
                className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5"
                key={social.id}
              >
                <div className="flex items-center col-span-2">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex flex-col flex-1">
                      <p className="text-sm text-black dark:text-white truncate w-[400px] hover:underline">
                        <span className="text-lg font-medium">
                          {social.social}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center col-span-2">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <Link
                      to={social.link}
                      className="text-sm text-black dark:text-white truncate w-[400px]"
                      target="_blank"
                    >
                      {social.link}
                    </Link>
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
                        setIdSocial(social.id);
                      }}
                    >
                      <EyeIcon />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="hover:text-primary"
                      onClick={() => handleDelete(social.id)}
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
                        dispatch(setSocialId(social.id));
                      }}
                    >
                      <EditIcon />
                    </motion.button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="flex items-center justify-center mt-5">
          {Array.from({ length: totalPage }).map((_, index) => (
            <Button
              className={clsxm('py-2.5 px-5 mx-2 w-fit text-black ', {
                'bg-gray-l10 text-black': index + 1 === currentPage,
              })}
              key={index}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </DefaultLayout>

      <SocialDetail
        id={idSocial}
        open={open.detail}
        closeDrawer={() => setOpen({ ...open, detail: !open.detail })}
      />

      <FormSocial
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

export default SocialPage;
