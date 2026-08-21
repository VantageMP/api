import {
	bigint,
	boolean,
	customType,
	date,
	datetime,
	double,
	float,
	foreignKey,
	index,
	int,
	longtext,
	mediumtext,
	mysqlEnum,
	mysqlTable,
	smallint,
	text,
	timestamp,
	uniqueIndex,
	varchar,
} from "drizzle-orm/mysql-core";

export const achievementTable = mysqlTable(
	"achievement",
	{
		id: bigint("ID", { mode: "number" }).autoincrement().primaryKey(),
		autoUpdate: customType({ dataType: () => "bit(1)" })("auto_update"),
		category: varchar({ length: 255 }),
		name: varchar({ length: 255 }),
		progressText: varchar("progress_text", { length: 255 }),
		shouldOverwriteProgress: customType({ dataType: () => "bit(1)" })(
			"should_overwrite_progress",
		).default("b'0'"),
		statConversion: mysqlEnum("stat_conversion", [
			"None",
			"FromMetersToDistance",
			"FromMillisecondsToMinutes",
		]),
		updateTrigger: text("update_trigger"),
		updateValue: text("update_value"),
		visible: customType({ dataType: () => "bit(1)" })(),
		badgeDefinitionId: bigint("badge_definition_id", {
			mode: "number",
		}).notNull(),
	},
	(table) => [
		index("ACHIEVEMENT_category_index").on(table.category),
		uniqueIndex("UK_ACHIEVEMENT_badge_definition_id").on(table.badgeDefinitionId),
		foreignKey({
			columns: [table.badgeDefinitionId],
			foreignColumns: [badgeDefinitionTable.id],
			name: "FK_ACHIEVEMENT_BADGE_DEFINITION_badge_definition_id",
		}).onDelete("cascade"),
	],
);

export const achievementRankTable = mysqlTable(
	"achievement_rank",
	{
		id: bigint("ID", { mode: "number" }).autoincrement().primaryKey(),
		points: int(),
		rank: int(),
		rarity: float(),
		rewardDescription: varchar("reward_description", { length: 255 }),
		rewardType: varchar("reward_type", { length: 255 }),
		rewardVisualStyle: varchar("reward_visual_style", { length: 255 }),
		thresholdValue: int("threshold_value"),
		achievementId: bigint("achievement_id", { mode: "number" }).notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.achievementId],
			foreignColumns: [achievementTable.id],
			name: "FK_ACHIEVEMENT_RANK_ACHIEVEMENT_achievement_id",
		}).onDelete("cascade"),
	],
);

export const achievementRewardTable = mysqlTable(
	"achievement_reward",
	{
		id: bigint("ID", { mode: "number" }).autoincrement().primaryKey(),
		internalRewardDescription: varchar("internal_reward_description", {
			length: 255,
		}),
		rewardDescription: varchar("reward_description", { length: 255 }),
		rewardScript: text().notNull(),
	},
	(table) => [
		index("ACHIEVEMENT_REWARD_internal_reward_description_index").on(
			table.internalRewardDescription,
		),
	],
);

export const badgeDefinitionTable = mysqlTable("badge_definition", {
	id: bigint("ID", { mode: "number" }).autoincrement().primaryKey(),
	background: varchar({ length: 255 }),
	border: varchar({ length: 255 }),
	description: varchar({ length: 255 }),
	icon: varchar({ length: 255 }),
	name: varchar({ length: 255 }),
});

export const banTable = mysqlTable(
	"ban",
	{
		id: bigint({ mode: "number" }).autoincrement().primaryKey(),
		data: varchar({ length: 255 }),
		endsAt: datetime("ends_at"),
		reason: varchar({ length: 255 }),
		type: varchar({ length: 255 }),
		userId: bigint("user_id", { mode: "number" }),
		started: datetime(),
		bannedById: bigint("banned_by_id", { mode: "number" }),
		active: boolean().default(true),
	},
	(table) => [
		index("BAN_existence_index").on(table.userId, table.endsAt),
		index("BAN_endsAt_index").on(table.endsAt),
		foreignKey({
			columns: [table.userId],
			foreignColumns: [userTable.id],
			name: "FK_BAN_USER_user_id",
		}).onDelete("cascade"),
		foreignKey({
			columns: [table.bannedById],
			foreignColumns: [personaTable.id],
			name: "FK_BAN_PERSONA_banned_by_id",
		}).onDelete("cascade"),
	],
);

export const carTable = mysqlTable(
	"car",
	{
		id: bigint({ mode: "number" }).autoincrement().primaryKey(),
		durability: int().notNull(),
		expirationDate: datetime(),
		heat: float().notNull(),
		ownershipType: varchar({ length: 255 }),
		personaId: bigint({ mode: "number" }).notNull(),
		baseCar: int().notNull(),
		carClassHash: int().notNull(),
		isPreset: customType({ dataType: () => "bit(1)" })().notNull(),
		level: int().notNull(),
		name: varchar({ length: 255 }).notNull(),
		physicsProfileHash: int().notNull(),
		rating: int().notNull(),
		resalePrice: float().notNull(),
		rideHeightDrop: float().notNull(),
		skillModSlotCount: int().notNull(),
		version: int().notNull(),
	},
	(table) => [
		index("IDX_CAR_expirationDate").on(table.expirationDate),
		index("IDX_CAR_ownershipType").on(table.ownershipType),
		foreignKey({
			columns: [table.personaId],
			foreignColumns: [personaTable.id],
			name: "FK_CAR_PERSONA_personaId",
		}).onDelete("cascade"),
	],
);

