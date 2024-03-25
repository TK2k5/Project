import Loader from './common/Loader';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes/routes';

function App() {
  return <RouterProvider fallbackElement={<Loader />} router={routes} />;
}

export default App;
