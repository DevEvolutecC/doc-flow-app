import { Handler } from 'aws-lambda';
import { S3, Textract } from 'aws-sdk';

const s3 = new S3();
const textract = new Textract();

export const handler: Handler = async (event) => {
  try {
    const record = event.Records[0];
    const bucket = record.s3.bucket.name;
    const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, ' '));

    console.log(`Procesando archivo desde s3://${bucket}/${key}`);

    const textractResult = await textract
      .detectDocumentText({
        Document: {
          S3Object: {
            Bucket: bucket,
            Name: key,
          },
        },
      })
      .promise();

    const lines: string[] = [];
    textractResult.Blocks?.forEach((block) => {
      if (block.BlockType === 'LINE' && block.Text) {
        lines.push(block.Text);
      }
    });

    const result = {
      bucket,
      fileName: key,
      extractedText: lines,
    };

    console.log('Resultado de Textract:', JSON.stringify(result, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error('Error procesando el archivo:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error interno', error }),
    };
  }
};
