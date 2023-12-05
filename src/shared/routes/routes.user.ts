import { RouteType } from "../layouts/PanelLayout/Sidebar/Sidebar.type";
import paths from "./paths";

const routes: Array<RouteType> = [
  { name: "Dashboard", icon: "ri-function-line", link: paths.dashboard },
  { name: "My Task", icon: "ri-menu-fill", link: paths.myTasks },
  { name: "Settings", icon: "ri-settings-2-line", link: paths.settings },
];

export default routes;
