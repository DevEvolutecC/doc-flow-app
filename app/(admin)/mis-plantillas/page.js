'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { FileText } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { Eye } from 'lucide-react';
import { Plus } from 'lucide-react';

function MisPlantillas() {
  const router = useRouter(); 
  const templates = [
    {
      id: '1',
      name: 'Huff-Burns: target intuitive partnerships',
      uploadDate: '02/04/2025',
      filesCreated: 13,
    },
    {
      id: '2',
      name: 'Norman, Wilson and Wilson: deliver seamless channels',
      uploadDate: '28/03/2025',
      filesCreated: 11,
    },
    {
      id: '3',
      name: 'Lin, Lewis and Ware: re-intermediate best-of-breed e-business',
      uploadDate: '31/01/2025',
      filesCreated: 10,
    },
    {
      id: '4',
      name: 'Miller-Greene: exploit magnetic users',
      uploadDate: '02/05/2025',
      filesCreated: 5,
    },
    {
      id: '5',
      name: 'Sanchez LLC: reinvent 24/365 bandwidth',
      uploadDate: '07/01/2025',
      filesCreated: 15,
    },
    {
      id: '6',
      name: 'Meyer-Young: seize next-generation infomediaries',
      uploadDate: '04/01/2025',
      filesCreated: 8,
    },
    {
      id: '7',
      name: 'Lee, Gutierrez and Hill: harness synergistic infrastructures',
      uploadDate: '03/03/2025',
      filesCreated: 12,
    },
    {
      id: '8',
      name: 'Murphy Group: redefine visionary synergies',
      uploadDate: '11/04/2025',
      filesCreated: 7,
    },
    {
      id: '9',
      name: 'Davis-Walker: synergize wireless applications',
      uploadDate: '13/02/2025',
      filesCreated: 18,
    },
    {
      id: '10',
      name: 'Stewart Inc: revolutionize integrated experiences',
      uploadDate: '12/02/2025',
      filesCreated: 9,
    },
    {
      id: '11',
      name: 'Parker, Wright and Miller: enable intuitive architectures',
      uploadDate: '10/02/2025',
      filesCreated: 14,
    },
    {
      id: '12',
      name: 'Roberts LLC: scale dynamic infrastructures',
      uploadDate: '18/03/2025',
      filesCreated: 6,
    },
    {
      id: '13',
      name: 'James, Evans and Jones: redefine scalable e-business',
      uploadDate: '25/01/2025',
      filesCreated: 13,
    },
    {
      id: '14',
      name: 'Allen and Sons: leverage cutting-edge platforms',
      uploadDate: '21/02/2025',
      filesCreated: 10,
    },
    {
      id: '15',
      name: 'Clark-Brown: optimize revolutionary functionalities',
      uploadDate: '27/03/2025',
      filesCreated: 8,
    },
    {
      id: '16',
      name: 'Morris Inc: transform rich e-services',
      uploadDate: '15/04/2025',
      filesCreated: 11,
    },
    {
      id: '17',
      name: 'Taylor & Associates: revolutionize world-class users',
      uploadDate: '05/04/2025',
      filesCreated: 7,
    },
    {
      id: '18',
      name: 'Cameron, Nelson and Gonzales: grow viral supply-chains',
      uploadDate: '10/05/2025',
      filesCreated: 9,
    },
    {
      id: '19',
      name: 'Jackson-Thomas: engage strategic relationships',
      uploadDate: '14/04/2025',
      filesCreated: 5,
    },
    {
      id: '20',
      name: 'Wright-Taylor: scale enterprise infrastructures',
      uploadDate: '17/01/2025',
      filesCreated: 10,
    },
    {
      id: '21',
      name: 'Walker Ltd: redefine virtual partnerships',
      uploadDate: '11/04/2025',
      filesCreated: 12,
    },
    {
      id: '22',
      name: 'Thomas Inc: maximize open-source functionalities',
      uploadDate: '27/01/2025',
      filesCreated: 10,
    },
    {
      id: '23',
      name: 'Jackson Group: harness innovative experiences',
      uploadDate: '19/02/2025',
      filesCreated: 13,
    },
    {
      id: '24',
      name: 'Anderson Enterprises: integrate scalable deliverables',
      uploadDate: '30/03/2025',
      filesCreated: 8,
    },
    {
      id: '25',
      name: 'Wilson-Williams: enable cross-platform systems',
      uploadDate: '08/03/2025',
      filesCreated: 7,
    },
    {
      id: '26',
      name: 'Miller, Gonzalez and Long: grow value-added paradigms',
      uploadDate: '20/01/2025',
      filesCreated: 12,
    },
    {
      id: '27',
      name: 'White-Harrison: engage cutting-edge synergies',
      uploadDate: '29/01/2025',
      filesCreated: 14,
    },
    {
      id: '28',
      name: 'Moore-Petersen: maximize next-generation experiences',
      uploadDate: '09/04/2025',
      filesCreated: 5,
    },
    {
      id: '29',
      name: 'Baker-Smith: transform cutting-edge relationships',
      uploadDate: '24/02/2025',
      filesCreated: 9,
    },
    {
      id: '30',
      name: 'Scott-Parker: empower collaborative platforms',
      uploadDate: '26/03/2025',
      filesCreated: 15,
    },
    {
      id: '31',
      name: 'Roberts-Young: deliver world-class infrastructures',
      uploadDate: '12/03/2025',
      filesCreated: 10,
    },
    {
      id: '32',
      name: 'Adams-Johnson: streamline cross-functional initiatives',
      uploadDate: '03/02/2025',
      filesCreated: 13,
    },
    {
      id: '33',
      name: 'Edwards-Taylor: recontextualize mission-critical paradigms',
      uploadDate: '06/03/2025',
      filesCreated: 14,
    },
    {
      id: '34',
      name: 'Harris LLC: build cutting-edge synergies',
      uploadDate: '12/01/2025',
      filesCreated: 10,
    },
    {
      id: '35',
      name: 'Foster-Brown: enhance innovative relationships',
      uploadDate: '21/03/2025',
      filesCreated: 6,
    },
    {
      id: '36',
      name: 'Gonzales, Moore and Young: transform intuitive architectures',
      uploadDate: '14/03/2025',
      filesCreated: 12,
    },
    {
      id: '37',
      name: 'Davis-Brown: empower best-of-breed platforms',
      uploadDate: '25/03/2025',
      filesCreated: 13,
    },
    {
      id: '38',
      name: 'Wilson-Davis: evolve global partnerships',
      uploadDate: '28/01/2025',
      filesCreated: 14,
    },
    {
      id: '39',
      name: 'Simmons-Wright: optimize efficient systems',
      uploadDate: '06/01/2025',
      filesCreated: 7,
    },
    {
      id: '40',
      name: 'Hughes-Johnson: integrate dynamic platforms',
      uploadDate: '04/04/2025',
      filesCreated: 8,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = templates.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(templates.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className='w-full'>
        {/* Encabezado */}
        <div className='flex items-center justify-between mb-6'>
          <div className='mb-6'>
            <p className='text-sm text-gray-500'>Mis plantillas</p>
            <h1 className='text-2xl font-bold text-primary'>Mis plantillas</h1>
          </div>
          <div className='mb-4'>
            <button className='px-4 py-2 bg-primary text-white rounded hover:bg-primary hover:opacity-90' onClick={() => {
              window.location.href = '/crear-plantilla';
            }}>
              Crear nueva plantilla
            </button>
          </div>
        </div>
        <div className=' shadow bg-white rounded-lg px-3 py-4'>
          <div className='overflow-x-auto'>
            <div className='min-w-full '>
              <div className='mb-4 text-sm text-gray-500'>
                Total de plantillas: {templates.length}
              </div>
              
                      <div className='grid grid-cols-12 gap-4 bg-gray-50 p-3 rounded-t-lg'>
                      <div className='col-span-5 font-medium text-gray-500'>
                        Nombre de la plantilla
                      </div>
                      <div className='col-span-3 font-medium text-gray-500'>
                        Fecha en la que se subió
                      </div>
                      <div className='col-span-2 font-medium text-gray-500'>
                        Archivos creados
                      </div>
                      <div className='col-span-2 font-medium text-gray-500'>
                        Acciones
                      </div>
                      </div>

                      {currentItems.map((template) => (
                      <div
                        key={template.id}
                        className='grid grid-cols-12 gap-4 p-3 items-center hover:bg-gray-50'
                      >
                        <div className='col-span-5 flex items-center'>
                        <FileText className='text-blue-500 mr-2' size={18} />
                        <span className='text-gray-800'>{template.name}</span>
                        </div>
                        <div className='col-span-3 text-gray-600'>
                        {template.uploadDate}
                        </div>
                        <div className='col-span-2 text-gray-600'>
                        {template.filesCreated}
                        </div>
                        <div className='col-span-2 flex space-x-2'>
                        <button
  className="p-2 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100"
  onClick={() => router.push(`/mis-plantillas/ver-plantillas?templateId=${template.id}`)}
>
  <Eye className="w-4 h-4 text-primary" />
  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1">
    Ver plantilla
  </span>
</button>


                        <button
                          className='p-2 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 relative group'
                        >
                          <Plus className='w-4 h-4 text-primary' />
                          <span className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1'>
                          Agregar plantilla
                          </span>
                        </button>
                        </div>
                      </div>
                      ))}
                    </div>
                    </div>

                    {/* Paginación */}
          <div className='flex items-center justify-between mt-4 px-3 py-2 border-t border-gray-200'>
            <div className='text-sm text-gray-500'>
              Filas por página:
              <select
                className='ml-2 border border-gray-300 rounded px-2 py-1 bg-white'
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                value={itemsPerPage}
              >
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
            <div className='text-sm text-gray-500'>
              {firstIndex + 1} - {lastIndex} de {templates.length}
            </div>
            <div className='flex space-x-2'>
              <button
                className='p-1 rounded border border-gray-300 text-gray-500 hover:bg-[#F7F7F7] disabled:opacity-50'
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                className='p-1 rounded border border-gray-300 text-gray-500 hover:bg-[#F7F7F7] disabled:opacity-50'
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
        {/* Tabla de plantillas */}
      </div>
    </>
  );
}

export default MisPlantillas;
