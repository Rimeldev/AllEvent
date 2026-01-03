import { Outlet } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";
import Footer from "./Footer";


export default function AdminLayout() {
  return (
    <>
      <HeaderAdmin />
      <Outlet />
        <Footer />
    </>
  );
}
