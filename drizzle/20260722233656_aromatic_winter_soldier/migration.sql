ALTER TABLE `user` MODIFY COLUMN `EMAIL` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `PASSWORD` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `created` datetime DEFAULT (now());