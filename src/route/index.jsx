import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
  RouterProvider,
} from "@tanstack/react-router";
import MainLayout from "../component/MainLayout/index.jsx";

import UsersScreen from "../screen/UsersScreen/index.jsx";
import ReceiptsScreen from "../screen/ReceiptsScreen/index.jsx";
import QuizScreen from "../screen/QuizScreen/index.jsx";
import UserReportsScreen from "../screen/UserReportsScreen/index.jsx";
import PDFScreen from "../screen/PDFScreen/index.jsx";
import SuggestsScreen from "../screen/SuggestsScreen/index.jsx";
import BarcodeScreen from "../screen/BarcodeScreen/index.jsx";
import LoginScreen from "../screen/LoginScreen/index.jsx";
import { STORAGE_KEYS, useAuth } from "../context/auth/index.jsx";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { cookies } from "../util/cookie.js";
import { RefreshToken } from "../api/UserController/index.js";
import { TOKEN_EXPIRE_TIME } from "../constant/api.js";

const RootRoute = createRootRoute();

const LoginRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/login",
  beforeLoad: () => {
    const token = cookies.get(STORAGE_KEYS.ACCESS_TOKEN);
    if (token !== undefined) {
      throw redirect({
        to: "/receipts",
        // search: {
        //   redirect: location.href,
        // },
      });
    }
  },
  component: LoginScreen,
});

const AdminRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  beforeLoad: async () => {
    let token = cookies.get(STORAGE_KEYS.ACCESS_TOKEN);
    if (token === undefined) {
      const refreshToken = cookies.get(STORAGE_KEYS.REFRESH_TOKEN);
      if (refreshToken) {
        const response = await RefreshToken(refreshToken);
        token = response.data.token;
        cookies.set(STORAGE_KEYS.ACCESS_TOKEN, token, {
          expires: new Date(Date.now() + TOKEN_EXPIRE_TIME),
        });
      } else {
        throw redirect({
          to: "/login",
          search: {
            redirect: location.href,
          },
        });
      }
    }
  },
  component: MainLayout,
});

// Authorized Route Stack --------------------------------------------------------------------------------

const ReceiptRoute = createRoute({
  getParentRoute: () => AdminRoute,
  path: "receipts",
  component: () => {
    return <ReceiptsScreen />;
  },
});

const QuizRoute = createRoute({
  getParentRoute: () => AdminRoute,
  path: "quiz",
  component: () => {
    return <QuizScreen />;
  },
});

const UserReportRoute = createRoute({
  getParentRoute: () => AdminRoute,
  path: "reports",
  component: () => {
    return <UserReportsScreen />;
  },
});

const PDFRoute = createRoute({
  getParentRoute: () => AdminRoute,
  path: "pdf",
  component: () => {
    return <PDFScreen />;
  },
});

const SuggestsRoute = createRoute({
  getParentRoute: () => AdminRoute,
  path: "suggest",
  component: () => {
    return <SuggestsScreen />;
  },
});

const BarcodeRoute = createRoute({
  getParentRoute: () => AdminRoute,
  path: "barcode",
  component: () => {
    return <BarcodeScreen />;
  },
});

const UsersRoute = createRoute({
  getParentRoute: () => AdminRoute,
  path: "users",
  component: () => {
    return <UsersScreen />;
  },
});

// -------------------------------------------------------------------------------------------------------

const routeTree = RootRoute.addChildren([
  LoginRoute,
  AdminRoute.addChildren([
    ReceiptRoute,
    QuizRoute,
    UserReportRoute,
    PDFRoute,
    SuggestsRoute,
    BarcodeRoute,
    UsersRoute,
  ]),
]);

export const Router = createRouter({ routeTree, context: { auth: undefined } });

const RouterScreen = () => {
  const auth = useAuth();
  return (
    <>
      <RouterProvider router={Router} context={{ auth }} />
      <TanStackRouterDevtools router={Router} />
    </>
  );
};

export default RouterScreen;
