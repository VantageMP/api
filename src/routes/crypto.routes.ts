import Elysia from "elysia";
import * as cryptoController from "@/controllers/crypto.controller";

export const cryptoRoutes = new Elysia({ prefix: "/Crypto" }).get("/cryptoticket", () =>
	cryptoController.cryptoTicket(),
);
