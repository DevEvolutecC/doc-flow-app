import { FileIcon, FileTextIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function FileList({ files } ) {
  if (files.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">No hay archivos subidos aún.</CardContent>
      </Card>
    )
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop()?.toLowerCase()

    if (extension === "pdf") {
      return <FileIcon className="h-4 w-4 text-red-500" />
    } else if (extension === "docx") {
      return <FileTextIcon className="h-4 w-4 text-blue-500" />
    }

    return <FileIcon className="h-4 w-4" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Archivos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Tipo</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Tamaño</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file, index) => (
              <TableRow key={index}>
                <TableCell>{getFileIcon(file.name)}</TableCell>
                <TableCell className="font-medium">{file.name}</TableCell>
                <TableCell>{formatFileSize(file.size)}</TableCell>
                <TableCell>{new Date().toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
