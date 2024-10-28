import { Layout } from "antd"
import { Route, Routes } from 'react-router-dom';
import NotFound from "./pages/not-found.page";
import LayoutDashboard from "./components/dashboard.layout";
import HomePage from "./pages/home.page";

function App() {

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Routes>
        {/* Các route được bảo vệ */}

        <Route path="/" element={<LayoutDashboard />}>
          <Route index element={<HomePage />} />
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Layout>
  )
}

export default App
