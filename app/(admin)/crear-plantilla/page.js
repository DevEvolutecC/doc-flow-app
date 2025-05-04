"use client";

import Dashboard from "../../../components/dashboard/dashboard";  // O cualquier otro componente

export function DashboardPage() {
  return (
    <div>
      {/* Encabezado */}
      <div className='flex items-center justify-between mb-6'>
          <div className='mb-6'>
            <p className='text-sm text-gray-500'>Mis plantillas

              <span className='text-primary'> / Crear plantilla</span>
            </p>
            <h1 className='text-2xl font-bold text-primary'>Crear plantilla</h1>
          </div>
          <div className='mb-4'>
            
          </div>
        </div>
      <Dashboard />
    </div>
  );
}

export default DashboardPage;