export const carClassesTable = mysqlTable(
	"car_classes",
	{
		storeName: varchar("store_name", { length: 255 }).primaryKey(),
		fullName: varchar("full_name", { length: 255 }).notNull(),
		manufactor: varchar({ length: 255 }).notNull(),
		model: varchar({ length: 255 }).notNull(),
		tsStock: int("ts_stock"),
		tsVar1: int("ts_var1"),
		tsVar2: int("ts_var2"),
		tsVar3: int("ts_var3"),
		acStock: int("ac_stock"),
		acVar1: int("ac_var1"),
		acVar2: int("ac_var2"),
		acVar3: int("ac_var3"),
		haStock: int("ha_stock"),
		haVar1: int("ha_var1"),
		haVar2: int("ha_var2"),
		haVar3: int("ha_var3"),
		hash: int(),
		productId: varchar("product_id", { length: 255 }),
	},
	(table) => [
		index("store_name_key").on(table.storeName),
		uniqueIndex("store_name_index").on(table.storeName),
		index("hash_index").on(table.hash),
	],
);

export const cardPackTable = mysqlTable("card_pack", {
	id: bigint("ID", { mode: "number" }).autoincrement().primaryKey(),
	entitlementTag: varchar({ length: 255 }),
});

export const cardPackItemTable = mysqlTable(
	"card_pack_item",
	{
		id: bigint("ID", { mode: "number" }).autoincrement().primaryKey(),
		script: text().notNull(),
		cardPackEntityID: bigint("cardPackEntity_ID", { mode: "number" }).notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.cardPackEntityID],
			foreignColumns: [cardPackTable.id],
			name: "FK_CARD_PACK_ITEM_CARD_PACK_cardPackEntity_ID",
		}).onDelete("cascade"),
	],
);

export const categoryTable = mysqlTable("category", {
	idcategory: bigint({ mode: "number" }).autoincrement().primaryKey(),
	catalogVersion: varchar({ length: 255 }),
	categories: varchar({ length: 255 }),
	displayName: varchar({ length: 255 }),
	filterType: int(),
	icon: varchar({ length: 255 }),
	id: bigint({ mode: "number" }),
	longDescription: varchar({ length: 255 }),
	name: varchar({ length: 255 }),
	priority: smallint(),
	shortDescription: varchar({ length: 255 }),
	showInNavigationPane: customType({ dataType: () => "bit(1)" })(),
	showPromoPage: customType({ dataType: () => "bit(1)" })(),
	webIcon: varchar({ length: 255 }),
});

export const chatAnnouncementTable = mysqlTable("chat_announcement", {
	id: int().autoincrement().primaryKey(),
	announcementInterval: int(),
	announcementMessage: varchar({ length: 255 }),
	channelMask: varchar({ length: 255 }),
});

export const chatRoomTable = mysqlTable("chat_room", {
	id: bigint("ID", { mode: "number" }).autoincrement().primaryKey(),
	amount: int(),
	longName: varchar({ length: 255 }),
	shortName: varchar({ length: 255 }),
});

export const eventTable = mysqlTable(
	"event",
	{
		id: int("ID").autoincrement().primaryKey(),
		eventModeId: int().notNull(),
		isEnabled: customType({ dataType: () => "bit(1)" })().default("b'1'"),
		isLocked: customType({ dataType: () => "bit(1)" })().default("b'0'"),
		rewardsTimeLimit: bigint({ mode: "number" }).default(0).notNull(),
		maxCarClassRating: int().notNull(),
		maxLevel: int().notNull(),
		maxPlayers: int().notNull(),
		minCarClassRating: int().notNull(),
		minLevel: int().notNull(),
		name: varchar({ length: 255 }),
		carClassHash: int().notNull(),
		trackLength: float().notNull(),
		isRotationEnabled: customType({ dataType: () => "bit(1)" })().default("b'0'"),
		dnfTimerTime: int().default(60000),
		lobbyCountdownTime: int().default(60000),
		legitTime: bigint({ mode: "number" }).default(0),
		isDnfEnabled: customType({ dataType: () => "bit(1)" })().default("b'1'"),
		isRaceAgainEnabled: customType({ dataType: () => "bit(1)" })().default("b'1'"),
		singleplayerRewardConfigId: varchar("singleplayer_reward_config_id", {
			length: 255,
		}).notNull(),
		multiplayerRewardConfigId: varchar("multiplayer_reward_config_id", {
			length: 255,
		}).notNull(),
		privateRewardConfigId: varchar("private_reward_config_id", {
			length: 255,
		}).notNull(),
	},
	(table) => [
		index("test_index").on(table.id, table.name),
		index("EVENT_availability_index").on(table.isEnabled, table.minLevel, table.maxLevel),
		foreignKey({
			columns: [table.singleplayerRewardConfigId],
			foreignColumns: [eventRewardTable.id],
			name: "FK_EVENT_SINGLEPLAYER_REWARD_CONFIG_ID",
		}),
		foreignKey({
			columns: [table.multiplayerRewardConfigId],
			foreignColumns: [eventRewardTable.id],
			name: "FK_EVENT_MULTIPLAYER_REWARD_CONFIG_ID",
		}),
		foreignKey({
			columns: [table.privateRewardConfigId],
			foreignColumns: [eventRewardTable.id],
			name: "FK_EVENT_PRIVATE_REWARD_CONFIG_ID",
		}),
	],
);

