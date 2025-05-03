"use client"

import { useState } from "react"
import { AppSidebar } from "./app-sidebar"
import { FileUpload } from "./file-upload"
import { FileList } from "./file-list"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { uploadData } from "aws-amplify/storage";


function Dashboard() {
  const [files, setFiles] = useState([])

  // Función para manejar la carga de archivos a S3
  const handleFileUpload = async (newFiles) => {
    // Actualizamos el estado local con los nuevos archivos
    setFiles((prevFiles) => [...prevFiles, ...newFiles])

    // Cargar los archivos a S3
    try {
      for (const file of newFiles) {
        // Sube cada archivo a S3
        const fileName = `${Date.now()}-${file.name}` // Nombre único para evitar colisiones

        uploadData({
          data: file,
          path: `templates/${fileName}`,
          options: {
            bucket: "amplify-d2yl9rekppsb0u-ma-amplifyteamdrivebucket28-h6ijgcetu7zf",
          }
        })
        console.log(`Archivo subido: ${fileName}`)
      }
    } catch (error) {
      console.error("Error al subir archivo:", error)
    }
  }

  console.log(files)

  return (
    <SidebarProvider className="w-full">
      <SidebarInset className="w-full">
        <div className="flex flex-col min-h-screen w-full">
          <header className="border-b">
            <div className="flex h-16 items-center px-4">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
          </header>
          <main className="flex-1 p-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="col-span-2">
                <h2 className="text-primary text-2xl font-bold tracking-tight">
                  Subir Archivos
                </h2>
                <p className="text-muted-foreground mt-2">
                  Sube tus archivos en formato .docx o .pdf
                </p>
              </div>
              {files.length > 0 ? (
                <div className="col-span-2">
                  <h3 className="text-xl font-semibold mb-4">
                    Archivos Seleccionados
                  </h3>
                  <FileList files={files} />
                </div>
              ) : (
                <div className="col-span-2">
                  <FileUpload onUpload={handleFileUpload} />
                </div>
              )}
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}


export default Dashboard