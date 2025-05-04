"use client"

import { useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  File,
  FileText,
  FileIcon as FilePdf,
  FileImage,
  Loader2,
  Search,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Amplify } from "aws-amplify"
import outputs from "@/amplify_outputs.json";
Amplify.configure(outputs);

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isDeleting, setIsDeleting] = useState(false)
  const [documents, setDocuments] = useState(mockDocuments)

  const itemsPerPage = 5

  // Filtrar documentos según la búsqueda
  const filteredDocuments = documents.filter((doc) => doc.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Calcular paginación
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedDocuments = filteredDocuments.slice(startIndex, startIndex + itemsPerPage)

  // Manejar eliminación de documento
  const handleDeleteDocument = (id) => {
    setIsDeleting(true)

    // Simular una operación asíncrona
    setTimeout(() => {
      setDocuments(documents.filter((doc) => doc.id !== id))
      setIsDeleting(false)
    }, 500)
  }

  // Obtener el icono según el tipo de archivo
  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FilePdf className="h-5 w-5 text-red-500" />
      case "docx":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "xlsx":
        return <FileText className="h-5 w-5 text-green-500" />
      case "pptx":
        return <FileText className="h-5 w-5 text-orange-500" />
      case "jpg":
      case "png":
        return <FileImage className="h-5 w-5 text-purple-500" />
      default:
        return <File className="h-5 w-5 text-gray-500" />
    }
  }
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-primary mb-6">Panel de Documentos</h1>
      <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar documentos..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1) // Resetear a primera página al buscar
            }}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="hidden md:table-cell">Tamaño</TableHead>
              <TableHead className="hidden md:table-cell">Fecha</TableHead>
              <TableHead className="w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedDocuments.length > 0 ? (
              paginatedDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{getFileIcon(doc.type)}</TableCell>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{doc.size}</TableCell>
                  <TableCell className="hidden md:table-cell">{doc.uploadedAt}</TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Esto eliminará permanentemente el documento
                            <span className="font-semibold"> {doc.name}</span>.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteDocument(doc.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            {isDeleting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Eliminando
                              </>
                            ) : (
                              "Eliminar"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No se encontraron documentos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      {filteredDocuments.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredDocuments.length)} de{" "}
            {filteredDocuments.length} documentos
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

const mockDocuments = [
  {
    id: "1",
    name: "Informe_Mensual.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadedAt: "2023-10-15",
  },
  {
    id: "2",
    name: "Contrato_Servicio.docx",
    type: "docx",
    size: "1.8 MB",
    uploadedAt: "2023-10-12",
  },
  {
    id: "3",
    name: "Presentacion_Proyecto.pptx",
    type: "pptx",
    size: "5.7 MB",
    uploadedAt: "2023-10-10",
  },
  {
    id: "4",
    name: "Imagen_Producto.jpg",
    type: "jpg",
    size: "3.2 MB",
    uploadedAt: "2023-10-08",
  },
  {
    id: "5",
    name: "Datos_Clientes.xlsx",
    type: "xlsx",
    size: "1.5 MB",
    uploadedAt: "2023-10-05",
  },
  {
    id: "6",
    name: "Manual_Usuario.pdf",
    type: "pdf",
    size: "4.1 MB",
    uploadedAt: "2023-10-03",
  },
  {
    id: "7",
    name: "Reporte_Financiero.pdf",
    type: "pdf",
    size: "2.9 MB",
    uploadedAt: "2023-09-28",
  },
  {
    id: "8",
    name: "Calendario_Eventos.xlsx",
    type: "xlsx",
    size: "1.2 MB",
    uploadedAt: "2023-09-25",
  },
  {
    id: "9",
    name: "Logo_Empresa.png",
    type: "png",
    size: "0.8 MB",
    uploadedAt: "2023-09-20",
  },
  {
    id: "10",
    name: "Acta_Reunion.docx",
    type: "docx",
    size: "1.6 MB",
    uploadedAt: "2023-09-18",
  },
  {
    id: "11",
    name: "Presupuesto_2023.xlsx",
    type: "xlsx",
    size: "2.2 MB",
    uploadedAt: "2023-09-15",
  },
  {
    id: "12",
    name: "Catalogo_Productos.pdf",
    type: "pdf",
    size: "6.3 MB",
    uploadedAt: "2023-09-10",
  },
]