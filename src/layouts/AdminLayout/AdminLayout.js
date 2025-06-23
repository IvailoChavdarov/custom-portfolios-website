import { Outlet } from "react-router-dom";
import React from "react";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import "./AdminLayout.scss";
import { Container } from "react-bootstrap";

function AdminLayout() {
  return (
    <>    
        <AdminSidebar/>
        <Container className="mt-5 admin-body">
            <Outlet />
        </Container>
    </>

  );
}

export default AdminLayout;