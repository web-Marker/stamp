CREATE TABLE `orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_email` text NOT NULL,
	`paid_at` integer NOT NULL,
	`session_id` text NOT NULL,
	`created_at` integer NOT NULL
);
