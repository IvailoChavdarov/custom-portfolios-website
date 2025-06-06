import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
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
            <NavLink to="">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/admin/analytics">
              <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default AdminSidebar;