import { PageProject } from "./components/PageProject/PageProject";
import { Home } from "./components/Home/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/project/:id',
    element: <PageProject />
  },
];

export default AppRoutes;
