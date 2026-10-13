import { t } from "elysia";

export const clientServerCryptoTicketSchema = t.Object({
	CryptoTicket: t.String(),
	SessionKey: t.String(),
	TicketIv: t.String(),
});

export const cryptoTicketResponseSchema = t.Object({
	ClientServerCryptoTicket: clientServerCryptoTicketSchema,
});

export type ClientServerCryptoTicket = typeof clientServerCryptoTicketSchema.static;
export type CryptoTicketResponse = typeof cryptoTicketResponseSchema.static;
