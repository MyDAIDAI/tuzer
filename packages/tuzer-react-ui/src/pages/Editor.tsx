import { ConfigProvider } from "antd";
import EditorLayout from "./Layout";

const Editor = (): JSX.Element => {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#00b96b" } }}>
      <EditorLayout />
    </ConfigProvider>
  );
};

export default Editor;
