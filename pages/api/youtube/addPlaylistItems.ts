import { endpoints } from "@/api/endpoints";
import youtubeInstance from "@/api/youtubeInstance";
import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Fetch data from the external API using the sector parameter
    const cookies = parseCookies({ req });

    const externalApiResponse = await youtubeInstance.post(
      endpoints.youtube.add_items,
      {
        snippet: req.body
      },
      {
        params: {
          part: "snippet"
        },
        headers: {
          Authorization: `Bearer ${cookies.google_token}`
        }
      }
    );

    // Extract the relevant data from the external API response

    res.status(200).json(externalApiResponse.data);
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error("Error in API route:", JSON.stringify(error, null, 2));
    res.status(500).json({ error: "Internal Server Error" });
  }
};
