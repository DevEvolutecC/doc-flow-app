import { defineFunction } from '@aws-amplify/backend';

export const docToJson = defineFunction({
  name: 'doc-to-json',
  entry: './handler.ts'
});