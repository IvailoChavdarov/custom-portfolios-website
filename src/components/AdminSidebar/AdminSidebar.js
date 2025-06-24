import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import "./AdminSidebar.scss"
import { NavLink } from 'react-router-dom';

function AdminSidebar(){
  return (
    <div className="sidebar-container">
      <CDBSidebar id='admin-sidebar'>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <span className='sidebar-top-text'>
            Administration
          </span>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink end to="/admin">
              <CDBSidebarMenuItem icon="columns">Admin panel</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/admin/analytics">
              <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/admin/manage">
              <CDBSidebarMenuItem icon="users">Users</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default AdminSidebar;