// Fixed session key representing 16 null bytes (AES-128 null key), required by the client protocol.
export const PROTOCOL_SESSION_KEY = "AAAAAAAAAAAAAAAAAAAAAA==";

// Static 32-byte handshake ticket: [10, 11, 12, 13] followed by 28 zero bytes, base64-encoded.
export const PROTOCOL_HELLO_TICKET = "CgsMDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
