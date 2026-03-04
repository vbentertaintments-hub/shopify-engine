import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { shop } = req.query;

  if (!shop) {
    res.status(400).json({ error: "Missing shop parameter" });
    return;
  }

  const apiKey = process.env.SHOPIFY_API_KEY;
  const scopes = process.env.SHOPIFY_SCOPES;
  const redirectUri = `${process.env.SHOPIFY_APP_URL}/api/callback`;

  const installUrl =
    `https://${shop}/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${redirectUri}`;

  res.redirect(installUrl);
}