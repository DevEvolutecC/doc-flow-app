'use client'; // Directiva para marcar este archivo como un Client Component

import { useState } from 'react';
import { Button } from "@/components/ui/button"; // Asegúrate de tener el componente Button disponible
import { Input } from "@/components/ui/input"; // Asegúrate de tener el componente Input disponible


const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const validTypes = [
        'application/pdf', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'application/rtf'
      ];

      if (validTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setStatus('Archivo listo para procesar');
      } else {
        setStatus('Formato no permitido. Solo se permiten PDF, DOCX, DOC, RTF');
        setFile(null);
      }
    }
  };

  const handleUpload = () => {
    if (!file) return;

    // Simulación de carga
    setStatus('Cargando...');
    let progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setStatus('Carga exitosa');
          if (onFileUpload) {
            onFileUpload(file); // Llamamos a la función onFileUpload si se pasa como prop
          }
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-md shadow-md max-w-sm mx-auto">
      <div className="w-full text-center mb-4">
        <label className="cursor-pointer flex flex-col items-center space-y-2">
          <div className="bg-blue-200 p-4 rounded-lg border border-dashed">
            <span className="text-blue-600">Arrastra y suelta el archivo o haz clic para seleccionar</span>
          </div>
          <Input
            type="file"
            accept=".pdf,.docx,.doc,.rtf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      <div className="w-full mt-4">
        {status && <p className="text-center text-sm text-gray-600">{status}</p>}
        {file && <p className="text-center text-sm text-gray-500">{file.name}</p>}
        
        {progress > 0 && (
          <div className="relative pt-1 mt-4">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  {progress}%
                </span>
              </div>
            </div>
            <div className="flex mb-2 items-center justify-between">
              <div className="relative flex mb-2 justify-center w-full">
                <div className="flex">
                  <div
                    className="bg-blue-600 text-xs leading-none py-1 text-center text-white whitespace-nowrap align-top"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Button onClick={handleUpload} className="w-full mt-4 bg-blue-500 text-white">
          Subir Documento
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
