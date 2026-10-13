import { PROTOCOL_HELLO_TICKET, PROTOCOL_SESSION_KEY } from "@/constants/crypto.constants";
import type { CryptoTicketResponse } from "@/models/schema/crypto.schema";

export const buildHandshakeTicket = (): CryptoTicketResponse => {
	const ivBytes = crypto.getRandomValues(new Uint8Array(16));
	const ticketIv = Buffer.from(ivBytes).toString("base64");

	return {
		ClientServerCryptoTicket: {
			CryptoTicket: PROTOCOL_HELLO_TICKET,
			SessionKey: PROTOCOL_SESSION_KEY,
			TicketIv: ticketIv,
		},
	};
};
