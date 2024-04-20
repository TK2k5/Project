import { Drawer, IconButton, Typography } from '@material-tailwind/react';

import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { useGetOneCertificateQuery } from '~/store/services/certificate.service';

interface CertificateDetailProps {
  open: boolean;
  closeDrawer: () => void;
  id: number;
}

const CertificateDetail = ({
  open,
  closeDrawer,
  id,
}: CertificateDetailProps) => {
  const { data } = useGetOneCertificateQuery(id.toString());

  if (!data) return <div>Loading...</div>;

  return (
    <Drawer
      open={open}
      onClose={closeDrawer}
      className="p-4"
      placement="right"
      size={700}
    >
      <div className="w-full h-screen overflow-y-scroll pb-10">
        <div className="flex items-center justify-between mb-6">
          <Typography variant="h5" color="blue-gray">
            Xem chi tiết thông tin
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
        <div className="flex flex-col gap-4">
          <img
            className="h-96 w-full object-cover object-center"
            src={data && data?.images![0]}
            alt="nature image"
          />
          <h2 className="font-semibold text-xl">{data.title}</h2>

          <p className="text-sm truncate">
            <span className="font-semibold">Name Certificate:</span>
            <p className="truncate underline hover:text-primary">
              {data.title}
            </p>
          </p>
          {data.link && (
            <Link to={data.link} className="text-sm truncate" target="_blank">
              <span className="font-semibold">Link:</span>
              <p className="truncate underline hover:text-primary">
                {data.link}
              </p>
            </Link>
          )}
          <p className="">
            <span className="font-semibold">Description:</span>
            <span className="">{parse(data.desc)}</span>
          </p>
        </div>
      </div>
    </Drawer>
  );
};

export default CertificateDetail;
