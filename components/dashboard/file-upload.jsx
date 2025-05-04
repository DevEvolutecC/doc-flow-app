"use client"

import { useState } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"

export function FileUpload({ onUpload }) {
  const [dragActive, setDragActive] = useState(false)

  const validateFiles = (files) => {
    const validFiles = []
    const invalidFiles = []

    Array.from(files).forEach((file) => {
      const fileType = file.name.split(".").pop()?.toLowerCase()

      if (fileType === "pdf" || fileType === "docx") {
        validFiles.push(file)
      } else {
        invalidFiles.push(file.name)
      }
    })

    if (invalidFiles.length > 0) {
      toast("Archivos no válidos, solo se aceptan archivos .docx y .pdf")
    }

    if (validFiles.length > 0) {
      toast("Archivos subidos correctamente")
    }

    return validFiles
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const validFiles = validateFiles(Array.from(e.dataTransfer.files))
      if (validFiles.length > 0) {
        onUpload(validFiles) // Solo se pasa a la función onUpload
      }
    }
  }

  const handleChange = (e) => {
    e.preventDefault()

    if (e.target.files && e.target.files.length > 0) {
      const validFiles = validateFiles(Array.from(e.target.files))
      if (validFiles.length > 0) {
        onUpload(validFiles) // Solo se pasa a la función onUpload
      }
    }
  }

  return (
    <Card className="border-dashed">
      <CardContent className="p-0">
        <div
          className={`relative flex flex-col items-center justify-center p-8 text-center ${dragActive ? "bg-muted/50" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
            <Upload className="invert h-10 w-10 text-white-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">Arrastra y suelta tus archivos</h3>
          <p className="mt-2 text-sm text-muted-foreground">o haz clic para seleccionar archivos</p>
          <p className="mt-1 text-xs text-muted-foreground">Solo se aceptan archivos .docx y .pdf</p>
          <label htmlFor="file-upload" className="mt-4">
            <input
              id="file-upload"
              type="file"
              className="sr-only"
              accept=".pdf,.docx"
              multiple
              onChange={handleChange}
            />
            <Button variant="outline" className="cursor-pointer">
              Seleccionar archivos
            </Button>
          </label>
          {dragActive && (
            <div className="absolute inset-0 z-10 bg-background/80 flex items-center justify-center">
              <div className="rounded-lg border border-dashed border-primary p-12 flex flex-col items-center">
                <Upload className="fill-white h-10 w-10 text-primary mb-2" />
                <p className="text-primary font-medium">Suelta los archivos aquí</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
