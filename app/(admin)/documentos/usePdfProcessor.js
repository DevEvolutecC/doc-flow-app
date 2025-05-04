import { useState, useRef, useEffect } from "react"
import {
  TextractClient,
  AnalyzeDocumentCommand,
} from "@aws-sdk/client-textract"
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers"

const usePdfProcessor = (awsConfig) => {
  const [analysisResults, setAnalysisResults] = useState(null)
  const [error, setError] = useState(null)
  const textractClient = useRef(null)

  useEffect(() => {
    textractClient.current = new TextractClient({
      region: awsConfig.region,
      credentials: fromCognitoIdentityPool({
        clientConfig: { region: awsConfig.region },
        identityPoolId: awsConfig.identityPoolId,
      }),
    })

    return () => {
      // Cleanup if necessary
    }
  }, [awsConfig])

  const processPdf = async (file) => {
    if (!file) return

    try {
      const arrayBuffer = await file.arrayBuffer()
      const params = {
        Document: { Bytes: new Uint8Array(arrayBuffer) },
        FeatureTypes: awsConfig.textractConfig.featureTypes,
      }

      const command = new AnalyzeDocumentCommand(params)
      const response = await textractClient.current.send(command)
      setAnalysisResults(response)
      return response
    } catch (err) {
      console.error("Error processing PDF with Textract:", err)
      setError(err.message)
      throw err
    }
  }

  return { processPdf, analysisResults, error }
}

export default usePdfProcessor