export const eventDataTable = mysqlTable(
	"event_data",
	{
		id: bigint("ID", { mode: "number" }).autoincrement().primaryKey(),
		alternateEventDurationInMilliseconds: bigint({
			mode: "number",
		}).notNull(),
		bestLapDurationInMilliseconds: bigint({ mode: "number" }).notNull(),
		bustedCount: int().notNull(),
		carId: bigint({ mode: "number" }).notNull(),
		copsDeployed: int().notNull(),
		copsDisabled: int().notNull(),
		copsRammed: int().notNull(),
		costToState: int().notNull(),
		distanceToFinish: float().notNull(),
		eventDurationInMilliseconds: bigint({ mode: "number" }).notNull(),
		eventModeId: int().notNull(),
		eventSessionId: bigint({ mode: "number" }),
		finishReason: int().notNull(),
		fractionCompleted: float().notNull(),
		hacksDetected: bigint({ mode: "number" }).notNull(),
		heat: float().notNull(),
		infractions: int().notNull(),
		longestJumpDurationInMilliseconds: bigint({ mode: "number" }).notNull(),
		numberOfCollisions: int().notNull(),
		perfectStart: int().notNull(),
		personaId: bigint({ mode: "number" }),
		rank: int().notNull(),
		roadBlocksDodged: int().notNull(),
		spikeStripsDodged: int().notNull(),
		sumOfJumpsDurationInMilliseconds: bigint({ mode: "number" }).notNull(),
		topSpeed: float().notNull(),
		eventid: int("EVENTID"),
		isLegit: customType({ dataType: () => "bit(1)" })().default("b'0'"),
		serverTimeInMilliseconds: bigint({ mode: "number" }),
		serverTimeStarted: bigint({ mode: "number" }),
		serverTimeEnded: bigint({ mode: "number" }),
		carClassHash: int(),
		carRating: int(),
		globalRank: int("global_rank"),
	},
	(table) => [
		index("car_id_index").on(table.carId),
		index("finishreason_index").on(table.finishReason),
		index("EVENT_DATA_persona_id_index").on(table.personaId),
		uniqueIndex("esi_personaId").on(table.eventSessionId, table.personaId),
		foreignKey({
			columns: [table.eventSessionId],
			foreignColumns: [eventSessionTable.id],
			name: "FK_EVENT_DATA_EVENT_SESSION_eventSessionId",
		}).onDelete("cascade"),
		foreignKey({
			columns: [table.personaId],
			foreignColumns: [personaTable.id],
			name: "FK_EVENT_DATA_PERSONA_personaId",
		}).onDelete("cascade"),
		foreignKey({
			columns: [table.eventid],
			foreignColumns: [eventTable.id],
			name: "FK_EVENT_DATA_EVENT_EVENTID",
		}).onDelete("cascade"),
	],
);

export const eventRewardTable = mysqlTable(
	"event_reward",
	{
		id: varchar("ID", { length: 255 }).primaryKey(),
		baseRepReward: int().default(0).notNull(),
		levelRepRewardMultiplier: float().default(0).notNull(),
		finalRepRewardMultiplier: float().default(0).notNull(),
		perfectStartRepMultiplier: float().default(0).notNull(),
		topSpeedRepMultiplier: float().default(0).notNull(),
		rank1RepMultiplier: float().default(0).notNull(),
		rank2RepMultiplier: float().default(0).notNull(),
		rank3RepMultiplier: float().default(0).notNull(),
		rank4RepMultiplier: float().default(0).notNull(),
		rank5RepMultiplier: float().default(0).notNull(),
		rank6RepMultiplier: float().default(0).notNull(),
		rank7RepMultiplier: float().default(0).notNull(),
		rank8RepMultiplier: float().default(0).notNull(),
		baseCashReward: int().default(0).notNull(),
		levelCashRewardMultiplier: float().default(0).notNull(),
		finalCashRewardMultiplier: float().default(0).notNull(),
		perfectStartCashMultiplier: float().default(0).notNull(),
		topSpeedCashMultiplier: float().default(0).notNull(),
		rank1CashMultiplier: float().default(0).notNull(),
		rank2CashMultiplier: float().default(0).notNull(),
		rank3CashMultiplier: float().default(0).notNull(),
		rank4CashMultiplier: float().default(0).notNull(),
		rank5CashMultiplier: float().default(0).notNull(),
		rank6CashMultiplier: float().default(0).notNull(),
		rank7CashMultiplier: float().default(0).notNull(),
		rank8CashMultiplier: float().default(0).notNull(),
		minTopSpeedTrigger: float().default(0).notNull(),
		rewardTableRank1Id: bigint("rewardTable_rank1_id", {
			mode: "number",
		}),
		rewardTableRank2Id: bigint("rewardTable_rank2_id", {
			mode: "number",
		}),
		rewardTableRank3Id: bigint("rewardTable_rank3_id", {
			mode: "number",
		}),
		rewardTableRank4Id: bigint("rewardTable_rank4_id", {
			mode: "number",
		}),
		rewardTableRank5Id: bigint("rewardTable_rank5_id", {
			mode: "number",
		}),
		rewardTableRank6Id: bigint("rewardTable_rank6_id", {
			mode: "number",
		}),
		rewardTableRank7Id: bigint("rewardTable_rank7_id", {
			mode: "number",
		}),
		rewardTableRank8Id: bigint("rewardTable_rank8_id", {
			mode: "number",
		}),
	},
	(table) => [
		foreignKey({
			columns: [table.rewardTableRank1Id],
			foreignColumns: [rewardTableTable.id],
			name: "FK_EVENT_REWARD_RANK1TABLE_ID",
		}),
		foreignKey({
			columns: [table.rewardTableRank2Id],
			foreignColumns: [rewardTableTable.id],
			name: "FK_EVENT_REWARD_RANK2TABLE_ID",
		}),
		foreignKey({
			columns: [table.rewardTableRank3Id],
			foreignColumns: [rewardTableTable.id],
			name: "FK_EVENT_REWARD_RANK3TABLE_ID",
		}),
		foreignKey({
			columns: [table.rewardTableRank4Id],
			foreignColumns: [rewardTableTable.id],
			name: "FK_EVENT_REWARD_RANK4TABLE_ID",
		}),
		foreignKey({
			columns: [table.rewardTableRank5Id],
			foreignColumns: [rewardTableTable.id],
			name: "FK_EVENT_REWARD_RANK5TABLE_ID",
		}),
		foreignKey({
			columns: [table.rewardTableRank6Id],
			foreignColumns: [rewardTableTable.id],
			name: "FK_EVENT_REWARD_RANK6TABLE_ID",
		}),
		foreignKey({
			columns: [table.rewardTableRank7Id],
			foreignColumns: [rewardTableTable.id],
			name: "FK_EVENT_REWARD_RANK7TABLE_ID",
		}),
		foreignKey({
			columns: [table.rewardTableRank8Id],
			foreignColumns: [rewardTableTable.id],
			name: "FK_EVENT_REWARD_RANK8TABLE_ID",
		}),
	],
);

