import XMLBuilder from "fast-xml-builder";
import { XMLParser } from "fast-xml-parser";

const builder = new XMLBuilder({
	ignoreAttributes: false,
	attributeNamePrefix: "@_",
	format: true,
	suppressEmptyNode: true,
});

const parser = new XMLParser({
	ignoreAttributes: false,
	attributeNamePrefix: "@_",
});

export function toXml(data: Record<string, unknown>): Response {
	const xmlString = builder.build(data);
	return new Response(xmlString, {
		headers: { "content-type": "application/xml; charset=utf-8" },
	});
}

export function fromXml<T = unknown>(xmlString: string): T {
	return parser.parse(xmlString) as T;
}
