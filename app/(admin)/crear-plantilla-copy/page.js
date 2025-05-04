"use client";  // Marca este archivo como un componente del lado del cliente

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Dashboard from "../../../components/dashboard/dashboard";  // O cualquier otro componente

import { Amplify } from "aws-amplify"
import outputs from "@/amplify_outputs.json";
Amplify.configure(outputs);

export function DashboardPage() {
  const router = useRouter();
  // Estado para gestionar la vista actual
  const [isCreating, setIsCreating] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [formData, setFormData] = useState({
    nombreCompleto: 'Carlos Andrés Mejía Rojas', // Default value, could come from document
    cedula: '1.010.123.456',  // Default value, could come from document
    // Agrega más campos según lo necesites
  });

  // Función para manejar el cambio de vista
  const handleCreateTemplate = () => {
    if (templateName.trim()) {  // Verifica que el nombre de la plantilla no esté vacío
      setIsCreating(true);  // Cambia a la vista previa
    } else {
      alert("Por favor, ingrese un nombre para la plantilla");
    }
  };

  // Función para volver a la lista de plantillas
  const goToTemplates = () => {
    router.push('/mis-plantillas');
  };

  // Función para actualizar los datos del formulario
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      {/* Migas de pan */}
      <div className='text-sm text-gray-500 mb-4'>
        <Link href="/mis-plantillas" className="text-primary hover:underline">Mis plantillas</Link> /
        {isCreating ? (
          <>
            <Link href="/crear-plantilla" className="text-primary hover:underline"> Crear plantilla</Link> /
            <span className="text-primary"> Vista previa</span>
          </>
        ) : (
          <span className="text-primary"> Crear plantilla</span>
        )}
      </div>

      {/* Encabezado */}
      <div className='flex items-center justify-between mb-6'>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-primary'>{isCreating ? "Vista previa del documento" : "Crear plantilla"}</h1>
          <div className='mt-4'>
            {!isCreating && (
              <>
                <label htmlFor='templateName' className='block text-sm font-medium text-gray-700'>
                  Nombre de la plantilla
                </label>
                <input
                  type='text'
                  id='templateName'
                  name='templateName'
                  className='p-[10px] mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm'
                  placeholder='Ingrese el nombre de la plantilla'
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}  // Actualiza el nombre de la plantilla
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Contenido condicional */}
      {!isCreating ? (
        <>
          {/* Mostrar Dashboard para subir documento */}
          <Dashboard />

          {/* Botón para cambiar a la vista previa */}
          <div className='flex justify-end'>
            <button
              type='button'
              className='px-4 py-2 bg-primary text-white rounded-md shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
              onClick={handleCreateTemplate}  // Cambiar la vista al hacer clic
            >
              Crear plantilla
            </button>
          </div>
        </>
      ) : (
        // Mostrar la vista previa del documento cuando isCreating sea true
        <div className='flex'>
          <div className='w-1/2 p-4'>
            <div className="border shadow-[0px_3px_30px_#0000000D] rounded-md p-6">
              <p className='text-sm text-gray-500 mb-2'>Vista previa del documento</p>
              <div className='border-dashed border-2 h-72'>
                {/* Renderizar el contenido del documento aquí con los campos a cambiar */}
                <p><strong>Nombre Completo:</strong> {formData.nombreCompleto}</p>
                <p><strong>Cédula:</strong> {formData.cedula}</p>
              </div>
            </div>
          </div>

          {/* Campos detectados */}
          <div className='w-1/2 p-4'>
            <div className="border shadow-[0px_3px_30px_#0000000D] rounded-md p-6">
              <p className='text-sm text-gray-500 mb-2'>Campos detectados</p>
              <div className='mb-4'>
                <div className='flex justify-between flex-wrap'>
                  <span className="w-full text-[#4E4E4E]-700">Nombre completo</span>
                  <span className="w-full text-[13px]">(Página 1, línea 5)</span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="w-1/2 pr-2">
                    <label className="block text-sm font-medium text-gray-700">Nuevo Nombre Completo</label>
                    <input
                      type="text"
                      name="nombreCompleto"
                      value={formData.nombreCompleto}
                      onChange={handleFieldChange}
                      className="block w-full mt-1 border border-gray-300 text-[13px] text-gray-500 rounded-md p-2"
                    />
                  </div>
                  <div className="w-1/2 pl-2">
                    <label className="block text-sm font-medium text-gray-700">Nuevo Cédula</label>
                    <input
                      type="text"
                      name="cedula"
                      value={formData.cedula}
                      onChange={handleFieldChange}
                      className="block w-full mt-1 border border-gray-300 text-[13px] text-gray-500 rounded-md p-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Botones de navegación */}
            <div className='flex justify-between mt-4'>
              <button
                type='button'
                className='px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                onClick={() => setIsCreating(false)}  // Volver a la vista de crear plantilla
              >
                Volver
              </button>
              <button
                type='button'
                className='px-4 py-2 bg-primary text-white rounded-md shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                onClick={goToTemplates}  // Guardar y volver a mis plantillas
              >
                Guardar plantilla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
