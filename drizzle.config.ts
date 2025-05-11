import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite' as any, // 使用 SQLite 并通过类型断言绕过检查
  schema: './server/database/schema.ts',
  out: './server/database/migrations',
})
