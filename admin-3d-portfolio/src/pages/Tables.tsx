import Breadcrumb from '~/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '~/layout/DefaultLayout';
import TableOne from '~/components/Tables/TableOne';
import TableThree from '~/components/Tables/TableThree';
import TableTwo from '~/components/Tables/TableTwo';

const Tables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default Tables;
