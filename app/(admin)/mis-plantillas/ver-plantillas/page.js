'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Edit, FileText, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function VerPlantilla() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const templateId = searchParams.get('templateId');

  const [templateData, setTemplateData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Datos de las plantillas (simulados)
  const templates = [
    {
      id: '1',
      name: 'Plantilla 1',
      uploadDate: '02/04/2025',
      filesCreated: 10,
      files: Array.from({ length: 10 }, (_, i) => ({
        id: `file-${i+1}`,
        name: `Acta de reunión ${String(i+1).padStart(3, '0')}`,
        date: '05/05/2025',
        documentsCreated: 10
      }))
    },
    {
      id: '2',
      name: 'Plantilla 2',
      uploadDate: '10/05/2025',
      filesCreated: 12,
      files: Array.from({ length: 12 }, (_, i) => ({
        id: `file-${i+1}`,
        name: `Acta de reunión ${String(i+1).padStart(3, '0')}`,
        date: '05/05/2025',
        documentsCreated: 10
      }))
    },
    {
      id: '3',
      name: 'Plantilla 3',
      uploadDate: '15/04/2025',
      filesCreated: 8,
      files: Array.from({ length: 8 }, (_, i) => ({
        id: `file-${i+1}`,
        name: `Acta de reunión ${String(i+1).padStart(3, '0')}`,
        date: '05/05/2025',
        documentsCreated: 10
      }))
    },
  ];

  // Obtener los detalles de la plantilla cuando se carga la vista
  useEffect(() => {
    if (templateId) {
      const selectedTemplate = templates.find((template) => template.id === templateId);
      setTemplateData(selectedTemplate);
    }
  }, [templateId]);

  if (!templateData) {
    return <div className="flex justify-center items-center h-64">Cargando plantilla...</div>;
  }

  const totalPages = Math.ceil(templateData.files.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFiles = templateData.files.slice(startIndex, endIndex);

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <Link href="/mis-plantillas" className="hover:text-primary">Mis plantillas</Link>
        <span className="mx-2">/</span>
        <span>Ver plantilla</span>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Ver plantilla</h1>
      </div>

      {/* Action buttons */}
      <div className="flex justify-end gap-3 mb-4">
        <Button 
          className="bg-primary hover:bg-primary text-white"
          onClick={() => router.push(`/editar-plantilla?templateId=$s{templateId}`)}
        >
          <Edit className="w-4 h-4 mr-2" />
          Editar plantilla
        </Button>
        <Button 
          className="bg-primary hover:bg-primary text-white"
          onClick={() => router.push(`/mis-plantillas/crear-documento?templateId=${templateId}`)}
        >
          Crear documento a partir de la plantilla
        </Button>
      </div>

      {/* Template header */}
      <div className="bg-primary text-center rounded-lg mb-5 p-6 text-white">
        <h2 className="text-xl font-semibold">{templateData.name}</h2>
      </div>

      {/* Files section */}
      <div className="bg-white rounded-b-lg shadow-md">
        <div className="p-4 border-b">
          <h3 className="font-medium">Archivos creados a partir de la plantilla</h3>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-4 gap-4 p-4 border-b text-sm font-medium text-gray-500">
          <div>Nombre del archivo</div>
          <div>Fecha en la que se subió</div>
          <div>Documentos creados con la plantilla</div>
          <div className="text-right">Acciones</div>
        </div>

        {/* Table content */}
        <div className="divide-y">
          {currentFiles.map((file) => (
            <div key={file.id} className="grid grid-cols-4 gap-4 p-4 items-center">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-primary mr-2" />
                <span>{file.name}</span>
              </div>
              <div>{file.date}</div>
              <div>{file.documentsCreated}</div>
              <div className="flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4 text-primary" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Ver archivo</DropdownMenuItem>
                    <DropdownMenuItem>Descargar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Filas por página:</span>
            <Select value={String(itemsPerPage)} onValueChange={(value) => setItemsPerPage(Number(value))}>
              <SelectTrigger className="w-16 h-8">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{`${startIndex + 1}-${Math.min(endIndex, templateData.files.length)} de ${templateData.files.length}`}</span>
            <div className="flex">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerPlantilla;
