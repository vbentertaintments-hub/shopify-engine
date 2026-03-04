import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const { shop } = req.query;

  const clientId = process.env.SHOPIFY_API_KEY;
  const scopes = process.env.SHOPIFY_SCOPES;
  const appUrl = process.env.SHOPIFY_APP_URL;

  if (!shop) {
    return res.status(200).json({
      message: "Debug environment check",
      SHOPIFY_API_KEY: clientId,
      SHOPIFY_SCOPES: scopes,
      SHOPIFY_APP_URL: appUrl
    });
  }

  const redirectUri = `${appUrl}/api/callback`;

  const installUrl =
    `https://${shop}/admin/oauth/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`;

  res.redirect(installUrl);
}