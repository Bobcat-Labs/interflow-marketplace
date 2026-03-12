import { Client } from "pg"
import { loadEnv } from "@medusajs/framework/utils"

export default async function run() {
  // Ensure the environment variables are forcefully loaded
  loadEnv(process.env.NODE_ENV || 'development', process.cwd())

  const email = "sir.rob@holo.host"
  console.log(`Cleaning up MercurJS records for ${email}...`)
  
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  })
  
  try {
    await client.connect()
    console.log(`✅ Connected to database successfully.`)
    
    // Search the database for the exact table names MercurJS is using
    const tableQuery = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema='public' AND (table_name ILIKE '%seller%' OR table_name ILIKE '%request%');
    `)
    console.log("🔍 Found relevant tables:", tableQuery.rows.map(r => r.table_name).join(", "))
    
    // Attempt the delete with explicit error logging
    const sellerDel = await client.query(`DELETE FROM "seller" WHERE email = $1`, [email])
    console.log(`✅ Deleted ${sellerDel.rowCount} record(s) from 'seller' table.`)
    
    const reqDel = await client.query(`DELETE FROM "request" WHERE email = $1`, [email])
    console.log(`✅ Deleted ${reqDel.rowCount} record(s) from 'request' table.`)
    
  } catch (e: any) {
    // DO NOT swallow the error this time!
    console.error(`🔴 SQL Error: ${e.message}`)
  } finally {
    await client.end()
  }
}
