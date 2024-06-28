import { Button, Checkbox, Form, Input, Row } from "antd";
import THEME from "../../constant/theme.js";
import { useUserLogin } from "../../api/UserController/index.js";
import { STORAGE_KEYS, useAuth } from "../../context/auth/index.jsx";
import { useRouter } from "@tanstack/react-router";
import LoadingIndicator from "../../component/LoadingIndicator/index.jsx";

const LoginScreen = () => {
  const { mutate: login, isPending } = useUserLogin();
  const { login: contextLogin } = useAuth();
  const router = useRouter();
  return (
    <Row
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <LoadingIndicator visible={isPending} />
      <Row style={{ marginBottom: 16 }}>
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: THEME.Primary,
            textShadow: "0 4px 3px rgba(0, 0, 0, 0.7)",
          }}
        >
          COLYABET
        </div>
      </Row>
      <Row
        style={{
          width: "90%",
          maxWidth: 320,
          height: "90%",
          maxHeight: 320,
          borderRadius: 16,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.7)",
          backgroundColor: "#E7E7E7",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          name="basic"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 19,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={(formData) => {
            login(
              { email: formData.email, password: formData.password },
              {
                onSuccess: async (response) => {
                  const data = response.data;
                  console.log(data);
                  contextLogin(
                    {
                      [STORAGE_KEYS.ACCESS_TOKEN]: data.token,
                      [STORAGE_KEYS.REFRESH_TOKEN]: data.refreshToken,
                    },
                    {
                      email: data.email,
                      username: data.userName,
                      role: data.role,
                    },
                  );
                  await router.invalidate();
                },
                onError: (error) => {
                  console.log(error);
                },
              },
            );
          }}
          onFinishFailed={() => {
            console.log("Failed !");
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Lütfen Email Adresinizi Girin!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Şifre"
            name="password"
            rules={[
              {
                required: true,
                message: "Lütfen Şifrenizi Girin!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              span: 24,
            }}
          >
            <Checkbox>Beni Hatırla</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            <Button block type="primary" htmlType="submit">
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </Row>
  );
};

export default LoginScreen;
