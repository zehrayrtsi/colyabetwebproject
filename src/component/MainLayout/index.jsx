import { Button, Image, Layout, Menu, theme } from "antd";
import THEME from "../../constant/theme.js";
import ROUTE from "../../constant/route.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet, useNavigate, useRouter } from "@tanstack/react-router";
import { useAuth } from "../../context/auth/index.jsx";

const { Header, Content, Footer, Sider } = Layout;
const items = Object.values(ROUTE).map((route) => {
  return {
    key: route.key,
    icon: <FontAwesomeIcon icon={route.icon} />,
    label: route.label,
  };
});
const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const router = useRouter();

  const pathname = router.state.location.pathname;

  const { logout } = useAuth();
  return (
    <Layout style={{ height: "100%" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        // onBreakpoint={(broken) => {
        //   //console.log(broken);
        // }}
        // onCollapse={(collapsed, type) => {
        //   //console.log(collapsed, type);
        // }}
      >
        <div
          className="demo-logo-vertical"
          style={{ padding: 16, display: "flex", columnGap: 12 }}
        >
          <Image width={32} src={"logo.png"} />
          <div style={{ fontSize: 24, lineHeight: "32px", color: THEME.White }}>
            Colyabet
          </div>
        </div>
        <Menu
          onClick={async (a) => {
            await navigate({ to: "/" + a.key });
          }}
          theme="dark"
          mode="inline"
          selectedKeys={[pathname.substring(1, pathname.length)]}
          items={items}
        />
        <div style={{ paddingInline: 8 }}>
          <Button
            onClick={async () => {
              logout();
            }}
            style={{ width: "100%" }}
            type={"primary"}
          >
            Çıkış Yap
          </Button>
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            paddingInline: 24,
            background: colorBgContainer,
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          <div>Çölyak Diyet Panele Hoş Geldiniz</div>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            position: "relative",
            maxHeight: "calc(100% - 64px - 65px - 24px)",
            overflowY: "scroll",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Colyabet ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