export const eventSessionTable = mysqlTable(
	"event_session",
	{
		id: bigint("ID", { mode: "number" }).autoincrement().primaryKey(),
		eventid: int("EVENTID"),
		ended: bigint("ENDED", { mode: "number" }),
		started: bigint("STARTED", { mode: "number" }),
		lobbyid: bigint("LOBBYID", { mode: "number" }),
		nextlobbyid: bigint("NEXTLOBBYID", { mode: "number" }),
	},
	(table) => [
		foreignKey({
			columns: [table.eventid],
			foreignColumns: [eventTable.id],
			name: "FK_EVENT_SESSION_EVENT_EVENTID",
		}).onDelete("cascade"),
		foreignKey({
			columns: [table.lobbyid],
			foreignColumns: [lobbyTable.id],
			name: "FK_EVENT_SESSION_LOBBY_LOBBYID",
		}).onDelete("cascade"),
		foreignKey({
			columns: [table.nextlobbyid],
			foreignColumns: [lobbyTable.id],
			name: "FK_EVENT_SESSION_LOBBY_NEXTLOBBYID",
		}).onDelete("cascade"),
	],
);

export const hardwareInfoTable = mysqlTable(
	"hardware_info",
	{
		id: bigint("ID", { mode: "number" }).autoincrement().primaryKey(),
		banned: customType({ dataType: () => "bit(1)" })().notNull(),
		hardwareHash: varchar({ length: 255 }),
		hardwareInfo: longtext(),
		userId: bigint({ mode: "number" }),
	},
	(table) => [index("HARDWARE_INFO_hardwareHash_index").on(table.hardwareHash)],
);

export const inventoryTable = mysqlTable(
	"inventory",
	{
		id: bigint({ mode: "number" }).autoincrement().primaryKey(),
		performancePartsCapacity: int(),
		performancePartsUsedSlotCount: int(),
		skillModPartsCapacity: int(),
		skillModPartsUsedSlotCount: int(),
		visualPartsCapacity: int(),
		visualPartsUsedSlotCount: int(),
		personaId: bigint({ mode: "number" }),
	},
	(table) => [
		foreignKey({
			columns: [table.personaId],
			foreignColumns: [personaTable.id],
			name: "FK_INVENTORY_PERSONA_personaId",
		}).onDelete("cascade"),
	],
);

export const inviteTicketTable = mysqlTable(
	"invite_ticket",
	{
		id: bigint("ID", { mode: "number" }).autoincrement().primaryKey(),
		discordNAME: varchar("DISCORD_NAME", { length: 255 }),
		ticket: varchar("TICKET", { length: 255 }),
		userid: bigint("USERID", { mode: "number" }),
	},
	(table) => [
		index("INVITE_TICKET_TICKET_index").on(table.ticket),
		foreignKey({
			columns: [table.userid],
			foreignColumns: [userTable.id],
			name: "FK_INVITE_TICKET_USER_USERID",
		}).onDelete("cascade"),
	],
);

export const levelRepTable = mysqlTable("level_rep", {
	level: bigint({ mode: "number" }).autoincrement().primaryKey(),
	expPoint: bigint({ mode: "number" }),
});

export const lobbyTable = mysqlTable(
	"lobby",
	{
		id: bigint("ID", { mode: "number" }).autoincrement().primaryKey(),
		isPrivate: customType({ dataType: () => "bit(1)" })(),
		lobbyDateTimeStart: datetime(),
		personaId: bigint({ mode: "number" }),
		eventid: int("EVENTID"),
		startedTime: datetime(),
	},
	(table) => [
		index("LOBBY_startedTime_index").on(table.startedTime),
		foreignKey({
			columns: [table.eventid],
			foreignColumns: [eventTable.id],
			name: "FK_LOBBY_EVENT_EVENTID",
		}).onDelete("cascade"),
	],
);

export const lobbyEntrantTable = mysqlTable(
	"lobby_entrant",
	{
		id: bigint({ mode: "number" }).autoincrement().primaryKey(),
		gridIndex: int().notNull(),
		lobbyid: bigint("LOBBYID", { mode: "number" }),
		personaid: bigint("PERSONAID", { mode: "number" }),
	},
	(table) => [
		foreignKey({
			columns: [table.lobbyid],
			foreignColumns: [lobbyTable.id],
			name: "FK_LOBBY_ENTRANT_LOBBY_LOBBYID",
		}).onDelete("cascade"),
		foreignKey({
			columns: [table.personaid],
			foreignColumns: [personaTable.id],
			name: "FK_LOBBY_ENTRANT_PERSONA_PERSONAID",
		}).onDelete("cascade"),
	],
);

export const loginAnnouncementTable = mysqlTable("login_announcement", {
	id: int().autoincrement().primaryKey(),
	imageUrl: varchar({ length: 255 }),
	target: varchar({ length: 255 }),
	type: varchar({ length: 255 }),
	context: varchar({ length: 255 }).default("NotApplicable").notNull(),
	language: varchar({ length: 255 }),
});

