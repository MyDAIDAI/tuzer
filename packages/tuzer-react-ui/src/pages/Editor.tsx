import { ConfigProvider } from "antd";

const Layout = (): JSX.Element => {
  return <div>12312</div>;
};

const Editor = (): JSX.Element => {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#00b96b" } }}>
      <Layout />
    </ConfigProvider>
  );
};

export default Editor;
