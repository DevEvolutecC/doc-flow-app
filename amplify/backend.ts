import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { storage } from './storage/resource';
import { docToJson } from './functions/doc-to-json/resource';

defineBackend({
  auth,
  data,
  storage,
  docToJson
});