export const newsArticleTable = mysqlTable(
	"news_article",
	{
		id: bigint({ mode: "number" }).autoincrement().primaryKey(),
		filters: varchar({ length: 255 }),
		iconType: int(),
		longHALId: varchar({ length: 255 }),
		parameters: varchar({ length: 1000 }),
		shortHALId: varchar({ length: 255 }),
		sticky: int(),
		timestamp: timestamp().defaultNow().notNull(),
		type: varchar({ length: 255 }),
		personaId: bigint("persona_id", { mode: "number" }),
		referencedPersonaId: bigint("referenced_persona_id", {
			mode: "number",
		}),
	},
	(table) => [
		foreignKey({
			columns: [table.personaId],
			foreignColumns: [personaTable.id],
			name: "FK_NEWS_ARTICLE_PERSONA_persona_id",
		}).onDelete("cascade"),
		foreignKey({
			columns: [table.referencedPersonaId],
			foreignColumns: [personaTable.id],
			name: "FK_NEWS_ARTICLE_PERSONA_referenced_persona_id",
		}).onDelete("cascade"),
	],
);

export const onlineUsersTable = mysqlTable(
	"online_users",
	{
		id: int("ID").primaryKey(),
		numberOfOnline: bigint({ mode: "number" }).notNull(),
		numberOfRegistered: bigint({ mode: "number" }).notNull(),
	},
	(table) => [uniqueIndex("ONLINE_USERS_id_index").on(table.id)],
);

export const personaTable = mysqlTable(
	"persona",
	{
		id: bigint("ID", { mode: "number" }).autoincrement().primaryKey(),
		boost: double().notNull(),
		cash: double().notNull(),
		curCarIndex: int().notNull(),
		iconIndex: int().notNull(),
		level: int().notNull(),
		motto: varchar({ length: 255 }),
		name: varchar({ length: 255 }),
		percentToLevel: float().notNull(),
		rating: double().notNull(),
		rep: double().notNull(),
		repAtCurrentLevel: int().notNull(),
		score: int().notNull(),
		userid: bigint("USERID", { mode: "number" }),
		created: datetime(),
		badges: varchar({ length: 2048 }),
		firstLogin: datetime("first_login"),
		lastLogin: datetime("last_login"),
		numCarSlots: int().default(250).notNull(),
	},
	(table) => [
		uniqueIndex("PERSONA_name_index").on(table.name),
		foreignKey({
			columns: [table.userid],
			foreignColumns: [userTable.id],
			name: "FK_PERSONA_USER_USERID",
		}).onDelete("cascade"),
	],
);

export const rewardTableTable = mysqlTable(
	"reward_table",
	{
		id: bigint("ID", { mode: "number" }).autoincrement().primaryKey(),
		name: varchar({ length: 255 }),
	},
	(table) => [uniqueIndex("REWARD_TABLE_name_index").on(table.name)],
);

export const userTable = mysqlTable(
	"user",
	{
		id: bigint("ID", { mode: "number" }).autoincrement().primaryKey(),
		email: varchar("EMAIL", { length: 255 }).notNull(),
		password: varchar("PASSWORD", { length: 255 }).notNull(),
		premium: customType({ dataType: () => "bit(1)" })()
			.default("b'0'")
			.notNull(),
		isAdmin: customType({ dataType: () => "bit(1)" })(),
		hwid: varchar("HWID", { length: 255 }),
		ipADDRESS: varchar("IP_ADDRESS", { length: 255 }),
		created: datetime().defaultNow(),
		lastLogin: datetime(),
		gameHardwareHash: varchar({ length: 255 }),
		isLocked: customType({ dataType: () => "bit(1)" })(),
		selectedPersonaIndex: int().default(0),
		// write-only: false (criação/logout) | true (SendHardwareInfo)
		isOnline: boolean().default(false).notNull(),
	},
	(table) => [uniqueIndex("USER_email_index").on(table.email)],
);

export const amplifiersTable = mysqlTable(
	"amplifiers",
	{
		id: bigint({ mode: "number" }).autoincrement().primaryKey(),
		ampType: varchar({ length: 255 }),
		cashMultiplier: float(),
		repMultiplier: float(),
		productId: varchar("product_id", { length: 255 }).notNull(),
	},
	(table) => [
		uniqueIndex("UK_AMPLIFIERS_product_id").on(table.productId),
		foreignKey({
			columns: [table.productId],
			foreignColumns: [productTable.productId],
			name: "FK_AMPLIFIERS_PRODUCT_product_id",
		}).onDelete("cascade"),
	],
);

export const basketdefinitionTable = mysqlTable(
	"basketdefinition",
	{
		productId: varchar({ length: 255 }).primaryKey(),
		ownedCarTrans: longtext(),
	},
	(table) => [
		uniqueIndex("BASKETDEFINITION_productId_uindex").on(table.productId),
		foreignKey({
			columns: [table.productId],
			foreignColumns: [productTable.productId],
			name: "FK_BASKETDEFINITION_PRODUCT_productId",
		}).onDelete("cascade"),
	],
);

export const giftCodeTable = mysqlTable(
	"gift_code",
	{
		code: varchar({ length: 255 }).primaryKey(),
		name: varchar({ length: 255 }).notNull(),
		productId: varchar("product_id", { length: 255 }).notNull(),
		useCount: int("use_count").default(1),
		beginTime: timestamp().notNull(),
		endTime: timestamp().notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.productId],
			foreignColumns: [productTable.productId],
			name: "FK_GIFT_CODE_PRODUCT_product_id",
		}).onDelete("cascade"),
	],
);

