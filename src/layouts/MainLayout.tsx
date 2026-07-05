import { Outlet } from "react-router-dom";
import Header from "../component/layout/Header";
import Footer from "../component/layout/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;