'use client';

import { Amplify } from 'aws-amplify';
import { SidebarProvider } from '@/components/ui/sidebar';

import outputs from '@/amplify_outputs.json';
import { AppSidebar } from '@/components/dashboard/app-sidebar';

Amplify.configure(outputs);

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <div className='flex w-full min-h-screen'>
        {/* Barra lateral */}
        <AppSidebar />

        {/* Área de contenido principal */}
        <div className='bg-background w-full'>
          <div className='border-b border-[#89848d35] bg-white'>
            <div className='flex h-16 items-center px-4'>
              <h1 className='text-xl font-semibold'></h1>
            </div>
          </div>
          <div className='p-7'>{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
