import { Navigate, createBrowserRouter } from 'react-router-dom';

import Buttons from '~/pages/UiElements/Buttons';
import CertifacatePage from '~/pages/certificate/certifacate-page';
import Chart from '~/pages/Chart';
import ExperiencePage from '~/pages/experience-page/experience-page';
import FormElements from '~/pages/Form/FormElements';
import FormLayout from '~/pages/Form/FormLayout';
import NotFoundPage from '~/pages/NotFound';
import PageTitle from '~/components/PageTitle';
import ProjectPage from '~/pages/projects/project-page';
import Settings from '~/pages/Settings';
import SignIn from '~/pages/Authentication/SignIn';
import SignUp from '~/pages/Authentication/SignUp';
import SkillPage from '~/pages/SkillPage/SkillPage';
import SocialPage from '~/pages/SocialPage/SocialPage';
import Tables from '~/pages/Tables';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/ui/buttons" />,
  },
  {
    path: '/auth/signup',
    element: (
      <>
        <PageTitle title="TailAdmin - Tailwind CSS Admin Dashboard Template" />
        <SignUp />
      </>
    ),
  },
  {
    path: '/auth/signin',
    element: (
      <>
        <PageTitle title="TailAdmin - Tailwind CSS Admin Dashboard Template" />
        <SignIn />
      </>
    ),
  },
  {
    path: '/ui/buttons',
    element: (
      <>
        <PageTitle title="TailAdmin - Tailwind CSS Admin Dashboard Template" />
        <Buttons />
      </>
    ),
  },
  {
    path: '/chart',
    element: (
      <>
        <PageTitle title="TailAdmin - Tailwind CSS Admin Dashboard Template" />
        <Chart />
      </>
    ),
  },
  {
    path: '/settings',
    element: (
      <>
        <PageTitle title="TailAdmin - Tailwind CSS Admin Dashboard Template" />
        <Settings />
      </>
    ),
  },
  {
    path: '/tables',
    element: (
      <>
        <PageTitle title="TailAdmin - Tailwind CSS Admin Dashboard Template" />
        <Tables />
      </>
    ),
  },
  {
    path: '/form/form-layout',
    element: (
      <>
        <PageTitle title="TailAdmin - Tailwind CSS Admin Dashboard Template" />
        <FormLayout />
      </>
    ),
  },
  {
    path: '/forms/form-elements',
    element: (
      <>
        <PageTitle title="TailAdmin - Tailwind CSS Admin Dashboard Template" />
        <FormElements />
      </>
    ),
  },
  {
    path: '/skills',
    element: (
      <>
        <PageTitle title="Skill" />
        <SkillPage />
      </>
    ),
  },
  { path: '/projects', element: <ProjectPage /> },
  {
    path: '/experience',
    element: (
      <>
        <PageTitle title="Experience" />
        <ExperiencePage />
      </>
    ),
  },

  {
    path: '/certificate',
    element: (
      <>
        <PageTitle title="Certificate" />
        <CertifacatePage />
      </>
    ),
  },

  {
    path: '/social',
    element: (
      <>
        <PageTitle title="social" />
        <SocialPage />
      </>
    ),
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
