import React, { useEffect, useState } from 'react';
import { Button, Layout, Space, theme, Drawer } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { useTheme } from '../contexts/theme.context';
import { SunOutlined, MoonOutlined, MenuOutlined } from '@ant-design/icons';
import logo from '../assets/picture-svgrepo-com.svg';

const { Header, Content, Footer } = Layout;

const LayoutDashboard: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const { theme: themeContext, toggleTheme } = useTheme();
    const [isAtTop, setIsAtTop] = useState(true);
    const [drawerVisible, setDrawerVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsAtTop(window.scrollY === 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const showDrawer = () => {
        setDrawerVisible(true);
    };

    const closeDrawer = () => {
        setDrawerVisible(false);
    };

    return (
        <Layout>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: isAtTop || themeContext === 'dark' ? '#27272a' : colorBgContainer,
                        position: 'fixed',
                        width: '100%',
                        zIndex: 1,
                    }}
                >
                    <div className={`flex items-center justify-between px-4 md:px-4 py-4 md:py-0 ${isAtTop ? 'shadow-md' : ''}`}>
                        <div className="flex items-center space-x-2">
                            <img src={logo} alt="Logo" className="w-8 h-8" />
                            <span className={`font-semibold text-lg ${isAtTop || themeContext === 'dark' ? 'text-white' : 'text-black'}`}>Image Extractor</span>
                            <span className="hidden sm:inline text-sm text-green-600 font-bold">3.2 Beta</span>
                        </div>

                        <div className={`hidden md:flex font-medium items-center space-x-6 text-gray-600 ${isAtTop || themeContext === 'dark' ? 'text-white' : 'text-black'}`}>
                            <Link to="#">Extract</Link>
                            <Link to="#">API</Link>
                            <Link to="#">Pricing</Link>
                        </div>


                        <div className="flex items-center space-x-2">
                            <Button className="px-4 justify bg-black text-white rounded-md hover:bg-gray-800 hidden md:inline-block">Login</Button>
                            <Button className="px-4 border rounded-md hover:bg-gray-100 hidden md:inline-block">
                                Sign Up
                            </Button>
                            <Button onClick={toggleTheme} className="hidden md:inline-block">
                                {themeContext === 'light' ? <SunOutlined /> : <MoonOutlined />}
                            </Button>
                            <Button onClick={showDrawer} className="md:hidden">
                                <MenuOutlined />
                            </Button>
                        </div>
                    </div>
                </Header>
                <Drawer
                    title="Menu"
                    placement="right"
                    onClose={closeDrawer}
                    open={drawerVisible}
                >
                    <div className="flex flex-col space-y-4">
                        <Button className="w-full bg-black text-white rounded-md hover:bg-gray-800">Login</Button>
                        <Button className="w-full border rounded-md hover:bg-gray-100">Sign Up</Button>
                        <Button onClick={toggleTheme} className="w-full">
                            {themeContext === 'light' ? <SunOutlined /> : <MoonOutlined />}
                        </Button>
                    </div>
                </Drawer>
                <Space />
                <Content style={{ marginTop: '64px' }}>
                    <div
                        style={{
                            minHeight: 360,
                            background: themeContext === 'light' ? colorBgContainer : '#27272a',
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer className={`${themeContext === 'light' ? 'text-black' : 'text-white bg-[#27272a]'}`} style={{ textAlign: 'center' }}>
                    XBrowser Cloud Admin ©{new Date().getFullYear()} Created by XBrowser
                </Footer>
            </Layout>
        </Layout>
    );
};

export default LayoutDashboard;