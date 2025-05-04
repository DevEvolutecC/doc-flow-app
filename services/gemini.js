const ai = new GoogleGenAI({
  apiKey: "AIzaSyCGFn6Xb5CulNZQBmPn-h5EdZmUyvvJ1jw",
})
import { GoogleGenAI } from "@google/genai"

export const geminiService = async (fileUrl) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Analiza el siguiente documento ubicado en ${fileUrl}. Este documento es una plantilla que se reutiliza para generar muchos otros documentos similares. La estructura es fija, pero algunos valores cambian. Identifica únicamente los campos que cambian entre documentos, es decir, los valores dinámicos. Por ejemplo, si en el documento te encuentras algo como "Nombre: Alvaro", quiero es que me devuelvas el objeto con su clave (nombre) y valor (alvaro). Según tu criterio, establece por prioridad los campos que más probabilidades tienen de cambiar, necesito que máximo el array de objetos tenga 10 elementos. Adicionalmente, devuélveme únicamente un array de objetos de cada campo con su respectivo valor, con el siguiente formato: [{}, {}, {}]. No escribas ninguna explicación, sin markdown, sin comentarios, solo el array plano. Para finalizar, dame un array de posibles mejoras que se le podría realizar al documento. Por ejemplo, faltas ortográficas o de gramatica. Por último, dame otro array de posibles errores de contexto que podrían pasar en el formato. Por ejemplo, algo como si un decreto que debería estipularse en el contrato no se encuentra. Que se lo recomiende. Quiero que estos tres arrays estén contenidos dentro de un único objeto, y que el objeto tenga la siguiente estructura: { "entries": [], "upgrade": [], "errors": [] }. Asegurate de no meterme la respuesta en un contenedor de markdown, ni comillas, ni nada. Solo el objeto plano. No me digas nada más. Me estoy refiriendo a las backticks con el json que se usa para insertar código en markdown. No me los pongas. Solo el objeto plano.`,
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
