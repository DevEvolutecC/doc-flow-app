import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: 'amplify-d2yl9rekppsb0u-ma-amplifyteamdrivebucket28-h6ijgcetu7zf',
  access: (allow) => ({
    'templates/*': [
      allow.authenticated.to(['read', 'write', 'delete']),
      allow.guest.to(['read', 'write', 'delete'])
    ],
  })
});