export const inventoryItemTable = mysqlTable(
	"inventory_item",
	{
		id: bigint({ mode: "number" }).autoincrement().primaryKey(),
		expirationDate: datetime(),
		remainingUseCount: int(),
		resellPrice: int(),
		status: varchar({ length: 255 }).notNull(),
		inventoryEntityId: bigint("inventoryEntity_id", {
			mode: "number",
		}).notNull(),
		productId: varchar({ length: 255 }).notNull(),
	},
	(table) => [
		index("INVENTORY_ITEM_expirationDate_index").on(table.expirationDate),
		foreignKey({
			columns: [table.inventoryEntityId],
			foreignColumns: [inventoryTable.id],
			name: "FK_INVENTORY_ITEM_INVENTORY_inventoryEntity_id",
		}).onDelete("cascade"),
		foreignKey({
			columns: [table.productId],
			foreignColumns: [productTable.productId],
			name: "FK_INVENTORY_ITEM_PRODUCT_productId",
		}).onDelete("cascade"),
	],
);

export const paintTable = mysqlTable(
	"paint",
	{
		id: bigint({ mode: "number" }).autoincrement().primaryKey(),
		paintGroup: int(),
		hue: int().notNull(),
		sat: int().notNull(),
		slot: int().notNull(),
		paintVar: int(),
		carId: bigint({ mode: "number" }).notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.carId],
			foreignColumns: [carTable.id],
			name: "FK_PAINT_CAR_carId",
		}).onDelete("cascade"),
	],
);

export const parameterTable = mysqlTable(
	"parameter",
	{
		name: varchar({ length: 255 }).primaryKey(),
		value: varchar({ length: 255 }),
	},
	(table) => [uniqueIndex("PARAMETER_name_index").on(table.name)],
);

export const performancepartTable = mysqlTable(
	"performancepart",
	{
		id: bigint({ mode: "number" }).autoincrement().primaryKey(),
		performancePartAttribHash: int().notNull(),
		carId: bigint({ mode: "number" }).notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.carId],
			foreignColumns: [carTable.id],
			name: "FK_PERFORMANCEPART_CAR_carId",
		}).onDelete("cascade"),
	],
);

export const personaAchievementTable = mysqlTable(
	"persona_achievement",
	{
		id: bigint("ID", { mode: "number" }).autoincrement().primaryKey(),
		canProgress: customType({ dataType: () => "bit(1)" })("can_progress"),
		currentValue: bigint("current_value", { mode: "number" }),
		achievementId: bigint("achievement_id", { mode: "number" }).notNull(),
		personaId: bigint("persona_id", { mode: "number" }).notNull(),
	},
	(table) => [
		index("persona_ach_index").on(table.personaId, table.achievementId),
		foreignKey({
			columns: [table.achievementId],
			foreignColumns: [achievementTable.id],
			name: "FK_PERSONA_ACHIEVEMENT_ACHIEVEMENT_achievement_id",
		}).onDelete("cascade"),
		foreignKey({
			columns: [table.personaId],
			foreignColumns: [personaTable.id],
			name: "FK_PERSONA_ACHIEVEMENT_PERSONA_persona_id",
		}).onDelete("cascade"),
	],
);

export const personaAchievementRankTable = mysqlTable(
	"persona_achievement_rank",
	{
		id: bigint("ID", { mode: "number" }).autoincrement().primaryKey(),
		achievedOn: datetime("achieved_on"),
		state: mysqlEnum(["Locked", "InProgress", "Completed", "RewardWaiting"]),
		achievementRankId: bigint("achievement_rank_id", {
			mode: "number",
		}).notNull(),
		personaAchievementId: bigint("persona_achievement_id", {
			mode: "number",
		}).notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.achievementRankId],
			foreignColumns: [achievementRankTable.id],
			name: "FK_PERSONA_ACHIEVEMENT_RANK_ACHIEVEMENT_RANK_id",
		}).onDelete("cascade"),
		foreignKey({
			columns: [table.personaAchievementId],
			foreignColumns: [personaAchievementTable.id],
			name: "FK_PERSONA_ACHIEVEMENT_RANK_PERSONA_ACHIEVEMENT_id",
		}).onDelete("cascade"),
	],
);

export const personaBadgeTable = mysqlTable(
	"persona_badge",
	{
		id: bigint("ID", { mode: "number" }).autoincrement().primaryKey(),
		slot: int(),
		badgeDefinitionId: bigint("badge_definition_id", {
			mode: "number",
		}).notNull(),
		personaId: bigint("persona_id", { mode: "number" }).notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.badgeDefinitionId],
			foreignColumns: [badgeDefinitionTable.id],
			name: "FK_PERSONA_BADGE_BADGE_DEFINITION_badge_definition_id",
		}).onDelete("cascade"),
		foreignKey({
			columns: [table.personaId],
			foreignColumns: [personaTable.id],
			name: "FK_PERSONA_BADGE_PERSONA_persona_id",
		}).onDelete("cascade"),
	],
);

export const personaGiftTable = mysqlTable(
	"persona_gift",
	{
		id: bigint({ mode: "number" }).autoincrement().primaryKey(),
		personaId: bigint("persona_id", { mode: "number" }).notNull(),
		code: varchar({ length: 255 }).notNull(),
		useCount: int("use_count").notNull(),
	},
	(table) => [
		uniqueIndex("UK_PERSONA_ID_CODE").on(table.personaId, table.code),
		foreignKey({
			columns: [table.personaId],
			foreignColumns: [personaTable.id],
			name: "FK_PERSONA_GIFT_PERSONA_persona_id",
		}).onDelete("cascade"),
		foreignKey({
			columns: [table.code],
			foreignColumns: [giftCodeTable.code],
			name: "FK_PERSONA_GIFT_GIFT_CODE_code",
		}).onDelete("cascade"),
	],
);

