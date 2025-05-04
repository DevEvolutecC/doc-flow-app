"use client"

import { useState } from "react"
import { FileUpload } from "./file-upload"
import { FileList } from "./file-list"
import { uploadData } from "aws-amplify/storage"
import { geminiService } from "../../services/gemini"
function Dashboard({ file, setFile }) {
  // Función para manejar la carga de archivos a S3
  const handleFileUpload = async (newFile) => {
    // Actualizamos el estado local con los nuevos archivos
    setFile(newFile[0])

    // Cargar los archivos a S3
    try {
        uploadData({
          data: file,
          path: `templates/${file?.name}`,
          options: {
            bucket:
              "amplify-d2yl9rekppsb0u-ma-amplifyteamdrivebucket28-h6ijgcetu7zf",
          },
        })
        const response = await geminiService(`https://amplify-d2yl9rekppsb0u-ma-amplifyd2yl9rekppsb0umaa-ufu1izf4ntdk.s3.amazonaws.com/templates/${file?.name}`)
        console.log(response.text);
    } catch (error) {
      console.error("Error al subir archivo:", error)
    }
  }


  console.log(file)

  return (
    <>
      <div className="w-full flex flex-col mb-5">
        {file ? (
          <div className="col-span-2">
            <h3 className="text-xl font-semibold mb-4">
              Archivos Seleccionados
            </h3>
            <FileList file={file} />
          </div>
        ) : (
          <div className="col-span-2">
            <FileUpload onUpload={handleFileUpload} />
          </div>
        )}
      </div>
    </>
  )
}

export default Dashboard
