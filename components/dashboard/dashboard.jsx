'use client';

import { useState } from 'react';
import { AppSidebar } from './app-sidebar';
import { FileUpload } from './file-upload';
import { FileList } from './file-list';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { uploadData } from 'aws-amplify/storage';

function Dashboard() {
  const [files, setFiles] = useState([]);

  // Función para manejar la carga de archivos a S3
  const handleFileUpload = async (newFiles) => {
    // Actualizamos el estado local con los nuevos archivos
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    // Cargar los archivos a S3
    try {
      for (const file of newFiles) {
        // Sube cada archivo a S3
        const fileName = `${Date.now()}-${file.name}`; // Nombre único para evitar colisiones

        uploadData({
          data: file,
          path: `templates/${fileName}`,
          options: {
            bucket:
              'amplify-d2yl9rekppsb0u-ma-amplifyteamdrivebucket28-h6ijgcetu7zf',
          },
        });
        console.log(`Archivo subido: ${fileName}`);
      }
    } catch (error) {
      console.error('Error al subir archivo:', error);
    }
  };

  console.log(files);

  return (
    <>
      <div className='w-full flex flex-col mb-5'>
        
        
        {files.length > 0 ? (
          <div className='col-span-2'>
            <h3 className='text-xl font-semibold mb-4'>
              Archivos Seleccionados
            </h3>
            <FileList files={files} />
          </div>
        ) : (
          <div className='col-span-2'>
            <FileUpload onUpload={handleFileUpload} />
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