export const productTable = mysqlTable(
	"product",
	{
		id: bigint({ mode: "number" }).autoincrement().primaryKey(),
		accel: int(),
		brand: varchar({ length: 255 }),
		categoryId: varchar({ length: 255 }),
		categoryName: varchar({ length: 255 }),
		currency: varchar({ length: 255 }).notNull(),
		description: varchar({ length: 255 }),
		dropWeight: double(),
		durationMinute: int().notNull(),
		enabled: customType({ dataType: () => "bit(1)" })().notNull(),
		entitlementTag: varchar({ length: 255 }),
		handling: int(),
		hash: int(),
		icon: varchar({ length: 255 }).notNull(),
		isDropable: customType({ dataType: () => "bit(1)" })().notNull(),
		level: int().notNull(),
		longDescription: varchar({ length: 255 }),
		minLevel: int().notNull(),
		premium: customType({ dataType: () => "bit(1)" })().notNull(),
		price: float().notNull(),
		priority: int().notNull(),
		productId: varchar({ length: 255 }).notNull(),
		productTitle: varchar({ length: 255 }),
		productType: varchar({ length: 255 }).notNull(),
		rarity: int(),
		resalePrice: float().notNull(),
		secondaryIcon: varchar({ length: 255 }),
		skillValue: float(),
		subType: varchar({ length: 255 }),
		topSpeed: int(),
		useCount: int().notNull(),
		visualStyle: varchar({ length: 255 }),
		webIcon: varchar({ length: 255 }),
		webLocation: varchar({ length: 255 }),
		parentProductId: bigint({ mode: "number" }),
		bundleItems: mediumtext(),
		rewardTitle: varchar({ length: 255 }),
		isGift: boolean().default(false).notNull(),
	},
	(table) => [
		uniqueIndex("UK_PRODUCT_productId").on(table.productId),
		index("PRODUCT_hash_index").on(table.hash),
		index("PRODUCT_entitlementTag_index").on(table.entitlementTag),
		index("PRODUCT_availability_index").on(
			table.categoryName,
			table.productType,
			table.enabled,
			table.minLevel,
			table.premium,
		),
		index("prod_id_index").on(table.productId),
		index("parent_prod_id_index").on(table.parentProductId),
		foreignKey({
			columns: [table.parentProductId],
			foreignColumns: [table.id],
			name: "FK_PRODUCT_PRODUCT_parentProductId",
		}).onDelete("cascade"),
	],
);

export const promoCodeTable = mysqlTable(
	"promo_code",
	{
		id: bigint({ mode: "number" }).autoincrement().primaryKey(),
		isUsed: customType({ dataType: () => "bit(1)" })(),
		promoCode: varchar({ length: 255 }),
		userid: bigint("USERID", { mode: "number" }),
	},
	(table) => [
		foreignKey({
			columns: [table.userid],
			foreignColumns: [userTable.id],
			name: "FK_PROMO_CODE_USER_USERID",
		}).onDelete("cascade"),
	],
);

export const recoveryPasswordTable = mysqlTable("recovery_password", {
	id: bigint({ mode: "number" }).autoincrement().primaryKey(),
	expirationDate: datetime(),
	isClose: customType({ dataType: () => "bit(1)" })(),
	randomKey: varchar({ length: 255 }),
	userId: bigint({ mode: "number" }),
});

export const reportTable = mysqlTable("report", {
	id: bigint({ mode: "number" }).autoincrement().primaryKey(),
	abuserPersonaId: bigint({ mode: "number" }),
	chatMinutes: int(),
	customCarID: int(),
	description: varchar({ length: 255 }),
	hacksdetected: bigint({ mode: "number" }),
	personaId: bigint({ mode: "number" }),
	petitionType: int(),
});

export const rewardTableItemTable = mysqlTable(
	"reward_table_item",
	{
		id: bigint("ID", { mode: "number" }).autoincrement().primaryKey(),
		dropWeight: double(),
		script: text().notNull(),
		rewardTableEntityID: bigint("rewardTableEntity_ID", {
			mode: "number",
		}).notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.rewardTableEntityID],
			foreignColumns: [rewardTableTable.id],
			name: "FK_REWARD_TABLE_ITEM_REWARD_TABLE_rewardTableEntity_ID",
		}).onDelete("cascade"),
	],
);

export const skillmodpartTable = mysqlTable(
	"skillmodpart",
	{
		id: bigint({ mode: "number" }).autoincrement().primaryKey(),
		isFixed: customType({ dataType: () => "bit(1)" })().notNull(),
		skillModPartAttribHash: int().notNull(),
		carId: bigint({ mode: "number" }).notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.carId],
			foreignColumns: [carTable.id],
			name: "FK_SKILLMODPART_CAR_carId",
		}).onDelete("cascade"),
	],
);

export const socialRelationshipTable = mysqlTable(
	"social_relationship",
	{
		id: bigint("ID", { mode: "number" }).autoincrement().primaryKey(),
		remotePersonaId: bigint({ mode: "number" }),
		status: bigint({ mode: "number" }),
		fromUserId: bigint({ mode: "number" }),
		userId: bigint({ mode: "number" }),
	},
	(table) => [
		foreignKey({
			columns: [table.remotePersonaId],
			foreignColumns: [personaTable.id],
			name: "FK_SOCIAL_RELATIONSHIP_PERSONA_remotePersonaId",
		}).onDelete("cascade"),
		foreignKey({
			columns: [table.fromUserId],
			foreignColumns: [userTable.id],
			name: "FK_SOCIAL_RELATIONSHIP_USER_fromUserId",
		}).onDelete("cascade"),
		foreignKey({
			columns: [table.userId],
			foreignColumns: [userTable.id],
			name: "FK_SOCIAL_RELATIONSHIP_USER_userId",
		}).onDelete("cascade"),
	],
);

