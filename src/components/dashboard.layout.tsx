import React from 'react';
import { Button, Layout, Space, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { useTheme } from '../contexts/theme.context';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import logo from '../assets/picture-svgrepo-com.svg';

const { Header, Content, Footer } = Layout;

const LayoutDashboard: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const { theme: themeContext, toggleTheme } = useTheme();

    return (
        <Layout>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} >
                    <div className="flex items-center justify-between shadow-md px-10">
                        <div className="flex items-center space-x-2">
                            <img src={logo} alt="Logo" className="w-8 h-8" />
                            <span className="font-semibold text-lg">Image Extractor</span>
                            <span className="text-sm text-green-600">3.2 Beta</span>
                        </div>

                        <div className="flex items-center space-x-6 text-gray-600">
                            <Link to="#" className="hover:text-black">Extract</Link>
                            <Link to="#" className="hover:text-black">API</Link>
                            <Link to="#" className="hover:text-black">Pricing</Link>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Button className="px-4 py-2 border rounded-md hover:bg-gray-100">Login</Button>
                            <Button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">Sign Up</Button>
                            <Button onClick={toggleTheme}>
                                {themeContext === 'light' ? <SunOutlined /> : <MoonOutlined />}
                            </Button>
                        </div>
                    </div>
                </Header>
                <Space />
                <Content>
                    <div
                        style={{
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    XBrowser Cloud Admin ©{new Date().getFullYear()} Created by XBrowser
                </Footer>
            </Layout>
        </Layout>
    );
};

export default LayoutDashboard;