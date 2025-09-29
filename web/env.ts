export const CMS_API_BASE = process.env.CMS_API_BASE || "http://127.0.0.1:8090";

if (!process.env.CMS_API_TOKEN || process.env.CMS_API_TOKEN.length === 0) {
    throw new Error("Missing CMS_API_TOKEN environment variable");
}

export const CMS_API_TOKEN = process.env.CMS_API_TOKEN;