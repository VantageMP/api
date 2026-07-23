-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `achievement` (
	`ID` bigint AUTO_INCREMENT PRIMARY KEY,
	`auto_update` bit(1),
	`category` varchar(255),
	`name` varchar(255),
	`progress_text` varchar(255),
	`should_overwrite_progress` bit(1) DEFAULT b'0',
	`stat_conversion` enum('None','FromMetersToDistance','FromMillisecondsToMinutes'),
	`update_trigger` text,
	`update_value` text,
	`visible` bit(1),
	`badge_definition_id` bigint NOT NULL,
	CONSTRAINT `UK_ACHIEVEMENT_badge_definition_id` UNIQUE INDEX(`badge_definition_id`)
);
--> statement-breakpoint
CREATE TABLE `achievement_rank` (
	`ID` bigint AUTO_INCREMENT PRIMARY KEY,
	`points` int,
	`rank` int,
	`rarity` float,
	`reward_description` varchar(255),
	`reward_type` varchar(255),
	`reward_visual_style` varchar(255),
	`threshold_value` int,
	`achievement_id` bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE `achievement_reward` (
	`ID` bigint AUTO_INCREMENT PRIMARY KEY,
	`internal_reward_description` varchar(255),
	`reward_description` varchar(255),
	`rewardScript` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `badge_definition` (
	`ID` bigint AUTO_INCREMENT PRIMARY KEY,
	`background` varchar(255),
	`border` varchar(255),
	`description` varchar(255),
	`icon` varchar(255),
	`name` varchar(255)
);
--> statement-breakpoint
CREATE TABLE `ban` (
	`id` bigint AUTO_INCREMENT PRIMARY KEY,
	`data` varchar(255),
	`ends_at` datetime,
	`reason` varchar(255),
	`type` varchar(255),
	`user_id` bigint,
	`started` datetime,
	`banned_by_id` bigint,
	`active` tinyint(1) DEFAULT true
);
--> statement-breakpoint
CREATE TABLE `car` (
	`id` bigint AUTO_INCREMENT PRIMARY KEY,
	`durability` int NOT NULL,
	`expirationDate` datetime,
	`heat` float NOT NULL,
	`ownershipType` varchar(255),
	`personaId` bigint NOT NULL,
	`baseCar` int NOT NULL,
	`carClassHash` int NOT NULL,
	`isPreset` bit(1) NOT NULL,
	`level` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`physicsProfileHash` int NOT NULL,
	`rating` int NOT NULL,
	`resalePrice` float NOT NULL,
	`rideHeightDrop` float NOT NULL,
	`skillModSlotCount` int NOT NULL,
	`version` int NOT NULL
);
--> statement-breakpoint
CREATE TABLE `car_classes` (
	`store_name` varchar(255) PRIMARY KEY,
	`full_name` varchar(255) NOT NULL,
	`manufactor` varchar(255) NOT NULL,
	`model` varchar(255) NOT NULL,
	`ts_stock` int,
	`ts_var1` int,
	`ts_var2` int,
	`ts_var3` int,
	`ac_stock` int,
	`ac_var1` int,
	`ac_var2` int,
	`ac_var3` int,
	`ha_stock` int,
	`ha_var1` int,
	`ha_var2` int,
	`ha_var3` int,
	`hash` int,
	`product_id` varchar(255),
	CONSTRAINT `store_name_index` UNIQUE INDEX(`store_name`)
);
--> statement-breakpoint
CREATE TABLE `card_pack` (
	`ID` bigint AUTO_INCREMENT PRIMARY KEY,
	`entitlementTag` varchar(255)
);
--> statement-breakpoint
CREATE TABLE `card_pack_item` (
	`ID` bigint AUTO_INCREMENT PRIMARY KEY,
	`script` text NOT NULL,
	`cardPackEntity_ID` bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE `category` (
	`idcategory` bigint AUTO_INCREMENT PRIMARY KEY,
	`catalogVersion` varchar(255),
	`categories` varchar(255),
	`displayName` varchar(255),
	`filterType` int,
	`icon` varchar(255),
	`id` bigint,
	`longDescription` varchar(255),
	`name` varchar(255),
	`priority` smallint,
	`shortDescription` varchar(255),
	`showInNavigationPane` bit(1),
	`showPromoPage` bit(1),
	`webIcon` varchar(255)
);
--> statement-breakpoint
CREATE TABLE `chat_announcement` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`announcementInterval` int,
	`announcementMessage` varchar(255),
	`channelMask` varchar(255)
);
--> statement-breakpoint
CREATE TABLE `chat_room` (
	`ID` bigint AUTO_INCREMENT PRIMARY KEY,
	`amount` int,
	`longName` varchar(255),
	`shortName` varchar(255)
);
--> statement-breakpoint
CREATE TABLE `event` (
	`ID` int AUTO_INCREMENT PRIMARY KEY,
	`eventModeId` int NOT NULL,
	`isEnabled` bit(1) DEFAULT b'1',
	`isLocked` bit(1) DEFAULT b'0',
	`rewardsTimeLimit` bigint NOT NULL DEFAULT 0,
	`maxCarClassRating` int NOT NULL,
	`maxLevel` int NOT NULL,
	`maxPlayers` int NOT NULL,
	`minCarClassRating` int NOT NULL,
	`minLevel` int NOT NULL,
	`name` varchar(255),
	`carClassHash` int NOT NULL,
	`trackLength` float NOT NULL,
	`isRotationEnabled` bit(1) DEFAULT b'0',
	`dnfTimerTime` int DEFAULT 60000,
	`lobbyCountdownTime` int DEFAULT 60000,
	`legitTime` bigint DEFAULT 0,
	`isDnfEnabled` bit(1) DEFAULT b'1',
	`isRaceAgainEnabled` bit(1) DEFAULT b'1',
	`singleplayer_reward_config_id` varchar(255) NOT NULL,
	`multiplayer_reward_config_id` varchar(255) NOT NULL,
	`private_reward_config_id` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `event_data` (
	`ID` bigint AUTO_INCREMENT PRIMARY KEY,
	`alternateEventDurationInMilliseconds` bigint NOT NULL,
	`bestLapDurationInMilliseconds` bigint NOT NULL,
	`bustedCount` int NOT NULL,
	`carId` bigint NOT NULL,
	`copsDeployed` int NOT NULL,
	`copsDisabled` int NOT NULL,
	`copsRammed` int NOT NULL,
	`costToState` int NOT NULL,
	`distanceToFinish` float NOT NULL,
	`eventDurationInMilliseconds` bigint NOT NULL,
	`eventModeId` int NOT NULL,
	`eventSessionId` bigint,
	`finishReason` int NOT NULL,
	`fractionCompleted` float NOT NULL,
	`hacksDetected` bigint NOT NULL,
	`heat` float NOT NULL,
	`infractions` int NOT NULL,
	`longestJumpDurationInMilliseconds` bigint NOT NULL,
	`numberOfCollisions` int NOT NULL,
	`perfectStart` int NOT NULL,
	`personaId` bigint,
	`rank` int NOT NULL,
	`roadBlocksDodged` int NOT NULL,
	`spikeStripsDodged` int NOT NULL,
	`sumOfJumpsDurationInMilliseconds` bigint NOT NULL,
	`topSpeed` float NOT NULL,
	`EVENTID` int,
	`isLegit` bit(1) DEFAULT b'0',
	`serverTimeInMilliseconds` bigint,
	`serverTimeStarted` bigint,
	`serverTimeEnded` bigint,
	`carClassHash` int,
	`carRating` int,
	`global_rank` int,
	CONSTRAINT `esi_personaId` UNIQUE INDEX(`eventSessionId`,`personaId`)
);
--> statement-breakpoint
CREATE TABLE `event_reward` (
	`ID` varchar(255) PRIMARY KEY,
	`baseRepReward` int NOT NULL DEFAULT 0,
	`levelRepRewardMultiplier` float NOT NULL DEFAULT 0,
	`finalRepRewardMultiplier` float NOT NULL DEFAULT 0,
	`perfectStartRepMultiplier` float NOT NULL DEFAULT 0,
	`topSpeedRepMultiplier` float NOT NULL DEFAULT 0,
	`rank1RepMultiplier` float NOT NULL DEFAULT 0,
	`rank2RepMultiplier` float NOT NULL DEFAULT 0,
	`rank3RepMultiplier` float NOT NULL DEFAULT 0,
	`rank4RepMultiplier` float NOT NULL DEFAULT 0,
	`rank5RepMultiplier` float NOT NULL DEFAULT 0,
	`rank6RepMultiplier` float NOT NULL DEFAULT 0,
	`rank7RepMultiplier` float NOT NULL DEFAULT 0,
	`rank8RepMultiplier` float NOT NULL DEFAULT 0,
	`baseCashReward` int NOT NULL DEFAULT 0,
	`levelCashRewardMultiplier` float NOT NULL DEFAULT 0,
	`finalCashRewardMultiplier` float NOT NULL DEFAULT 0,
	`perfectStartCashMultiplier` float NOT NULL DEFAULT 0,
	`topSpeedCashMultiplier` float NOT NULL DEFAULT 0,
	`rank1CashMultiplier` float NOT NULL DEFAULT 0,
	`rank2CashMultiplier` float NOT NULL DEFAULT 0,
	`rank3CashMultiplier` float NOT NULL DEFAULT 0,
	`rank4CashMultiplier` float NOT NULL DEFAULT 0,
	`rank5CashMultiplier` float NOT NULL DEFAULT 0,
	`rank6CashMultiplier` float NOT NULL DEFAULT 0,
	`rank7CashMultiplier` float NOT NULL DEFAULT 0,
	`rank8CashMultiplier` float NOT NULL DEFAULT 0,
	`minTopSpeedTrigger` float NOT NULL DEFAULT 0,
	`rewardTable_rank1_id` bigint,
	`rewardTable_rank2_id` bigint,
	`rewardTable_rank3_id` bigint,
	`rewardTable_rank4_id` bigint,
	`rewardTable_rank5_id` bigint,
	`rewardTable_rank6_id` bigint,
	`rewardTable_rank7_id` bigint,
	`rewardTable_rank8_id` bigint
);
--> statement-breakpoint
CREATE TABLE `event_session` (
	`ID` bigint AUTO_INCREMENT PRIMARY KEY,
	`EVENTID` int,
	`ENDED` bigint,
	`STARTED` bigint,
	`LOBBYID` bigint,
	`NEXTLOBBYID` bigint
);
--> statement-breakpoint
CREATE TABLE `hardware_info` (
	`ID` bigint AUTO_INCREMENT PRIMARY KEY,
	`banned` bit(1) NOT NULL,
	`hardwareHash` varchar(255),
	`hardwareInfo` longtext,
	`userId` bigint
);
--> statement-breakpoint
CREATE TABLE `inventory` (
	`id` bigint AUTO_INCREMENT PRIMARY KEY,
	`performancePartsCapacity` int,
	`performancePartsUsedSlotCount` int,
	`skillModPartsCapacity` int,
	`skillModPartsUsedSlotCount` int,
	`visualPartsCapacity` int,
	`visualPartsUsedSlotCount` int,
	`personaId` bigint
);
--> statement-breakpoint
CREATE TABLE `invite_ticket` (
	`ID` bigint AUTO_INCREMENT PRIMARY KEY,
	`DISCORD_NAME` varchar(255),
	`TICKET` varchar(255),
	`USERID` bigint
);
--> statement-breakpoint
CREATE TABLE `level_rep` (
	`level` bigint AUTO_INCREMENT PRIMARY KEY,
	`expPoint` bigint
);
--> statement-breakpoint
CREATE TABLE `lobby` (
	`ID` bigint AUTO_INCREMENT PRIMARY KEY,
	`isPrivate` bit(1),
	`lobbyDateTimeStart` datetime,
	`personaId` bigint,
	`EVENTID` int,
	`startedTime` datetime
);
--> statement-breakpoint
CREATE TABLE `lobby_entrant` (
	`id` bigint AUTO_INCREMENT PRIMARY KEY,
	`gridIndex` int NOT NULL,
	`LOBBYID` bigint,
	`PERSONAID` bigint
);
--> statement-breakpoint
CREATE TABLE `login_announcement` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`imageUrl` varchar(255),
	`target` varchar(255),
	`type` varchar(255),
	`context` varchar(255) NOT NULL DEFAULT 'NotApplicable',
	`language` varchar(255)
);
--> statement-breakpoint
CREATE TABLE `news_article` (
	`id` bigint AUTO_INCREMENT PRIMARY KEY,
	`filters` varchar(255),
	`iconType` int,
	`longHALId` varchar(255),
	`parameters` varchar(1000),
	`shortHALId` varchar(255),
	`sticky` int,
	`timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`type` varchar(255),
	`persona_id` bigint,
	`referenced_persona_id` bigint
);
--> statement-breakpoint
CREATE TABLE `online_users` (
	`ID` int PRIMARY KEY,
	`numberOfOnline` bigint NOT NULL,
	`numberOfRegistered` bigint NOT NULL,
	CONSTRAINT `ONLINE_USERS_id_index` UNIQUE INDEX(`ID`)
);
--> statement-breakpoint
CREATE TABLE `persona` (
	`ID` bigint AUTO_INCREMENT PRIMARY KEY,
	`boost` double NOT NULL,
	`cash` double NOT NULL,
	`curCarIndex` int NOT NULL,
	`iconIndex` int NOT NULL,
	`level` int NOT NULL,
	`motto` varchar(255),
	`name` varchar(255),
	`percentToLevel` float NOT NULL,
	`rating` double NOT NULL,
	`rep` double NOT NULL,
	`repAtCurrentLevel` int NOT NULL,
	`score` int NOT NULL,
	`USERID` bigint,
	`created` datetime,
	`badges` varchar(2048),
	`first_login` datetime,
	`last_login` datetime,
	`numCarSlots` int NOT NULL DEFAULT 250,
	CONSTRAINT `PERSONA_name_index` UNIQUE INDEX(`name`)
);
--> statement-breakpoint
CREATE TABLE `reward_table` (
	`ID` bigint AUTO_INCREMENT PRIMARY KEY,
	`name` varchar(255),
	CONSTRAINT `REWARD_TABLE_name_index` UNIQUE INDEX(`name`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`ID` bigint AUTO_INCREMENT PRIMARY KEY,
	`EMAIL` varchar(255),
	`PASSWORD` varchar(50),
	`premium` bit(1) NOT NULL DEFAULT b'0',
	`isAdmin` bit(1),
	`HWID` varchar(255),
	`IP_ADDRESS` varchar(255),
	`created` datetime,
	`lastLogin` datetime,
	`gameHardwareHash` varchar(255),
	`isLocked` bit(1),
	`selectedPersonaIndex` int DEFAULT 0,
	CONSTRAINT `USER_email_index` UNIQUE INDEX(`EMAIL`)
);
--> statement-breakpoint
CREATE TABLE `amplifiers` (
	`id` bigint AUTO_INCREMENT PRIMARY KEY,
	`ampType` varchar(255),
	`cashMultiplier` float,
	`repMultiplier` float,
	`product_id` varchar(255) NOT NULL,
	CONSTRAINT `UK_AMPLIFIERS_product_id` UNIQUE INDEX(`product_id`)
);
--> statement-breakpoint
CREATE TABLE `basketdefinition` (
	`productId` varchar(255) PRIMARY KEY,
	`ownedCarTrans` longtext,
	CONSTRAINT `BASKETDEFINITION_productId_uindex` UNIQUE INDEX(`productId`)
);
--> statement-breakpoint
CREATE TABLE `gift_code` (
	`code` varchar(255) PRIMARY KEY,
	`name` varchar(255) NOT NULL,
	`product_id` varchar(255) NOT NULL,
	`use_count` int DEFAULT 1,
	`beginTime` timestamp NOT NULL,
	`endTime` timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE `inventory_item` (
	`id` bigint AUTO_INCREMENT PRIMARY KEY,
	`expirationDate` datetime,
	`remainingUseCount` int,
	`resellPrice` int,
	`status` varchar(255) NOT NULL,
	`inventoryEntity_id` bigint NOT NULL,
	`productId` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `paint` (
	`id` bigint AUTO_INCREMENT PRIMARY KEY,
	`paintGroup` int,
	`hue` int NOT NULL,
	`sat` int NOT NULL,
	`slot` int NOT NULL,
	`paintVar` int,
	`carId` bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE `parameter` (
	`name` varchar(255) PRIMARY KEY,
	`value` varchar(255),
	CONSTRAINT `PARAMETER_name_index` UNIQUE INDEX(`name`)
);
--> statement-breakpoint
CREATE TABLE `performancepart` (
	`id` bigint AUTO_INCREMENT PRIMARY KEY,
	`performancePartAttribHash` int NOT NULL,
	`carId` bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE `persona_achievement` (
	`ID` bigint AUTO_INCREMENT PRIMARY KEY,
	`can_progress` bit(1),
	`current_value` bigint,
	`achievement_id` bigint NOT NULL,
	`persona_id` bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE `persona_achievement_rank` (
	`ID` bigint AUTO_INCREMENT PRIMARY KEY,
	`achieved_on` datetime,
	`state` enum('Locked','InProgress','Completed','RewardWaiting'),
	`achievement_rank_id` bigint NOT NULL,
	`persona_achievement_id` bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE `persona_badge` (
	`ID` bigint AUTO_INCREMENT PRIMARY KEY,
	`slot` int,
	`badge_definition_id` bigint NOT NULL,
	`persona_id` bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE `persona_gift` (
	`id` bigint AUTO_INCREMENT PRIMARY KEY,
	`persona_id` bigint NOT NULL,
	`code` varchar(255) NOT NULL,
	`use_count` int NOT NULL,
	CONSTRAINT `UK_PERSONA_ID_CODE` UNIQUE INDEX(`persona_id`,`code`)
);
--> statement-breakpoint
CREATE TABLE `product` (
	`id` bigint AUTO_INCREMENT PRIMARY KEY,
	`accel` int,
	`brand` varchar(255),
	`categoryId` varchar(255),
	`categoryName` varchar(255),
	`currency` varchar(255) NOT NULL,
	`description` varchar(255),
	`dropWeight` double,
	`durationMinute` int NOT NULL,
	`enabled` bit(1) NOT NULL,
	`entitlementTag` varchar(255),
	`handling` int,
	`hash` int,
	`icon` varchar(255) NOT NULL,
	`isDropable` bit(1) NOT NULL,
	`level` int NOT NULL,
	`longDescription` varchar(255),
	`minLevel` int NOT NULL,
	`premium` bit(1) NOT NULL,
	`price` float NOT NULL,
	`priority` int NOT NULL,
	`productId` varchar(255) NOT NULL,
	`productTitle` varchar(255),
	`productType` varchar(255) NOT NULL,
	`rarity` int,
	`resalePrice` float NOT NULL,
	`secondaryIcon` varchar(255),
	`skillValue` float,
	`subType` varchar(255),
	`topSpeed` int,
	`useCount` int NOT NULL,
	`visualStyle` varchar(255),
	`webIcon` varchar(255),
	`webLocation` varchar(255),
	`parentProductId` bigint,
	`bundleItems` mediumtext,
	`rewardTitle` varchar(255),
	`isGift` tinyint(1) NOT NULL DEFAULT false,
	CONSTRAINT `UK_PRODUCT_productId` UNIQUE INDEX(`productId`)
);
--> statement-breakpoint
CREATE TABLE `promo_code` (
	`id` bigint AUTO_INCREMENT PRIMARY KEY,
	`isUsed` bit(1),
	`promoCode` varchar(255),
	`USERID` bigint
);
--> statement-breakpoint
CREATE TABLE `recovery_password` (
	`id` bigint AUTO_INCREMENT PRIMARY KEY,
	`expirationDate` datetime,
	`isClose` bit(1),
	`randomKey` varchar(255),
	`userId` bigint
);
--> statement-breakpoint
CREATE TABLE `report` (
	`id` bigint AUTO_INCREMENT PRIMARY KEY,
	`abuserPersonaId` bigint,
	`chatMinutes` int,
	`customCarID` int,
	`description` varchar(255),
	`hacksdetected` bigint,
	`personaId` bigint,
	`petitionType` int
);
--> statement-breakpoint
CREATE TABLE `reward_table_item` (
	`ID` bigint AUTO_INCREMENT PRIMARY KEY,
	`dropWeight` double,
	`script` text NOT NULL,
	`rewardTableEntity_ID` bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE `skillmodpart` (
	`id` bigint AUTO_INCREMENT PRIMARY KEY,
	`isFixed` bit(1) NOT NULL,
	`skillModPartAttribHash` int NOT NULL,
	`carId` bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE `social_relationship` (
	`ID` bigint AUTO_INCREMENT PRIMARY KEY,
	`remotePersonaId` bigint,
	`status` bigint,
	`fromUserId` bigint,
	`userId` bigint
);
--> statement-breakpoint
CREATE TABLE `treasure_hunt` (
	`personaId` bigint PRIMARY KEY,
	`coinsCollected` int,
	`isStreakBroken` bit(1),
	`numCoins` int,
	`seed` int,
	`streak` int,
	`thDate` date,
	`isCompleted` bit(1) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `treasure_hunt_config` (
	`ID` bigint AUTO_INCREMENT PRIMARY KEY,
	`base_cash` float,
	`base_rep` float,
	`cash_multiplier` float,
	`rep_multiplier` float,
	`streak` int,
	`reward_table_id` bigint
);
--> statement-breakpoint
CREATE TABLE `used_powerup` (
	`id` bigint AUTO_INCREMENT PRIMARY KEY,
	`personaId` bigint NOT NULL,
	`eventSessionId` bigint,
	`powerupHash` int NOT NULL,
	`recorded_at` timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `vinyl` (
	`id` bigint AUTO_INCREMENT PRIMARY KEY,
	`hash` int NOT NULL,
	`hue1` int NOT NULL,
	`hue2` int NOT NULL,
	`hue3` int NOT NULL,
	`hue4` int NOT NULL,
	`layer` int NOT NULL,
	`mir` bit(1) NOT NULL,
	`rot` int NOT NULL,
	`sat1` int NOT NULL,
	`sat2` int NOT NULL,
	`sat3` int NOT NULL,
	`sat4` int NOT NULL,
	`scalex` int NOT NULL,
	`scaley` int NOT NULL,
	`shear` int NOT NULL,
	`tranx` int NOT NULL,
	`trany` int NOT NULL,
	`var1` int NOT NULL,
	`var2` int NOT NULL,
	`var3` int NOT NULL,
	`var4` int NOT NULL,
	`carId` bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE `vinylproduct` (
	`id` bigint AUTO_INCREMENT PRIMARY KEY,
	`bundleItems` varchar(255),
	`categoryId` varchar(255),
	`categoryName` varchar(255),
	`currency` varchar(255),
	`description` varchar(255),
	`durationMinute` int NOT NULL,
	`enabled` bit(1) NOT NULL,
	`entitlementTag` varchar(255),
	`hash` int,
	`icon` varchar(255),
	`level` int NOT NULL,
	`longDescription` varchar(255),
	`minLevel` int NOT NULL,
	`premium` bit(1) NOT NULL,
	`price` float NOT NULL,
	`priority` int NOT NULL,
	`productId` varchar(255),
	`productTitle` varchar(255),
	`productType` varchar(255),
	`secondaryIcon` varchar(255),
	`useCount` int NOT NULL,
	`visualStyle` varchar(255),
	`webIcon` varchar(255),
	`webLocation` varchar(255),
	`parentCategoryId` bigint
);
--> statement-breakpoint
CREATE TABLE `virtualitem` (
	`itemName` varchar(255) PRIMARY KEY,
	`brand` varchar(255),
	`hash` int,
	`icon` varchar(255),
	`longdescription` varchar(255),
	`rarity` int,
	`resellprice` int,
	`shortdescription` varchar(255),
	`subType` varchar(255),
	`tier` int,
	`title` varchar(255),
	`type` varchar(255),
	`warnondelete` bit(1)
);
--> statement-breakpoint
CREATE TABLE `visualpart` (
	`id` bigint AUTO_INCREMENT PRIMARY KEY,
	`partHash` int NOT NULL,
	`slotHash` int NOT NULL,
	`carId` bigint NOT NULL
);
--> statement-breakpoint
CREATE INDEX `PRODUCT_hash_index` ON `product` (`hash`);--> statement-breakpoint
CREATE INDEX `PRODUCT_entitlementTag_index` ON `product` (`entitlementTag`);--> statement-breakpoint
CREATE INDEX `PRODUCT_availability_index` ON `product` (`categoryName`,`productType`,`enabled`,`minLevel`,`premium`);--> statement-breakpoint
CREATE INDEX `persona_ach_index` ON `persona_achievement` (`persona_id`,`achievement_id`);--> statement-breakpoint
CREATE INDEX `parent_prod_id_index` ON `product` (`parentProductId`);--> statement-breakpoint
CREATE INDEX `HARDWARE_INFO_hardwareHash_index` ON `hardware_info` (`hardwareHash`);--> statement-breakpoint
CREATE INDEX `hash_index` ON `used_powerup` (`powerupHash`);--> statement-breakpoint
CREATE INDEX `INVITE_TICKET_TICKET_index` ON `invite_ticket` (`TICKET`);--> statement-breakpoint
CREATE INDEX `INVENTORY_ITEM_expirationDate_index` ON `inventory_item` (`expirationDate`);--> statement-breakpoint
CREATE INDEX `prod_id_index` ON `product` (`productId`);--> statement-breakpoint
CREATE INDEX `IDX_CAR_ownershipType` ON `car` (`ownershipType`);--> statement-breakpoint
CREATE INDEX `store_name_key` ON `car_classes` (`store_name`);--> statement-breakpoint
CREATE INDEX `hash_index` ON `car_classes` (`hash`);--> statement-breakpoint
CREATE INDEX `IDX_CAR_expirationDate` ON `car` (`expirationDate`);--> statement-breakpoint
CREATE INDEX `BAN_existence_index` ON `ban` (`user_id`,`ends_at`);--> statement-breakpoint
CREATE INDEX `BAN_endsAt_index` ON `ban` (`ends_at`);--> statement-breakpoint
CREATE INDEX `ACHIEVEMENT_REWARD_internal_reward_description_index` ON `achievement_reward` (`internal_reward_description`);--> statement-breakpoint
CREATE INDEX `ACHIEVEMENT_category_index` ON `achievement` (`category`);--> statement-breakpoint
CREATE INDEX `finishreason_index` ON `event_data` (`finishReason`);--> statement-breakpoint
CREATE INDEX `car_id_index` ON `event_data` (`carId`);--> statement-breakpoint
CREATE INDEX `EVENT_DATA_persona_id_index` ON `event_data` (`personaId`);--> statement-breakpoint
CREATE INDEX `LOBBY_startedTime_index` ON `lobby` (`startedTime`);--> statement-breakpoint
CREATE INDEX `test_index` ON `event` (`ID`,`name`);--> statement-breakpoint
CREATE INDEX `EVENT_availability_index` ON `event` (`isEnabled`,`minLevel`,`maxLevel`);--> statement-breakpoint
ALTER TABLE `achievement` ADD CONSTRAINT `FK_ACHIEVEMENT_BADGE_DEFINITION_badge_definition_id` FOREIGN KEY (`badge_definition_id`) REFERENCES `badge_definition`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `achievement_rank` ADD CONSTRAINT `FK_ACHIEVEMENT_RANK_ACHIEVEMENT_achievement_id` FOREIGN KEY (`achievement_id`) REFERENCES `achievement`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `amplifiers` ADD CONSTRAINT `FK_AMPLIFIERS_PRODUCT_product_id` FOREIGN KEY (`product_id`) REFERENCES `product`(`productId`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `ban` ADD CONSTRAINT `FK_BAN_PERSONA_banned_by_id` FOREIGN KEY (`banned_by_id`) REFERENCES `persona`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `ban` ADD CONSTRAINT `FK_BAN_USER_user_id` FOREIGN KEY (`user_id`) REFERENCES `user`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `basketdefinition` ADD CONSTRAINT `FK_BASKETDEFINITION_PRODUCT_productId` FOREIGN KEY (`productId`) REFERENCES `product`(`productId`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `car` ADD CONSTRAINT `FK_CAR_PERSONA_personaId` FOREIGN KEY (`personaId`) REFERENCES `persona`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `card_pack_item` ADD CONSTRAINT `FK_CARD_PACK_ITEM_CARD_PACK_cardPackEntity_ID` FOREIGN KEY (`cardPackEntity_ID`) REFERENCES `card_pack`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `event` ADD CONSTRAINT `FK_EVENT_MULTIPLAYER_REWARD_CONFIG_ID` FOREIGN KEY (`multiplayer_reward_config_id`) REFERENCES `event_reward`(`ID`);--> statement-breakpoint
ALTER TABLE `event` ADD CONSTRAINT `FK_EVENT_PRIVATE_REWARD_CONFIG_ID` FOREIGN KEY (`private_reward_config_id`) REFERENCES `event_reward`(`ID`);--> statement-breakpoint
ALTER TABLE `event` ADD CONSTRAINT `FK_EVENT_SINGLEPLAYER_REWARD_CONFIG_ID` FOREIGN KEY (`singleplayer_reward_config_id`) REFERENCES `event_reward`(`ID`);--> statement-breakpoint
ALTER TABLE `event_data` ADD CONSTRAINT `FK_EVENT_DATA_EVENT_EVENTID` FOREIGN KEY (`EVENTID`) REFERENCES `event`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `event_data` ADD CONSTRAINT `FK_EVENT_DATA_EVENT_SESSION_eventSessionId` FOREIGN KEY (`eventSessionId`) REFERENCES `event_session`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `event_data` ADD CONSTRAINT `FK_EVENT_DATA_PERSONA_personaId` FOREIGN KEY (`personaId`) REFERENCES `persona`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `event_reward` ADD CONSTRAINT `FK_EVENT_REWARD_RANK1TABLE_ID` FOREIGN KEY (`rewardTable_rank1_id`) REFERENCES `reward_table`(`ID`);--> statement-breakpoint
ALTER TABLE `event_reward` ADD CONSTRAINT `FK_EVENT_REWARD_RANK2TABLE_ID` FOREIGN KEY (`rewardTable_rank2_id`) REFERENCES `reward_table`(`ID`);--> statement-breakpoint
ALTER TABLE `event_reward` ADD CONSTRAINT `FK_EVENT_REWARD_RANK3TABLE_ID` FOREIGN KEY (`rewardTable_rank3_id`) REFERENCES `reward_table`(`ID`);--> statement-breakpoint
ALTER TABLE `event_reward` ADD CONSTRAINT `FK_EVENT_REWARD_RANK4TABLE_ID` FOREIGN KEY (`rewardTable_rank4_id`) REFERENCES `reward_table`(`ID`);--> statement-breakpoint
ALTER TABLE `event_reward` ADD CONSTRAINT `FK_EVENT_REWARD_RANK5TABLE_ID` FOREIGN KEY (`rewardTable_rank5_id`) REFERENCES `reward_table`(`ID`);--> statement-breakpoint
ALTER TABLE `event_reward` ADD CONSTRAINT `FK_EVENT_REWARD_RANK6TABLE_ID` FOREIGN KEY (`rewardTable_rank6_id`) REFERENCES `reward_table`(`ID`);--> statement-breakpoint
ALTER TABLE `event_reward` ADD CONSTRAINT `FK_EVENT_REWARD_RANK7TABLE_ID` FOREIGN KEY (`rewardTable_rank7_id`) REFERENCES `reward_table`(`ID`);--> statement-breakpoint
ALTER TABLE `event_reward` ADD CONSTRAINT `FK_EVENT_REWARD_RANK8TABLE_ID` FOREIGN KEY (`rewardTable_rank8_id`) REFERENCES `reward_table`(`ID`);--> statement-breakpoint
ALTER TABLE `event_session` ADD CONSTRAINT `FK_EVENT_SESSION_EVENT_EVENTID` FOREIGN KEY (`EVENTID`) REFERENCES `event`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `event_session` ADD CONSTRAINT `FK_EVENT_SESSION_LOBBY_LOBBYID` FOREIGN KEY (`LOBBYID`) REFERENCES `lobby`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `event_session` ADD CONSTRAINT `FK_EVENT_SESSION_LOBBY_NEXTLOBBYID` FOREIGN KEY (`NEXTLOBBYID`) REFERENCES `lobby`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `gift_code` ADD CONSTRAINT `FK_GIFT_CODE_PRODUCT_product_id` FOREIGN KEY (`product_id`) REFERENCES `product`(`productId`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `inventory` ADD CONSTRAINT `FK_INVENTORY_PERSONA_personaId` FOREIGN KEY (`personaId`) REFERENCES `persona`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `inventory_item` ADD CONSTRAINT `FK_INVENTORY_ITEM_INVENTORY_inventoryEntity_id` FOREIGN KEY (`inventoryEntity_id`) REFERENCES `inventory`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `inventory_item` ADD CONSTRAINT `FK_INVENTORY_ITEM_PRODUCT_productId` FOREIGN KEY (`productId`) REFERENCES `product`(`productId`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `invite_ticket` ADD CONSTRAINT `FK_INVITE_TICKET_USER_USERID` FOREIGN KEY (`USERID`) REFERENCES `user`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `lobby` ADD CONSTRAINT `FK_LOBBY_EVENT_EVENTID` FOREIGN KEY (`EVENTID`) REFERENCES `event`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `lobby_entrant` ADD CONSTRAINT `FK_LOBBY_ENTRANT_LOBBY_LOBBYID` FOREIGN KEY (`LOBBYID`) REFERENCES `lobby`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `lobby_entrant` ADD CONSTRAINT `FK_LOBBY_ENTRANT_PERSONA_PERSONAID` FOREIGN KEY (`PERSONAID`) REFERENCES `persona`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `news_article` ADD CONSTRAINT `FK_NEWS_ARTICLE_PERSONA_persona_id` FOREIGN KEY (`persona_id`) REFERENCES `persona`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `news_article` ADD CONSTRAINT `FK_NEWS_ARTICLE_PERSONA_referenced_persona_id` FOREIGN KEY (`referenced_persona_id`) REFERENCES `persona`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `paint` ADD CONSTRAINT `FK_PAINT_CAR_carId` FOREIGN KEY (`carId`) REFERENCES `car`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `performancepart` ADD CONSTRAINT `FK_PERFORMANCEPART_CAR_carId` FOREIGN KEY (`carId`) REFERENCES `car`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `persona` ADD CONSTRAINT `FK_PERSONA_USER_USERID` FOREIGN KEY (`USERID`) REFERENCES `user`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `persona_achievement` ADD CONSTRAINT `FK_PERSONA_ACHIEVEMENT_ACHIEVEMENT_achievement_id` FOREIGN KEY (`achievement_id`) REFERENCES `achievement`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `persona_achievement` ADD CONSTRAINT `FK_PERSONA_ACHIEVEMENT_PERSONA_persona_id` FOREIGN KEY (`persona_id`) REFERENCES `persona`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `persona_achievement_rank` ADD CONSTRAINT `FK_PERSONA_ACHIEVEMENT_RANK_ACHIEVEMENT_RANK_id` FOREIGN KEY (`achievement_rank_id`) REFERENCES `achievement_rank`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `persona_achievement_rank` ADD CONSTRAINT `FK_PERSONA_ACHIEVEMENT_RANK_PERSONA_ACHIEVEMENT_id` FOREIGN KEY (`persona_achievement_id`) REFERENCES `persona_achievement`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `persona_badge` ADD CONSTRAINT `FK_PERSONA_BADGE_BADGE_DEFINITION_badge_definition_id` FOREIGN KEY (`badge_definition_id`) REFERENCES `badge_definition`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `persona_badge` ADD CONSTRAINT `FK_PERSONA_BADGE_PERSONA_persona_id` FOREIGN KEY (`persona_id`) REFERENCES `persona`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `persona_gift` ADD CONSTRAINT `FK_PERSONA_GIFT_GIFT_CODE_code` FOREIGN KEY (`code`) REFERENCES `gift_code`(`code`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `persona_gift` ADD CONSTRAINT `FK_PERSONA_GIFT_PERSONA_persona_id` FOREIGN KEY (`persona_id`) REFERENCES `persona`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `product` ADD CONSTRAINT `FK_PRODUCT_PRODUCT_parentProductId` FOREIGN KEY (`parentProductId`) REFERENCES `product`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `promo_code` ADD CONSTRAINT `FK_PROMO_CODE_USER_USERID` FOREIGN KEY (`USERID`) REFERENCES `user`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `reward_table_item` ADD CONSTRAINT `FK_REWARD_TABLE_ITEM_REWARD_TABLE_rewardTableEntity_ID` FOREIGN KEY (`rewardTableEntity_ID`) REFERENCES `reward_table`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `skillmodpart` ADD CONSTRAINT `FK_SKILLMODPART_CAR_carId` FOREIGN KEY (`carId`) REFERENCES `car`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `social_relationship` ADD CONSTRAINT `FK_SOCIAL_RELATIONSHIP_PERSONA_remotePersonaId` FOREIGN KEY (`remotePersonaId`) REFERENCES `persona`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `social_relationship` ADD CONSTRAINT `FK_SOCIAL_RELATIONSHIP_USER_fromUserId` FOREIGN KEY (`fromUserId`) REFERENCES `user`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `social_relationship` ADD CONSTRAINT `FK_SOCIAL_RELATIONSHIP_USER_userId` FOREIGN KEY (`userId`) REFERENCES `user`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `treasure_hunt` ADD CONSTRAINT `FK_TREASURE_HUNT_PERSONA_personaId` FOREIGN KEY (`personaId`) REFERENCES `persona`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `treasure_hunt_config` ADD CONSTRAINT `FK_TREASURE_HUNT_CONFIG_REWARD_TABLE_reward_table_id` FOREIGN KEY (`reward_table_id`) REFERENCES `reward_table`(`ID`);--> statement-breakpoint
ALTER TABLE `used_powerup` ADD CONSTRAINT `FK_USED_POWERUP_EVENT_SESSION_eventSessionId` FOREIGN KEY (`eventSessionId`) REFERENCES `event_session`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `used_powerup` ADD CONSTRAINT `FK_USED_POWERUP_PERSONA_personaId` FOREIGN KEY (`personaId`) REFERENCES `persona`(`ID`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `vinyl` ADD CONSTRAINT `FK_VINYL_CAR_carId` FOREIGN KEY (`carId`) REFERENCES `car`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `vinylproduct` ADD CONSTRAINT `FK_VINYLPRODUCT_CATEGORY` FOREIGN KEY (`parentCategoryId`) REFERENCES `category`(`idcategory`);--> statement-breakpoint
ALTER TABLE `visualpart` ADD CONSTRAINT `FK_VISUALPART_CAR_carId` FOREIGN KEY (`carId`) REFERENCES `car`(`id`) ON DELETE CASCADE;
*/