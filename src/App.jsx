import { ConfigProvider } from "antd";
import THEME from "./constant/theme.js";

import "../src/util/fontAwesome.js";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/auth/index.jsx";
import RouterScreen from "./route/index.jsx";

const queryClient = new QueryClient();
//TODO: Add global loading indicator
const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: THEME.Primary,
          // Alias Token
          colorBgContainer: "#E7E7E7",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterScreen />
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ConfigProvider>
  );
};

export default App;
