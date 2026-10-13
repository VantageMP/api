import type { CryptoTicketResponse } from "@/models/schema/crypto.schema";
import * as cryptoService from "@/services/crypto.service";

export const cryptoTicket = (): CryptoTicketResponse => {
	return cryptoService.buildHandshakeTicket();
};
