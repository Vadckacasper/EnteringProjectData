import { FormEditProject } from "./components/FormEditProject/FormEditProject";
import { FormCreateProject } from "./components/FormCreateProject/FormCreateProject";
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
];

export default AppRoutes;
