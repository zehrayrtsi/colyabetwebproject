import { Row, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import THEME from "../../constant/theme.js";

const LoadingIndicator = ({ visible = false }) => {
  if (!visible) return <></>;
  return (
    <Row
      style={{
        backgroundColor: "rgba(255,255,255,0.7)",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
      }}
    >
      <Spin
        indicator={
          <LoadingOutlined
            style={{ fontSize: 64 }}
            spin
            color={THEME.Primary}
          />
        }
      />
    </Row>
  );
};

export default LoadingIndicator;
