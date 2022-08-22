import { FormEditProject } from "./components/FormEditProject/FormEditProject";
import { FormCreateProject } from "./components/FormCreateProject/FormCreateProject";
import { PageEmployees } from "./components/PageEmployees/PageEmployees";
import { Home } from "./components/Home/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/project/:id',
    element: <FormEditProject />
  },
  {
    path: '/project/create',
    element: <FormCreateProject />
  },
  {
    path: '/employees',
    element: <PageEmployees />
  },
];

export default AppRoutes;
