import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	achievementTable: {
		badgeDefinition: r.one.badgeDefinitionTable({
			from: r.achievementTable.badgeDefinitionId,
			to: r.badgeDefinitionTable.id,
		}),
		achievementRanks: r.many.achievementRankTable(),
		personas: r.many.personaTable({
			from: r.achievementTable.id.through(r.personaAchievementTable.achievementId),
			to: r.personaTable.id.through(r.personaAchievementTable.personaId),
		}),
	},
	badgeDefinitionTable: {
		achievements: r.many.achievementTable(),
		personas: r.many.personaTable({
			from: r.badgeDefinitionTable.id.through(r.personaBadgeTable.badgeDefinitionId),
			to: r.personaTable.id.through(r.personaBadgeTable.personaId),
		}),
	},
	achievementRankTable: {
		achievement: r.one.achievementTable({
			from: r.achievementRankTable.achievementId,
			to: r.achievementTable.id,
		}),
		personaAchievements: r.many.personaAchievementTable({
			from: r.achievementRankTable.id.through(r.personaAchievementRankTable.achievementRankId),
			to: r.personaAchievementTable.id.through(r.personaAchievementRankTable.personaAchievementId),
		}),
	},
	personaTable: {
		users: r.many.userTable({
			from: r.personaTable.id.through(r.banTable.bannedById),
			to: r.userTable.id.through(r.banTable.userId),
			alias: "persona_id_user_id_via_ban",
		}),
		cars: r.many.carTable(),
		user: r.one.userTable({
			from: r.personaTable.userid,
			to: r.userTable.id,
			alias: "persona_userid_user_id",
		}),
		eventData: r.many.eventDataTable(),
		inventories: r.many.inventoryTable(),
		lobbies: r.many.lobbyTable(),
		achievements: r.many.achievementTable(),
		badgeDefinitions: r.many.badgeDefinitionTable(),
		giftCodes: r.many.giftCodeTable(),
		socialRelationships: r.many.socialRelationshipTable(),
		treasureHunts: r.many.treasureHuntTable(),
		eventSessions: r.many.eventSessionTable(),
	},
	userTable: {
		personasViaBan: r.many.personaTable({
			alias: "persona_id_user_id_via_ban",
		}),
		personasUserid: r.many.personaTable({
			alias: "persona_userid_user_id",
		}),
		inviteTickets: r.many.inviteTicketTable(),
		promoCodes: r.many.promoCodeTable(),
		socialRelationshipsFromUserId: r.many.socialRelationshipTable({
			alias: "socialRelationship_fromUserId_user_id",
		}),
		socialRelationshipsUserId: r.many.socialRelationshipTable({
			alias: "socialRelationship_userId_user_id",
		}),
	},
	carTable: {
		persona: r.one.personaTable({
			from: r.carTable.personaId,
			to: r.personaTable.id,
		}),
		paints: r.many.paintTable(),
		performanceparts: r.many.performancepartTable(),
		skillmodparts: r.many.skillmodpartTable(),
		vinyls: r.many.vinylTable(),
		visualparts: r.many.visualpartTable(),
	},
	cardPackItemTable: {
		cardPack: r.one.cardPackTable({
			from: r.cardPackItemTable.cardPackEntityID,
			to: r.cardPackTable.id,
		}),
	},
	cardPackTable: {
		cardPackItems: r.many.cardPackItemTable(),
	},
	eventTable: {
		eventRewardMultiplayerRewardConfigId: r.one.eventRewardTable({
			from: r.eventTable.multiplayerRewardConfigId,
			to: r.eventRewardTable.id,
			alias: "event_multiplayerRewardConfigId_eventReward_id",
		}),
		eventRewardPrivateRewardConfigId: r.one.eventRewardTable({
			from: r.eventTable.privateRewardConfigId,
			to: r.eventRewardTable.id,
			alias: "event_privateRewardConfigId_eventReward_id",
		}),
		eventRewardSingleplayerRewardConfigId: r.one.eventRewardTable({
			from: r.eventTable.singleplayerRewardConfigId,
			to: r.eventRewardTable.id,
			alias: "event_singleplayerRewardConfigId_eventReward_id",
		}),
		eventData: r.many.eventDataTable(),
		eventSessions: r.many.eventSessionTable(),
		lobbies: r.many.lobbyTable(),
	},
	eventRewardTable: {
		eventsMultiplayerRewardConfigId: r.many.eventTable({
			alias: "event_multiplayerRewardConfigId_eventReward_id",
		}),
		eventsPrivateRewardConfigId: r.many.eventTable({
			alias: "event_privateRewardConfigId_eventReward_id",
		}),
		eventsSingleplayerRewardConfigId: r.many.eventTable({
			alias: "event_singleplayerRewardConfigId_eventReward_id",
		}),
		rewardTableRewardTableRank1Id: r.one.rewardTableTable({
			from: r.eventRewardTable.rewardTableRank1Id,
			to: r.rewardTableTable.id,
			alias: "eventReward_rewardTableRank1Id_rewardTable_id",
		}),
		rewardTableRewardTableRank2Id: r.one.rewardTableTable({
			from: r.eventRewardTable.rewardTableRank2Id,
			to: r.rewardTableTable.id,
			alias: "eventReward_rewardTableRank2Id_rewardTable_id",
		}),
		rewardTableRewardTableRank3Id: r.one.rewardTableTable({
			from: r.eventRewardTable.rewardTableRank3Id,
			to: r.rewardTableTable.id,
			alias: "eventReward_rewardTableRank3Id_rewardTable_id",
		}),
		rewardTableRewardTableRank4Id: r.one.rewardTableTable({
			from: r.eventRewardTable.rewardTableRank4Id,
			to: r.rewardTableTable.id,
			alias: "eventReward_rewardTableRank4Id_rewardTable_id",
		}),
		rewardTableRewardTableRank5Id: r.one.rewardTableTable({
			from: r.eventRewardTable.rewardTableRank5Id,
			to: r.rewardTableTable.id,
			alias: "eventReward_rewardTableRank5Id_rewardTable_id",
		}),
		rewardTableRewardTableRank6Id: r.one.rewardTableTable({
			from: r.eventRewardTable.rewardTableRank6Id,
			to: r.rewardTableTable.id,
			alias: "eventReward_rewardTableRank6Id_rewardTable_id",
		}),
		rewardTableRewardTableRank7Id: r.one.rewardTableTable({
			from: r.eventRewardTable.rewardTableRank7Id,
			to: r.rewardTableTable.id,
			alias: "eventReward_rewardTableRank7Id_rewardTable_id",
		}),
		rewardTableRewardTableRank8Id: r.one.rewardTableTable({
			from: r.eventRewardTable.rewardTableRank8Id,
			to: r.rewardTableTable.id,
			alias: "eventReward_rewardTableRank8Id_rewardTable_id",
		}),
	},
	eventDataTable: {
		event: r.one.eventTable({
			from: r.eventDataTable.eventid,
			to: r.eventTable.id,
		}),
		eventSession: r.one.eventSessionTable({
			from: r.eventDataTable.eventSessionId,
			to: r.eventSessionTable.id,
		}),
		persona: r.one.personaTable({
			from: r.eventDataTable.personaId,
			to: r.personaTable.id,
		}),
	},
	eventSessionTable: {
		eventData: r.many.eventDataTable(),
		event: r.one.eventTable({
			from: r.eventSessionTable.eventid,
			to: r.eventTable.id,
		}),
		lobbyLobbyid: r.one.lobbyTable({
			from: r.eventSessionTable.lobbyid,
			to: r.lobbyTable.id,
			alias: "eventSession_lobbyid_lobby_id",
		}),
		lobbyNextlobbyid: r.one.lobbyTable({
			from: r.eventSessionTable.nextlobbyid,
			to: r.lobbyTable.id,
			alias: "eventSession_nextlobbyid_lobby_id",
		}),
		personas: r.many.personaTable({
			from: r.eventSessionTable.id.through(r.usedPowerupTable.eventSessionId),
			to: r.personaTable.id.through(r.usedPowerupTable.personaId),
		}),
	},
	rewardTableTable: {
		eventRewardsRewardTableRank1Id: r.many.eventRewardTable({
			alias: "eventReward_rewardTableRank1Id_rewardTable_id",
		}),
		eventRewardsRewardTableRank2Id: r.many.eventRewardTable({
			alias: "eventReward_rewardTableRank2Id_rewardTable_id",
		}),
		eventRewardsRewardTableRank3Id: r.many.eventRewardTable({
			alias: "eventReward_rewardTableRank3Id_rewardTable_id",
		}),
		eventRewardsRewardTableRank4Id: r.many.eventRewardTable({
			alias: "eventReward_rewardTableRank4Id_rewardTable_id",
		}),
		eventRewardsRewardTableRank5Id: r.many.eventRewardTable({
			alias: "eventReward_rewardTableRank5Id_rewardTable_id",
		}),
		eventRewardsRewardTableRank6Id: r.many.eventRewardTable({
			alias: "eventReward_rewardTableRank6Id_rewardTable_id",
		}),
		eventRewardsRewardTableRank7Id: r.many.eventRewardTable({
			alias: "eventReward_rewardTableRank7Id_rewardTable_id",
		}),
		eventRewardsRewardTableRank8Id: r.many.eventRewardTable({
			alias: "eventReward_rewardTableRank8Id_rewardTable_id",
		}),
		rewardTableItems: r.many.rewardTableItemTable(),
		treasureHuntConfigs: r.many.treasureHuntConfigTable(),
	},
	lobbyTable: {
		eventSessionsLobbyid: r.many.eventSessionTable({
			alias: "eventSession_lobbyid_lobby_id",
		}),
		eventSessionsNextlobbyid: r.many.eventSessionTable({
			alias: "eventSession_nextlobbyid_lobby_id",
		}),
		event: r.one.eventTable({
			from: r.lobbyTable.eventid,
			to: r.eventTable.id,
		}),
		personas: r.many.personaTable({
			from: r.lobbyTable.id.through(r.lobbyEntrantTable.lobbyid),
			to: r.personaTable.id.through(r.lobbyEntrantTable.personaid),
		}),
	},
	inventoryTable: {
		persona: r.one.personaTable({
			from: r.inventoryTable.personaId,
			to: r.personaTable.id,
		}),
		products: r.many.productTable({
			from: r.inventoryTable.id.through(r.inventoryItemTable.inventoryEntityId),
			to: r.productTable.productId.through(r.inventoryItemTable.productId),
		}),
	},
	inviteTicketTable: {
		user: r.one.userTable({
			from: r.inviteTicketTable.userid,
			to: r.userTable.id,
		}),
	},
	paintTable: {
		car: r.one.carTable({
			from: r.paintTable.carId,
			to: r.carTable.id,
		}),
	},
	amplifiersTable: {
		product: r.one.productTable({
			from: r.amplifiersTable.productId,
			to: r.productTable.productId,
		}),
	},
	productTable: {
		amplifiers: r.many.amplifiersTable(),
		basketdefinitions: r.one.basketdefinitionTable(),
		giftCodes: r.many.giftCodeTable(),
		inventories: r.many.inventoryTable(),
		product: r.one.productTable({
			from: r.productTable.parentProductId,
			to: r.productTable.id,
			alias: "product_parentProductId_product_id",
		}),
		products: r.many.productTable({
			alias: "product_parentProductId_product_id",
		}),
	},
	basketdefinitionTable: {
		product: r.one.productTable({
			from: r.basketdefinitionTable.productId,
			to: r.productTable.productId,
		}),
	},
	giftCodeTable: {
		product: r.one.productTable({
			from: r.giftCodeTable.productId,
			to: r.productTable.productId,
		}),
		personas: r.many.personaTable({
			from: r.giftCodeTable.code.through(r.personaGiftTable.code),
			to: r.personaTable.id.through(r.personaGiftTable.personaId),
		}),
	},
	performancepartTable: {
		car: r.one.carTable({
			from: r.performancepartTable.carId,
			to: r.carTable.id,
		}),
	},
	personaAchievementTable: {
		achievementRanks: r.many.achievementRankTable(),
	},
	promoCodeTable: {
		user: r.one.userTable({
			from: r.promoCodeTable.userid,
			to: r.userTable.id,
		}),
	},
	rewardTableItemTable: {
		rewardTable: r.one.rewardTableTable({
			from: r.rewardTableItemTable.rewardTableEntityID,
			to: r.rewardTableTable.id,
		}),
	},
	skillmodpartTable: {
		car: r.one.carTable({
			from: r.skillmodpartTable.carId,
			to: r.carTable.id,
		}),
	},
	socialRelationshipTable: {
		persona: r.one.personaTable({
			from: r.socialRelationshipTable.remotePersonaId,
			to: r.personaTable.id,
		}),
		userFromUserId: r.one.userTable({
			from: r.socialRelationshipTable.fromUserId,
			to: r.userTable.id,
			alias: "socialRelationship_fromUserId_user_id",
		}),
		userUserId: r.one.userTable({
			from: r.socialRelationshipTable.userId,
			to: r.userTable.id,
			alias: "socialRelationship_userId_user_id",
		}),
	},
	treasureHuntTable: {
		persona: r.one.personaTable({
			from: r.treasureHuntTable.personaId,
			to: r.personaTable.id,
		}),
	},
	treasureHuntConfigTable: {
		rewardTable: r.one.rewardTableTable({
			from: r.treasureHuntConfigTable.rewardTableId,
			to: r.rewardTableTable.id,
		}),
	},
	vinylTable: {
		car: r.one.carTable({
			from: r.vinylTable.carId,
			to: r.carTable.id,
		}),
	},
	vinylproductTable: {
		category: r.one.categoryTable({
			from: r.vinylproductTable.parentCategoryId,
			to: r.categoryTable.idcategory,
		}),
	},
	categoryTable: {
		vinylproducts: r.many.vinylproductTable(),
	},
	visualpartTable: {
		car: r.one.carTable({
			from: r.visualpartTable.carId,
			to: r.carTable.id,
		}),
	},
}));