'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { TextractClient, AnalyzeDocumentCommand } from '@aws-sdk/client-textract';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { ComprehendClient, DetectEntitiesCommand } from '@aws-sdk/client-comprehend';
import usePdfProcessor from './usePdfProcessor';

// Configuración de AWS
const awsConfig = {
  region: 'us-east-1',
  identityPoolId: 'us-east-1:92771535-53bc-4898-8412-3e199a7391f4',
  textractConfig: {
    featureTypes: ['FORMS', 'TABLES']
  }
};

GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js`;

const SmartPdfEditor = () => {
  const [pdfUrl, setPdfUrl] = useState('');
  const [originalPdf, setOriginalPdf] = useState(null);
  const [editedPdfUrl, setEditedPdfUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [highlightedAreas, setHighlightedAreas] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const pdfViewerRef = useRef(null);

  const { processPdf, analysisResults, error } = usePdfProcessor(awsConfig);
  console.log('analysisResults', analysisResults)
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsProcessing(true);
    setPdfUrl('');
    setEditedPdfUrl('');
    setHighlightedAreas([]);
    setRecommendations([]);

    try {
      // // 1. Mostrar el PDF original
      const url = URL.createObjectURL(file);
      setPdfUrl(url);

      // 2. Procesar con Textract
      const response = await processPdf(file);

      // 3. Analizar contexto con Comprehend
      const textContext = extractTextForAnalysis(response);
      const entities = await analyzeTextWithComprehend(textContext);
      generateRecommendations(entities, response);

      // 4. Preparar áreas para resaltado
      prepareHighlightAreas(response);
    } catch (err) {
      console.error('Error al procesar PDF:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Analizar texto con Amazon Comprehend
  const analyzeTextWithComprehend = async (text) => {
    if (!text || text.length < 20) return []; // Comprehend necesita mínimo 20 caracteres
    
    const params = {
      Text: text,
      LanguageCode: 'es' // o 'en' según el idioma
    };

    try {
      const command = new DetectEntitiesCommand(params);
      const response = await comprehendClient.current.send(command);
      return response.Entities || [];
    } catch (err) {
      console.error('Error en Comprehend:', err);
      return [];
    }
  };

  // Extraer texto para análisis contextual
  const extractTextForAnalysis = (textractResponse) => {
    if (!textractResponse.Blocks) return '';
    
    return textractResponse.Blocks
      .filter(block => block.BlockType === 'LINE' && block.Text)
      .map(block => block.Text)
      .join('\n')
      .substring(0, 5000); // Límite de Comprehend
  };

  // Generar recomendaciones basadas en el análisis
  const generateRecommendations = (entities, textractData) => {
    const recs = [];
    
    // Ejemplo: Detectar fechas importantes
    const dates = entities.filter(e => e.Type === 'DATE');
    if (dates.length > 0) {
      recs.push({
        type: 'date',
        message: `Se detectaron ${dates.length} fechas importantes. Verifica que estén correctas.`,
        items: dates.map(d => d.Text)
      });
    }

    // Ejemplo: Detectar nombres propios
    const names = entities.filter(e => e.Type === 'PERSON');
    if (names.length > 0) {
      recs.push({
        type: 'person',
        message: `Se detectaron ${names.length} nombres propios. Confirma la ortografía.`,
        items: names.map(n => n.Text)
      });
    }

    // Ejemplo: Detectar posibles errores en tablas
    if (textractData.Blocks.some(b => b.BlockType === 'TABLE')) {
      recs.push({
        type: 'table',
        message: 'Se detectaron tablas. Revisa la alineación de los datos.',
        items: []
      });
    }

    setRecommendations(recs);
  };

  // Preparar áreas para resaltado interactivo
  const prepareHighlightAreas = (textractResponse) => {
    if (!textractResponse.Blocks) return;
    
    const lines = textractResponse.Blocks
      .filter(block => block.BlockType === 'LINE' && block.Text && block.Geometry)
      .map(block => ({
        text: block.Text,
        boundingBox: block.Geometry.BoundingBox,
        page: 1 // Asumimos primera página para este ejemplo
      }));

    setHighlightedAreas(lines);
  };

  // Resaltar texto en el visor PDF
  const highlightTextInViewer = () => {
    if (!pdfViewerRef.current || !highlightedAreas.length) return;
    
    const iframe = pdfViewerRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const pageContainer = iframeDoc.querySelector('.page');
    
    if (!pageContainer) return;

    // Eliminar resaltados anteriores
    const oldHighlights = iframeDoc.querySelectorAll('.text-highlight');
    oldHighlights.forEach(el => el.remove());
    
    // Añadir nuevos resaltados
    highlightedAreas.forEach(area => {
      const highlight = iframeDoc.createElement('div');
      highlight.className = 'text-highlight';
      highlight.style.position = 'absolute';
      highlight.style.left = `${area.boundingBox.Left * 100}%`;
      highlight.style.top = `${area.boundingBox.Top * 100}%`;
      highlight.style.width = `${area.boundingBox.Width * 100}%`;
      highlight.style.height = `${area.boundingBox.Height * 100}%`;
      highlight.style.backgroundColor = 'rgba(255, 255, 0, 0.3)';
      highlight.style.pointerEvents = 'auto';
      highlight.style.cursor = 'pointer';
      highlight.dataset.text = area.text;
      
      highlight.addEventListener('click', () => {
        handleTextSelection(area);
      });
      
      pageContainer.appendChild(highlight);
    });
  };

  // Manejar selección de texto para edición
  const handleTextSelection = (area) => {
    const text = prompt('Editar texto:', area.text);
    if (text !== null && text !== area.text) {
      // Aquí implementarías la lógica para actualizar el PDF
      console.log(`Texto cambiado de "${area.text}" a "${text}"`);
    }
  };

  // Generar PDF formal con cambios
  const generateFormalPdf = async () => {
    if (!originalPdf) return;
    
    setIsProcessing(true);
    try {
      // 1. Cargar el PDF original
      const pdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);
      
      // 2. Modificar el contenido (ejemplo)
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      
      // Aquí iría la lógica para aplicar los cambios reales
      // Por ahora solo un ejemplo de modificación
      firstPage.drawText('DOCUMENTO FORMAL', {
        x: 50,
        y: firstPage.getHeight() - 50,
        size: 16,
        color: rgb(0.2, 0.2, 0.2),
      });
      
      // 3. Guardar el PDF modificado
      const modifiedPdfBytes = await pdfDoc.save();
      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setEditedPdfUrl(url);
      
    } catch (err) {
      console.error('Error al generar PDF:', err);
      setError('Error al generar el documento formal');
    } finally {
      setIsProcessing(false);
    }
  };

  // Efecto para resaltar texto cuando hay áreas detectadas
  useEffect(() => {
    if (highlightedAreas.length > 0) {
      const timer = setTimeout(() => {
        highlightTextInViewer();
      }, 2000); // Dar tiempo al iframe para cargar
      
      return () => clearTimeout(timer);
    }
  }, [highlightedAreas]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Editor Inteligente de PDF</h1>
      
      <div className="space-y-6">
        {/* Subir PDF */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subir documento PDF (manuscrito o digital)
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            disabled={isProcessing}
          />
        </div>

        {isProcessing && (
          <div className="p-4 bg-blue-50 text-blue-700 rounded-md">
            <p>Analizando documento con IA...</p>
            <p className="text-sm mt-1">Esto puede tomar varios segundos.</p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Recomendaciones de IA */}
        {recommendations.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-800">Recomendaciones de IA:</h2>
            {recommendations.map((rec, index) => (
              <div key={index} className="p-3 bg-amber-50 border-l-4 border-amber-400 rounded">
                <p className="font-medium text-gray-800">{rec.message}</p>
                {rec.items.length > 0 && (
                  <ul className="mt-1 ml-4 list-disc text-sm text-gray-700">
                    {rec.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Visor de PDF con resaltados */}
        {pdfUrl && (
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <iframe
              ref={pdfViewerRef}
              src={pdfUrl}
              className="w-full h-[500px]"
              title="Visor de PDF con resaltados"
            />
            <div className="p-3 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Haz clic en las áreas resaltadas para editar el texto
              </p>
            </div>
          </div>
        )}

        {/* Controles de edición */}
        {pdfUrl && (
          <div className="flex space-x-4">
            <button
              onClick={generateFormalPdf}
              disabled={isProcessing}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
            >
              Generar PDF Formal
            </button>
          </div>
        )}

        {/* Vista previa del PDF editado */}
        {editedPdfUrl && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Documento Formal Generado:</h2>
            <iframe
              src={editedPdfUrl}
              className="w-full h-[500px] border border-gray-300 rounded-md"
              title="PDF formal generado"
            />
            <div className="mt-2">
              <a
                href={editedPdfUrl}
                download="documento_formal.pdf"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Descargar PDF Formal
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartPdfEditor;