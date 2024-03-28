import { EditIcon, EyeIcon, TrashIcon } from '~/components/icons/icons';
import {
  useDeleteSocialMutation,
  useGetAllSocialsQuery,
} from '~/store/services/social.service';

import Breadcrumb from '~/components/Breadcrumbs/Breadcrumb';
import { Button } from '@material-tailwind/react';
import DefaultLayout from '~/layout/DefaultLayout';
import DrawerSocial from './components/DrawerSocial';
import Loader from '~/common/Loader';
import { motion } from 'framer-motion';
import { setSocialId } from '~/store/slice/social.slice';
import { useAppDispatch } from '~/store/hooks';
import { useState } from 'react';

const SocialPage = () => {
  const [handleDeleteSocial] = useDeleteSocialMutation();
  const { data, isLoading, isError } = useGetAllSocialsQuery();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  if (isLoading) return <Loader />;
  if (isError) return <div>Error</div>;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Socials" />
      <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex items-center justify-between">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Top Socials
          </h4>
          <Button
            className="text-white bg-primary"
            onClick={() => setOpen(!open)}
          >
            Add Social
          </Button>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5">
          <div className="flex items-center col-span-2">
            <p className="font-medium">Social Name</p>
          </div>
          <div className="items-center hidden col-span-3 sm:flex">
            <p className="font-medium">Link</p>
          </div>
          <div className="flex items-center col-span-1">
            <p className="font-medium">Actions</p>
          </div>
        </div>

        {data &&
          data.length > 0 &&
          data.map((social) => (
            <div
              className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5"
              key={social.id}
            >
              <div className="flex items-center col-span-2">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <p className="text-sm text-black dark:text-white truncate  w-[400px]">
                    {social.social}
                  </p>
                </div>
              </div>
              <div className="items-center hidden col-span-3 sm:flex">
                <a
                  href={social.link}
                  className="text-sm text-black truncate dark:text-white w-[400px]"
                >
                  {social.link}
                </a>
              </div>
              <div className="flex items-center col-span-1">
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
                    onClick={() => handleDeleteSocial(social.id.toString())}
                  >
                    <TrashIcon />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="hover:text-primary"
                    onClick={() => {
                      setOpen(!open),
                        dispatch(setSocialId(social.id.toString()));
                    }}
                  >
                    <EditIcon />
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
      </div>

      <DrawerSocial open={open} closeDrawer={() => setOpen(!open)} />
    </DefaultLayout>
  );
};

export default SocialPage;
