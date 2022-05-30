import Auth from "./pages/Auth"
import List from "./pages/List"
import NewTask from "./pages/NewTask"
import EditTask from "./pages/EditTask"
import {LIST_ROUTE, TASK_ROUTE, LOGIN_ROUTE} from "./utils/consts"

export const publicRoutes = [
  {
    path: LIST_ROUTE,
    Component: List
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth
  },
  {
    path: `${TASK_ROUTE}/new`,
    Component: NewTask
  }
]

export const authRoutes = [
  {
    path: `${TASK_ROUTE}/:id`,
    Component: EditTask
  }
]