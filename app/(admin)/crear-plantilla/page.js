"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Dashboard from "../../../components/dashboard/dashboard"
import { Amplify } from "aws-amplify"
import outputs from "@/amplify_outputs.json"
import { useSearchParams } from "next/navigation"
Amplify.configure(outputs)

export function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isCreating, setIsCreating] = useState(false)
  const [templateName, setTemplateName] = useState("")
  const [file, setFile] = useState(null)
  const [pdfUrl, setPdfUrl] = useState(null)

  useEffect(() => {
    const id = searchParams.get("id")
    if (id) {
      const fileUrl = `https://amplify-d2yl9rekppsb0u-ma-amplifyd2yl9rekppsb0umaa-ufu1izf4ntdk.s3.amazonaws.com/templates/${id}`
      setPdfUrl(fileUrl)
    }
  }, [searchParams])

  const handleCreateTemplate = () => {
    if (templateName.trim()) {
      setIsCreating(true)
      router.push("/crear-plantilla?id=" + file.name)
    } else {
      alert("Por favor, ingrese un nombre para la plantilla")
    }
  }

  // Función para volver a la lista de plantillas
  const goToTemplates = () => {
    router.push("/mis-plantillas")
  }

  return (
    <div>
      {/* Migas de pan */}
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/mis-plantillas" className="text-primary hover:underline">
          Mis plantillas
        </Link>{" "}
        /
        {isCreating ? (
          <>
            <Link
              href="/crear-plantilla"
              className="text-primary hover:underline"
            >
              {" "}
              Crear plantilla
            </Link>{" "}
            /<span className="text-primary"> Vista previa</span>
          </>
        ) : (
          <span className="text-primary"> Crear plantilla</span>
        )}
      </div>

      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary">
            {isCreating ? "Vista previa del documento" : "Crear plantilla"}
          </h1>
          <div className="mt-4">
            {!isCreating && (
              <>
                <label
                  htmlFor="templateName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre de la plantilla
                </label>
                <input
                  type="text"
                  id="templateName"
                  name="templateName"
                  className="p-[10px] mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  placeholder="Ingrese el nombre de la plantilla"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)} // Actualiza el nombre de la plantilla
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
          <Dashboard file={file} setFile={setFile} />

          {/* Botón para cambiar a la vista previa */}
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-primary text-white rounded-md shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              onClick={handleCreateTemplate} // Cambiar la vista al hacer clic
            >
              Crear plantilla
            </button>
          </div>
        </>
      ) : (
        // Mostrar la vista previa del documento cuando isCreating sea true
        <div className="flex">
          <div className="w-1/2 p-4">
            <div className="border shadow-[0px_3px_30px_#0000000D] rounded-md p-6">
              <p className="text-sm text-gray-500 mb-2">
          Vista previa del documento
              </p>
              <iframe
          src="/Contrato_Laboral_Colombia.pdf#toolbar=0&navpanes=0&scrollbar=0"
          className="h-76 w-full"
          title="Vista previa del PDF"
              />
            </div>
          </div>

          {/* Campos detectados */}
          <div className="w-1/2 p-4">
            <div className="border shadow-[0px_3px_30px_#0000000D] rounded-md p-6">
              <p className="text-sm text-gray-500 mb-2">Campos detectados</p>
              <div className="mb-4">
                <div className="flex justify-between flex-wrap">
                  <span className="w-full text-[#4E4E4E]-700">
                    Contratos
                  </span>
                  <span className="w-full text-[13px]">
                    (Página 2)
                  </span>
                  <button className="text-red-500">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>

                {["Campo 1", "Campo 2", "Campo 3"].map((campo, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mt-4"
                  >
                    <div className="w-1/2 pr-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Tipo
                      </label>
                      <select className="block w-full mt-1 border border-gray-300 text-[13px] text-gray-500 rounded-md p-2">
                        <option>Texto</option>
                      </select>
                    </div>
                    <div className="w-1/2 pl-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Validación
                      </label>
                      <select className="block w-full mt-1 border border-gray-300 text-[13px] text-gray-500 rounded-md p-2">
                        <option>Opcional</option>
                        <option>Requerido</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botones de navegación */}
            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                onClick={() => setIsCreating(false)} // Volver a la vista de crear plantilla
              >
                Volver
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-primary text-white rounded-md shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={goToTemplates} // Guardar y volver a mis plantillas
              >
                Guardar plantilla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardPage
