import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: 'amplifyTeamDrive',
  access: (allow) => ({
    'documents/*': [
      allow.authenticated.to(['read', 'write', 'delete']),
      allow.guest.to(['read', 'write', 'delete'])
    ],
  })
});