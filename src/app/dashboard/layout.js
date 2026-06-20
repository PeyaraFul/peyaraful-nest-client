import React from 'react';
import { DashboardSidebar } from './../../components/dashboard/DashboardSidebar';

const DashboardLayout = ({ children }) => {
    return (
        <div className='flex gap-4 p-4'>
           <DashboardSidebar />
          <div >
            {children}
          </div>

            
        </div>
    ); 
};

export default DashboardLayout;