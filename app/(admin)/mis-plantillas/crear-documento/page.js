"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, FileText, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

function CrearDocumento() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const templateId = searchParams.get("templateId")

  const [isMultipleDocsModalOpen, setIsMultipleDocsModalOpen] = useState(false)
  const [templateData, setTemplateData] = useState(null)

  // Datos de las plantillas (simulados) - Usar los mismos datos que en VerPlantilla
  const templates = [
    {
      id: "1",
      name: "Plantilla 1",
      uploadDate: "02/04/2025",
      filesCreated: 10,
      files: Array.from({ length: 10 }, (_, i) => ({
        id: `file-${i + 1}`,
        name: `Acta de reunión ${String(i + 1).padStart(3, "0")}`,
        date: "05/05/2025",
        documentsCreated: 10,
      })),
    },
    {
      id: "2",
      name: "Plantilla 2",
      uploadDate: "10/05/2025",
      filesCreated: 12,
      files: Array.from({ length: 12 }, (_, i) => ({
        id: `file-${i + 1}`,
        name: `Acta de reunión ${String(i + 1).padStart(3, "0")}`,
        date: "05/05/2025",
        documentsCreated: 10,
      })),
    },
    {
      id: "3",
      name: "Plantilla 3",
      uploadDate: "15/04/2025",
      filesCreated: 8,
      files: Array.from({ length: 8 }, (_, i) => ({
        id: `file-${i + 1}`,
        name: `Acta de reunión ${String(i + 1).padStart(3, "0")}`,
        date: "05/05/2025",
        documentsCreated: 10,
      })),
    },
  ]

  // Campos detectados simulados
  const detectedFields = [
    { id: "field1", name: "campo_generado_1", type: "text" },
    { id: "field2", name: "campo_generado_1a", type: "text", fraction: "1/4" },
    { id: "field3", name: "campo_generado_2", type: "text" },
    { id: "field4", name: "campo_generado_2a", type: "text" },
    { id: "field5", name: "campo_generado_3", type: "text" },
    { id: "field6", name: "campo_generado_3a", type: "text", fraction: "1/4" },
    { id: "field7", name: "campo_generado_4", type: "text" },
    { id: "field8", name: "campo_generado_4a", type: "text" },
  ]

  // Obtener los detalles de la plantilla cuando se carga la vista
  useEffect(() => {
    if (templateId) {
      const selectedTemplate = templates.find((template) => template.id === templateId)
      setTemplateData(selectedTemplate)
    }
  }, [templateId])

  if (!templateData) {
    return <div className="flex justify-center items-center h-64">Cargando plantilla...</div>
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <Link href="/mis-plantillas" className="hover:text-primary">
          Mis plantillas
        </Link>
        <span className="mx-2">/</span>
        <span>Crear archivo a partir de plantilla</span>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Crear archivo a partir de plantilla</h1>
        <Button className="bg-primary hover:bg-primary text-white" onClick={() => setIsMultipleDocsModalOpen(true)}>
          Generar múltiples documentos
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Document Preview */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="font-medium mb-4">Vista previa del documento</h2>
          <div className="border border-dashed border-gray-300 rounded-lg h-96 flex items-center justify-center text-gray-400">
            Vista previa no disponible
          </div>
        </div>

        {/* Detected Fields */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="font-medium mb-4">Campos detectados</h2>
          <div className="grid grid-cols-2 gap-4">
            {detectedFields.map((field) => (
              <div key={field.id} className="space-y-1">
                <div className="flex items-center text-sm text-gray-500">
                  <span>{field.name}</span>
                  {field.fraction && (
                    <div className="flex items-center ml-2">
                      <span>{field.fraction}</span>
                      <div className="flex ml-1">
                        <ChevronLeft className="h-4 w-4" />
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  )}
                </div>
                <Input placeholder="" />
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Button className="bg-primary hover:bg-primary text-white">Guardar documento</Button>
          </div>
        </div>
      </div>

      {/* Multiple Documents Modal */}
      <Dialog open={isMultipleDocsModalOpen} onOpenChange={setIsMultipleDocsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-primary flex items-center justify-between">
              Generar múltiples documentos
              {/*}
              <Button variant="ghost" size="icon" onClick={() => setIsMultipleDocsModalOpen(false)} className="h-6 w-6">
                <X className="h-4 w-4" />
              </Button>*/}
            </DialogTitle>
            <DialogDescription>
              ¿Necesitas crear varios documentos a la vez? Esta función te permite hacerlo de forma rápida a partir de
              la plantilla.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <p className="font-medium">
                Paso 1: <span className="font-normal">Descarga el archivo Excel con los campos necesarios.</span>
              </p>
              <Button className="w-full mt-2 bg-primary hover:bg-primary text-white">Descargar Excel</Button>
            </div>

            <div>
              <p className="font-medium">
                Paso 2:{" "}
                <span className="font-normal">
                  Completa la información para cada documento, siguiendo las instrucciones dentro del archivo.
                </span>
              </p>
            </div>

            <div>
              <p className="font-medium">
                Paso 3: <span className="font-normal">Sube el Excel completo y deja que DocFlow haga el resto.</span>
              </p>

              <div className="mt-4 border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center">
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <p className="text-center font-medium">Arrastra y suelta tu archivo</p>
                <p className="text-center text-sm text-gray-500">o haz clic para seleccionarlo</p>
                <Button variant="outline" className="mt-4 border-primary text-primary hover:bg-gray-50">
                  Seleccionar archivos
                </Button>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setIsMultipleDocsModalOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-primary hover:bg-primary text-white">Siguiente</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CrearDocumento
