import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite' as any, // Use SQLite and bypass type checking with type assertion
  schema: './server/database/schema.ts',
  out: './server/database/migrations',
})
