import * as yup from 'yup';

import { Drawer, IconButton, Typography } from '@material-tailwind/react';
import { memberPosition, statusArray } from '../init';
import { useEffect, useState } from 'react';

import { IProjectForm } from '~/types/project.type';
import ReactQuill from 'react-quill';
import SelectV2 from '~/components/Forms/SelectGroup/select-v2';
import { uploadImage } from '../utils/upload-image';
import { useCreateProjectMutation } from '~/store/services/project.service';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormProjectProps {
  open: boolean;
  closeDrawer: () => void;
}

const schema = yup.object({
  title: yup.string().required('Title is required'),
  linkCode: yup.string().required('Link code is required'),
  linkDemo: yup.string().required('Link demo is required'),
  teamSize: yup
    .number()
    .typeError('Team size > 0')
    .required('Team size is required'),
  startDate: yup.string().required('Start date is required'),
  endDate: yup.string().required('End date is required'),
  fe: yup.string().required('Frontend is required'),
  be: yup.string().required('Backend is required'),
  db: yup.string().required('Database is required'),
  // desc: yup.string().required('Description is required'),
});

const FormProject = ({ closeDrawer, open }: FormProjectProps) => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // useEffect(() => {
  //   // register('desc', { required: true, minLength: 15 });
  // }, [register]);

  // const onEditorStateChange = (editorState: string) => {
  //   setValue('desc', editorState);
  // };

  // const editorContent = watch('desc');

  const [handleCreateProject] = useCreateProjectMutation();

  const [sortDesc, setSortDesc] = useState('');
  const [desc, setDesc] = useState('');
  const [images, setImages] = useState<string[]>([]);
  console.log('🚀 ~ FormProject ~ images:', images);

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const result = await uploadImage(files);
    if (result) setImages(result);
  };

  /* select status */
  const [option, setOption] = useState(statusArray[0]);

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setOption(value);
  };

  /* select position member */
  const [position, setPosition] = useState(memberPosition[0]);

  const handleChangePosition = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setPosition(value);
  };

  /* handle submit form */
  const onSubmit = async (data: any) => {
    const { fe, be, db, ...rest } = data;
    // convert string to array
    data.fe = fe.split(', ');
    data.be = be.split(', ');
    data.db = db.split(', ');
    const technology = {
      frontend: data.fe,
      backend: data.be,
      database: data.db,
    };
    const projectInfo = {
      ...rest,
      sortDesc,
      desc,
      images,
      technology,
    };
    await handleCreateProject(projectInfo).then(() => {
      reset();
      setSortDesc('');
      setDesc('');
      setImages([]);
      closeDrawer();
    });
  };

  return (
    <Drawer
      open={open}
      onClose={closeDrawer}
      className="p-4"
      placement="right"
      size={700}
    >
      <div className="flex items-center justify-between mb-6">
        <Typography variant="h5" color="blue-gray">
          Create Project
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
                Tên dự án
              </label>
              <input
                type="text"
                {...register('title')}
                placeholder="Nhận tên dự án"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Link code
              </label>
              <input
                type="text"
                {...register('linkCode')}
                placeholder="Nhập link github"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.linkCode && (
                <p className="text-red-500">{errors.linkCode.message}</p>
              )}
            </div>
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Link demo
              </label>
              <input
                type="text"
                {...register('linkDemo')}
                placeholder="Nhận Link demo"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.linkDemo && (
                <p className="text-red-500">{errors.linkDemo.message}</p>
              )}
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Số thành viên
              </label>
              <input
                type="number"
                {...register('teamSize')}
                placeholder="Nhập số thành viên"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.teamSize && (
                <p className="text-red-500">{errors.teamSize.message}</p>
              )}
            </div>
          </div>

          <div className="mb-4.5">
            <label className="block mb-3 text-black dark:text-white">
              Hình ảnh dự án
            </label>
            <input
              onChange={handleOnChange}
              type="file"
              multiple
              className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
            />
            {images.length === 0 && (
              <p className="text-red-500">This field is required</p>
            )}
          </div>
          {images.length > 0 && (
            <div className="flex items-center gap-4 flex-wrap">
              {images.map((image) => (
                <img
                  src={image}
                  alt=""
                  className="w-20 h-20 rounded-full object-cover"
                />
              ))}
            </div>
          )}

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Ngày bắt đầu
              </label>
              <input
                type="date"
                {...register('startDate')}
                placeholder="Nhận Ngày bắt đầu"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.startDate && (
                <p className="text-red-500">{errors.startDate.message}</p>
              )}
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Ngày kết thúc
              </label>
              <input
                type="date"
                {...register('endDate')}
                placeholder="Nhập Ngày kết thúc"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.endDate && (
                <p className="text-red-500">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Trạng thái dự án
              </label>
              <SelectV2
                options={statusArray}
                selectedOption={option}
                onChange={handleChangeStatus}
              />
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Vị trí
              </label>
              <SelectV2
                options={memberPosition}
                onChange={handleChangePosition}
                selectedOption={position}
              />
            </div>
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Công nghệ sử dụng fe
            </label>
            <input
              type="text"
              {...register('fe')}
              placeholder="Công nghệ sử dụng"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {errors.fe && <p className="text-red-500">{errors.fe.message}</p>}
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Công nghệ sử dụng be
            </label>
            <input
              type="text"
              {...register('be')}
              placeholder="Công nghệ sử dụng"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {errors.be && <p className="text-red-500">{errors.be.message}</p>}
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Database
            </label>
            <input
              type="text"
              {...register('db')}
              placeholder="Công nghệ sử dụng"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {errors.db && <p className="text-red-500">{errors.db.message}</p>}
          </div>

          <div className="mb-6">
            <label className="mb-2.5 block text-black dark:text-white">
              Miêu tả ngắn gọn dự án
            </label>
            <ReactQuill theme="snow" value={sortDesc} onChange={setSortDesc} />
            {sortDesc.trim().length === 0 && (
              <p className="text-red-500">This field is required</p>
            )}
          </div>

          <div className="mb-6">
            <label className="mb-2.5 block text-black dark:text-white">
              Miêu tả chi tiết dự án
            </label>
            <ReactQuill theme="snow" value={desc} onChange={setDesc} />
            {desc.trim().length === 0 && (
              <p className="text-red-500">This field is required</p>
            )}
          </div>

          <button className="flex justify-center w-full p-3 font-medium rounded bg-primary text-gray hover:bg-opacity-90">
            Send Message
          </button>
        </div>
      </form>
    </Drawer>
  );
};

export default FormProject;
