"use client"

import { useState } from "react"
import { FileUpload } from "./file-upload"
import { FileList } from "./file-list"
import OpenAI from "openai"
import { uploadData } from "aws-amplify/storage"

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
            bucket:
              "amplify-d2yl9rekppsb0u-ma-amplifyteamdrivebucket28-h6ijgcetu7zf",
          },
        })
        const fileUrl = `https://amplify-d2yl9rekppsb0u-ma-amplifyd2yl9rekppsb0umaa-ufu1izf4ntdk.s3.amazonaws.com/templates/${fileName}`
        const client = new OpenAI()
        const base64String = file.toString("base64")
        const response = await client.responses.create({
          model: "gpt-4.1",
          input: [
            {
              role: "user",
              content: [
                {
                  type: "input_file",
                  filename: fileName,
                  file_data: `data:application/pdf;base64,${base64String}`,
                },
                {
                  type: "input_text",
                  text: `Necesito que tomes este documento ${fileUrl} y analices cuales son esos campos dinamicos (este es un formato de un documento en donde tengo que hacer miles de estos, pero solamente cambiando ciertos valores, el resto de la estructura es igual). En donde encuentres un campo dinamico hazlo con {}. Generame el documento con los campos dinamicos. No me digas nada mas, solo dame el documento.`,
                },
              ],
            },
          ],
        })
        console.log(response.text)
        console.log(`Archivo subido: ${fileName}`)
      }
    } catch (error) {
      console.error("Error al subir archivo:", error)
    }
  }

  console.log(files)

  return (
    <>
      <div className="w-full flex flex-col mb-5">
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
    </>
  )
}

export default Dashboard
