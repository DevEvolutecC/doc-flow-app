const ai = new GoogleGenAI({ apiKey: "AIzaSyCGFn6Xb5CulNZQBmPn-h5EdZmUyvvJ1jw" });
import { GoogleGenAI } from "@google/genai";

export const geminiService = async (fileUrl) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `necesito que tomes este documento (${fileUrl}) y analices cuales son esos campos dinamicos (este es un formato de un documento en donde tengo que hacer miles de estos, pero solamente cambiando ciertos valores, el resto de la estructura es igual). Quiero que me devuelvas un array con esos campos dinámicos. Necesito que únicamente me devuelvas el array, no quiero que me digas nada más. Omite el markdown y cualquier otro texto que no sea el array. El array tiene que tener la siguiente estructura: ["campo1", "campo2", "campo3"]`,
  })
  return response
}

// const finalResponse = await axios.post(
//   "https://backend-python-pwlz.onrender.com/process-document",
//   {
//     file: file, // Aquí se enviaría el contenido procesado
//     replacements, // Aquí se envían los valores de reemplazo
//   }
// )

// console.log("Documento Final:", finalResponse.data)