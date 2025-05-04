"use client"

import { useEffect, useState } from "react"
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
import { list, remove } from "aws-amplify/storage"
import outputs from "@/amplify_outputs.json"
Amplify.configure(outputs)

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [documents, setDocuments] = useState([])

  const itemsPerPage = 5

  // Cargar documentos desde S3
  useEffect(() => {
    fetchDocuments()
  }, [])

  // Función para obtener la lista de archivos de S3
  const fetchDocuments = async () => {
    setIsLoading(true)
    try {
      const result = await list({
        path: "templates/",
        options: {
          listAll: true
        }
      })
      
      // Transformar los resultados en el formato deseado
      const formattedDocs = result.items.map((item, index) => {
        // Obtener nombre del archivo y extensión
        const fileName = item.path
        // Extraer solo el nombre del archivo sin la ruta completa para mostrar
        const displayName = fileName.replace("templates/", "")
        const fileExt = fileName.split('.').pop().toLowerCase()
        
        // Calcular tamaño en MB (si está disponible)
        const size = item.size ? `${(item.size / (1024 * 1024)).toFixed(1)} MB` : "Desconocido"
        
        return {
          id: index.toString(),
          key: item.path, // Guarda la clave S3 para operaciones
          name: displayName, // Nombre para mostrar sin la parte 'templates/'
          fullName: fileName, // Nombre completo con la ruta
          type: fileExt,
          size: size
        }
      })
      
      setDocuments(formattedDocs)
    } catch (error) {
      console.error("Error al cargar archivos de S3:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Función para eliminar archivo de S3
  const handleDeleteDocument = async (key) => {
    setIsDeleting(true)
    try {
      await remove({
        path: key
      })
      // Actualizar la lista de documentos después de eliminar
      fetchDocuments()
    } catch (error) {
      console.error("Error al eliminar el archivo:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  // Filtrar documentos según la búsqueda
  const filteredDocuments = documents.filter((doc) => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Calcular paginación
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedDocuments = filteredDocuments.slice(startIndex, startIndex + itemsPerPage)

  // Obtener el icono según el tipo de archivo
  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FilePdf className="h-5 w-5 text-red-500" />
      case "doc":
      case "docx":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "xls":
      case "xlsx":
        return <FileText className="h-5 w-5 text-green-500" />
      case "ppt":
      case "pptx":
        return <FileText className="h-5 w-5 text-orange-500" />
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
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
                <TableHead className="w-[100px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    <div className="flex justify-center items-center">
                      <Loader2 className="h-6 w-6 animate-spin mr-2" />
                      Cargando documentos...
                    </div>
                  </TableCell>
                </TableRow>
              ) : paginatedDocuments.length > 0 ? (
                paginatedDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>{getFileIcon(doc.type)}</TableCell>
                    <TableCell className="font-medium">{doc.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{doc.size}</TableCell>
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
                              onClick={() => handleDeleteDocument(doc.key)}
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
                  <TableCell colSpan={4} className="h-24 text-center">
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