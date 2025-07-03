import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userEmail: text('user_email').notNull(),
  paidAt: integer('paid_at', { mode: 'timestamp_ms' }).notNull(),
  sessionId: text('session_id').notNull(), // Session ID
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
})