export const treasureHuntTable = mysqlTable(
	"treasure_hunt",
	{
		personaId: bigint({ mode: "number" }).primaryKey(),
		coinsCollected: int(),
		isStreakBroken: customType({ dataType: () => "bit(1)" })(),
		numCoins: int(),
		seed: int(),
		streak: int(),
		thDate: date(),
		isCompleted: customType({ dataType: () => "bit(1)" })().notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.personaId],
			foreignColumns: [personaTable.id],
			name: "FK_TREASURE_HUNT_PERSONA_personaId",
		}).onDelete("cascade"),
	],
);

export const treasureHuntConfigTable = mysqlTable(
	"treasure_hunt_config",
	{
		id: bigint("ID", { mode: "number" }).autoincrement().primaryKey(),
		baseCash: float("base_cash"),
		baseRep: float("base_rep"),
		cashMultiplier: float("cash_multiplier"),
		repMultiplier: float("rep_multiplier"),
		streak: int(),
		rewardTableId: bigint("reward_table_id", { mode: "number" }),
	},
	(table) => [
		foreignKey({
			columns: [table.rewardTableId],
			foreignColumns: [rewardTableTable.id],
			name: "FK_TREASURE_HUNT_CONFIG_REWARD_TABLE_reward_table_id",
		}),
	],
);

export const usedPowerupTable = mysqlTable(
	"used_powerup",
	{
		id: bigint({ mode: "number" }).autoincrement().primaryKey(),
		personaId: bigint({ mode: "number" }).notNull(),
		eventSessionId: bigint({ mode: "number" }),
		powerupHash: int().notNull(),
		recordedAt: timestamp("recorded_at").defaultNow(),
	},
	(table) => [
		index("hash_index").on(table.powerupHash),
		foreignKey({
			columns: [table.personaId],
			foreignColumns: [personaTable.id],
			name: "FK_USED_POWERUP_PERSONA_personaId",
		}).onDelete("cascade"),
		foreignKey({
			columns: [table.eventSessionId],
			foreignColumns: [eventSessionTable.id],
			name: "FK_USED_POWERUP_EVENT_SESSION_eventSessionId",
		}).onDelete("cascade"),
	],
);

export const vinylTable = mysqlTable(
	"vinyl",
	{
		id: bigint({ mode: "number" }).autoincrement().primaryKey(),
		hash: int().notNull(),
		hue1: int().notNull(),
		hue2: int().notNull(),
		hue3: int().notNull(),
		hue4: int().notNull(),
		layer: int().notNull(),
		mir: customType({ dataType: () => "bit(1)" })().notNull(),
		rot: int().notNull(),
		sat1: int().notNull(),
		sat2: int().notNull(),
		sat3: int().notNull(),
		sat4: int().notNull(),
		scalex: int().notNull(),
		scaley: int().notNull(),
		shear: int().notNull(),
		tranx: int().notNull(),
		trany: int().notNull(),
		var1: int().notNull(),
		var2: int().notNull(),
		var3: int().notNull(),
		var4: int().notNull(),
		carId: bigint({ mode: "number" }).notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.carId],
			foreignColumns: [carTable.id],
			name: "FK_VINYL_CAR_carId",
		}).onDelete("cascade"),
	],
);

export const vinylproductTable = mysqlTable(
	"vinylproduct",
	{
		id: bigint({ mode: "number" }).autoincrement().primaryKey(),
		bundleItems: varchar({ length: 255 }),
		categoryId: varchar({ length: 255 }),
		categoryName: varchar({ length: 255 }),
		currency: varchar({ length: 255 }),
		description: varchar({ length: 255 }),
		durationMinute: int().notNull(),
		enabled: customType({ dataType: () => "bit(1)" })().notNull(),
		entitlementTag: varchar({ length: 255 }),
		hash: int(),
		icon: varchar({ length: 255 }),
		level: int().notNull(),
		longDescription: varchar({ length: 255 }),
		minLevel: int().notNull(),
		premium: customType({ dataType: () => "bit(1)" })().notNull(),
		price: float().notNull(),
		priority: int().notNull(),
		productId: varchar({ length: 255 }),
		productTitle: varchar({ length: 255 }),
		productType: varchar({ length: 255 }),
		secondaryIcon: varchar({ length: 255 }),
		useCount: int().notNull(),
		visualStyle: varchar({ length: 255 }),
		webIcon: varchar({ length: 255 }),
		webLocation: varchar({ length: 255 }),
		parentCategoryId: bigint({ mode: "number" }),
	},
	(table) => [
		foreignKey({
			columns: [table.parentCategoryId],
			foreignColumns: [categoryTable.idcategory],
			name: "FK_VINYLPRODUCT_CATEGORY",
		}),
	],
);

export const virtualitemTable = mysqlTable("virtualitem", {
	itemName: varchar({ length: 255 }).primaryKey(),
	brand: varchar({ length: 255 }),
	hash: int(),
	icon: varchar({ length: 255 }),
	longdescription: varchar({ length: 255 }),
	rarity: int(),
	resellprice: int(),
	shortdescription: varchar({ length: 255 }),
	subType: varchar({ length: 255 }),
	tier: int(),
	title: varchar({ length: 255 }),
	type: varchar({ length: 255 }),
	warnondelete: customType({ dataType: () => "bit(1)" })(),
});

export const visualpartTable = mysqlTable(
	"visualpart",
	{
		id: bigint({ mode: "number" }).autoincrement().primaryKey(),
		partHash: int().notNull(),
		slotHash: int().notNull(),
		carId: bigint({ mode: "number" }).notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.carId],
			foreignColumns: [carTable.id],
			name: "FK_VISUALPART_CAR_carId",
		}).onDelete("cascade"),
	],
);
