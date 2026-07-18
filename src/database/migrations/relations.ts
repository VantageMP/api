import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	achievement: {
		badgeDefinition: r.one.badgeDefinition({
			from: r.achievement.badgeDefinitionId,
			to: r.badgeDefinition.id,
		}),
		achievementRanks: r.many.achievementRank(),
		personas: r.many.persona({
			from: r.achievement.id.through(r.personaAchievement.achievementId),
			to: r.persona.id.through(r.personaAchievement.personaId),
		}),
	},
	badgeDefinition: {
		achievements: r.many.achievement(),
		personas: r.many.persona({
			from: r.badgeDefinition.id.through(r.personaBadge.badgeDefinitionId),
			to: r.persona.id.through(r.personaBadge.personaId),
		}),
	},
	achievementRank: {
		achievement: r.one.achievement({
			from: r.achievementRank.achievementId,
			to: r.achievement.id,
		}),
		personaAchievements: r.many.personaAchievement({
			from: r.achievementRank.id.through(r.personaAchievementRank.achievementRankId),
			to: r.personaAchievement.id.through(r.personaAchievementRank.personaAchievementId),
		}),
	},
	persona: {
		users: r.many.user({
			from: r.persona.id.through(r.ban.bannedById),
			to: r.user.id.through(r.ban.userId),
			alias: "persona_id_user_id_via_ban",
		}),
		cars: r.many.car(),
		user: r.one.user({
			from: r.persona.userid,
			to: r.user.id,
			alias: "persona_userid_user_id",
		}),
		eventData: r.many.eventData(),
		inventories: r.many.inventory(),
		lobbies: r.many.lobby(),
		achievements: r.many.achievement(),
		badgeDefinitions: r.many.badgeDefinition(),
		giftCodes: r.many.giftCode(),
		socialRelationships: r.many.socialRelationship(),
		treasureHunts: r.many.treasureHunt(),
		eventSessions: r.many.eventSession(),
	},
	user: {
		personasViaBan: r.many.persona({
			alias: "persona_id_user_id_via_ban",
		}),
		personasUserid: r.many.persona({
			alias: "persona_userid_user_id",
		}),
		inviteTickets: r.many.inviteTicket(),
		promoCodes: r.many.promoCode(),
		socialRelationshipsFromUserId: r.many.socialRelationship({
			alias: "socialRelationship_fromUserId_user_id",
		}),
		socialRelationshipsUserId: r.many.socialRelationship({
			alias: "socialRelationship_userId_user_id",
		}),
	},
	car: {
		persona: r.one.persona({
			from: r.car.personaId,
			to: r.persona.id,
		}),
		paints: r.many.paint(),
		performanceparts: r.many.performancepart(),
		skillmodparts: r.many.skillmodpart(),
		vinyls: r.many.vinyl(),
		visualparts: r.many.visualpart(),
	},
	cardPackItem: {
		cardPack: r.one.cardPack({
			from: r.cardPackItem.cardPackEntityID,
			to: r.cardPack.id,
		}),
	},
	cardPack: {
		cardPackItems: r.many.cardPackItem(),
	},
	event: {
		eventRewardMultiplayerRewardConfigId: r.one.eventReward({
			from: r.event.multiplayerRewardConfigId,
			to: r.eventReward.id,
			alias: "event_multiplayerRewardConfigId_eventReward_id",
		}),
		eventRewardPrivateRewardConfigId: r.one.eventReward({
			from: r.event.privateRewardConfigId,
			to: r.eventReward.id,
			alias: "event_privateRewardConfigId_eventReward_id",
		}),
		eventRewardSingleplayerRewardConfigId: r.one.eventReward({
			from: r.event.singleplayerRewardConfigId,
			to: r.eventReward.id,
			alias: "event_singleplayerRewardConfigId_eventReward_id",
		}),
		eventData: r.many.eventData(),
		eventSessions: r.many.eventSession(),
		lobbies: r.many.lobby(),
	},
	eventReward: {
		eventsMultiplayerRewardConfigId: r.many.event({
			alias: "event_multiplayerRewardConfigId_eventReward_id",
		}),
		eventsPrivateRewardConfigId: r.many.event({
			alias: "event_privateRewardConfigId_eventReward_id",
		}),
		eventsSingleplayerRewardConfigId: r.many.event({
			alias: "event_singleplayerRewardConfigId_eventReward_id",
		}),
		rewardTableRewardTableRank1Id: r.one.rewardTable({
			from: r.eventReward.rewardTableRank1Id,
			to: r.rewardTable.id,
			alias: "eventReward_rewardTableRank1Id_rewardTable_id",
		}),
		rewardTableRewardTableRank2Id: r.one.rewardTable({
			from: r.eventReward.rewardTableRank2Id,
			to: r.rewardTable.id,
			alias: "eventReward_rewardTableRank2Id_rewardTable_id",
		}),
		rewardTableRewardTableRank3Id: r.one.rewardTable({
			from: r.eventReward.rewardTableRank3Id,
			to: r.rewardTable.id,
			alias: "eventReward_rewardTableRank3Id_rewardTable_id",
		}),
		rewardTableRewardTableRank4Id: r.one.rewardTable({
			from: r.eventReward.rewardTableRank4Id,
			to: r.rewardTable.id,
			alias: "eventReward_rewardTableRank4Id_rewardTable_id",
		}),
		rewardTableRewardTableRank5Id: r.one.rewardTable({
			from: r.eventReward.rewardTableRank5Id,
			to: r.rewardTable.id,
			alias: "eventReward_rewardTableRank5Id_rewardTable_id",
		}),
		rewardTableRewardTableRank6Id: r.one.rewardTable({
			from: r.eventReward.rewardTableRank6Id,
			to: r.rewardTable.id,
			alias: "eventReward_rewardTableRank6Id_rewardTable_id",
		}),
		rewardTableRewardTableRank7Id: r.one.rewardTable({
			from: r.eventReward.rewardTableRank7Id,
			to: r.rewardTable.id,
			alias: "eventReward_rewardTableRank7Id_rewardTable_id",
		}),
		rewardTableRewardTableRank8Id: r.one.rewardTable({
			from: r.eventReward.rewardTableRank8Id,
			to: r.rewardTable.id,
			alias: "eventReward_rewardTableRank8Id_rewardTable_id",
		}),
	},
	eventData: {
		event: r.one.event({
			from: r.eventData.eventid,
			to: r.event.id,
		}),
		eventSession: r.one.eventSession({
			from: r.eventData.eventSessionId,
			to: r.eventSession.id,
		}),
		persona: r.one.persona({
			from: r.eventData.personaId,
			to: r.persona.id,
		}),
	},
	eventSession: {
		eventData: r.many.eventData(),
		event: r.one.event({
			from: r.eventSession.eventid,
			to: r.event.id,
		}),
		lobbyLobbyid: r.one.lobby({
			from: r.eventSession.lobbyid,
			to: r.lobby.id,
			alias: "eventSession_lobbyid_lobby_id",
		}),
		lobbyNextlobbyid: r.one.lobby({
			from: r.eventSession.nextlobbyid,
			to: r.lobby.id,
			alias: "eventSession_nextlobbyid_lobby_id",
		}),
		personas: r.many.persona({
			from: r.eventSession.id.through(r.usedPowerup.eventSessionId),
			to: r.persona.id.through(r.usedPowerup.personaId),
		}),
	},
	rewardTable: {
		eventRewardsRewardTableRank1Id: r.many.eventReward({
			alias: "eventReward_rewardTableRank1Id_rewardTable_id",
		}),
		eventRewardsRewardTableRank2Id: r.many.eventReward({
			alias: "eventReward_rewardTableRank2Id_rewardTable_id",
		}),
		eventRewardsRewardTableRank3Id: r.many.eventReward({
			alias: "eventReward_rewardTableRank3Id_rewardTable_id",
		}),
		eventRewardsRewardTableRank4Id: r.many.eventReward({
			alias: "eventReward_rewardTableRank4Id_rewardTable_id",
		}),
		eventRewardsRewardTableRank5Id: r.many.eventReward({
			alias: "eventReward_rewardTableRank5Id_rewardTable_id",
		}),
		eventRewardsRewardTableRank6Id: r.many.eventReward({
			alias: "eventReward_rewardTableRank6Id_rewardTable_id",
		}),
		eventRewardsRewardTableRank7Id: r.many.eventReward({
			alias: "eventReward_rewardTableRank7Id_rewardTable_id",
		}),
		eventRewardsRewardTableRank8Id: r.many.eventReward({
			alias: "eventReward_rewardTableRank8Id_rewardTable_id",
		}),
		rewardTableItems: r.many.rewardTableItem(),
		treasureHuntConfigs: r.many.treasureHuntConfig(),
	},
	lobby: {
		eventSessionsLobbyid: r.many.eventSession({
			alias: "eventSession_lobbyid_lobby_id",
		}),
		eventSessionsNextlobbyid: r.many.eventSession({
			alias: "eventSession_nextlobbyid_lobby_id",
		}),
		event: r.one.event({
			from: r.lobby.eventid,
			to: r.event.id,
		}),
		personas: r.many.persona({
			from: r.lobby.id.through(r.lobbyEntrant.lobbyid),
			to: r.persona.id.through(r.lobbyEntrant.personaid),
		}),
	},
	inventory: {
		persona: r.one.persona({
			from: r.inventory.personaId,
			to: r.persona.id,
		}),
		products: r.many.product({
			from: r.inventory.id.through(r.inventoryItem.inventoryEntityId),
			to: r.product.productId.through(r.inventoryItem.productId),
		}),
	},
	inviteTicket: {
		user: r.one.user({
			from: r.inviteTicket.userid,
			to: r.user.id,
		}),
	},
	paint: {
		car: r.one.car({
			from: r.paint.carId,
			to: r.car.id,
		}),
	},
	amplifiers: {
		product: r.one.product({
			from: r.amplifiers.productId,
			to: r.product.productId,
		}),
	},
	product: {
		amplifiers: r.many.amplifiers(),
		basketdefinitions: r.one.basketdefinition(),
		giftCodes: r.many.giftCode(),
		inventories: r.many.inventory(),
		product: r.one.product({
			from: r.product.parentProductId,
			to: r.product.id,
			alias: "product_parentProductId_product_id",
		}),
		products: r.many.product({
			alias: "product_parentProductId_product_id",
		}),
	},
	basketdefinition: {
		product: r.one.product({
			from: r.basketdefinition.productId,
			to: r.product.productId,
		}),
	},
	giftCode: {
		product: r.one.product({
			from: r.giftCode.productId,
			to: r.product.productId,
		}),
		personas: r.many.persona({
			from: r.giftCode.code.through(r.personaGift.code),
			to: r.persona.id.through(r.personaGift.personaId),
		}),
	},
	performancepart: {
		car: r.one.car({
			from: r.performancepart.carId,
			to: r.car.id,
		}),
	},
	personaAchievement: {
		achievementRanks: r.many.achievementRank(),
	},
	promoCode: {
		user: r.one.user({
			from: r.promoCode.userid,
			to: r.user.id,
		}),
	},
	rewardTableItem: {
		rewardTable: r.one.rewardTable({
			from: r.rewardTableItem.rewardTableEntityID,
			to: r.rewardTable.id,
		}),
	},
	skillmodpart: {
		car: r.one.car({
			from: r.skillmodpart.carId,
			to: r.car.id,
		}),
	},
	socialRelationship: {
		persona: r.one.persona({
			from: r.socialRelationship.remotePersonaId,
			to: r.persona.id,
		}),
		userFromUserId: r.one.user({
			from: r.socialRelationship.fromUserId,
			to: r.user.id,
			alias: "socialRelationship_fromUserId_user_id",
		}),
		userUserId: r.one.user({
			from: r.socialRelationship.userId,
			to: r.user.id,
			alias: "socialRelationship_userId_user_id",
		}),
	},
	treasureHunt: {
		persona: r.one.persona({
			from: r.treasureHunt.personaId,
			to: r.persona.id,
		}),
	},
	treasureHuntConfig: {
		rewardTable: r.one.rewardTable({
			from: r.treasureHuntConfig.rewardTableId,
			to: r.rewardTable.id,
		}),
	},
	vinyl: {
		car: r.one.car({
			from: r.vinyl.carId,
			to: r.car.id,
		}),
	},
	vinylproduct: {
		category: r.one.category({
			from: r.vinylproduct.parentCategoryId,
			to: r.category.idcategory,
		}),
	},
	category: {
		vinylproducts: r.many.vinylproduct(),
	},
	visualpart: {
		car: r.one.car({
			from: r.visualpart.carId,
			to: r.car.id,
		}),
	},
}));
