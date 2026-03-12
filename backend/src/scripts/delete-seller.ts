import { Modules } from "@medusajs/framework/utils"

export default async function run({ container }) {
  const userModule = container.resolve(Modules.USER)
  const authModule = container.resolve(Modules.AUTH)
  const db = container.resolve("pgConnection") 

  const email = "sir.rob@holo.host"
  console.log(`Starting deletion process for ${email}...`)

  // 1. Delete the User Profile
  const users = await userModule.listUsers({ email })
  if (users.length > 0) {
    await userModule.deleteUsers(users.map(u => u.id))
    console.log(`✅ Deleted Medusa User profile.`)
  }

  // 2. Delete the Auth Identity
  const identities = await authModule.listAuthIdentities()
  const idsToDelete = identities
    .filter(i => JSON.stringify(i).includes(email))
    .map(i => i.id)

  if (idsToDelete.length > 0) {
    await authModule.deleteAuthIdentities(idsToDelete)
    console.log(`✅ Deleted Auth Identity.`)
  }

  // 3. Delete MercurJS Custom Records
  try {
    await db.raw(`DELETE FROM "seller" WHERE email = '${email}'`)
    console.log(`✅ Deleted MercurJS Seller record.`)
  } catch (e) { }

  try {
    await db.raw(`DELETE FROM "request" WHERE email = '${email}'`)
    console.log(`✅ Deleted MercurJS Registration Request.`)
  } catch (e) { }

  console.log("🎉 Deletion complete! You should be able to register again.")
}
