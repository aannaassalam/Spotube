import axios from "axios";
import { endpoints } from "../endpoints";
import youtubeInstance from "../youtubeInstance";

export const createPlaylist = async (playlist_name: string) => {
  const res = await axios.post("/api/youtube/createPlaylist", {
    playlist_name
  });
  return res?.data;
};

export const searchTracksServer = async (token: string, query: string) => {
  const res = await youtubeInstance.get(endpoints.youtube.search, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      part: "snippet",
      q: query
    }
  });
  return res.data;
};

export const addItemsToPlaylist = async (body: any) => {
  const res = await axios.post("/api/youtube/addPlaylistItems", body);
  return res?.data;
};

// export const serverSpotifyIndividualPlaylist = async (
//   token: string,
//   playlist_id: string
// ) => {
//   const res = await spotifyInstance.get(
//     `${endpoints.spotify.playlist}/${playlist_id}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`
//       },
//       params: {
//         fields: encodeURIComponent("name").replace(/[!'()*]/g, (c) => {
//           return `%${c.charCodeAt(0).toString(16)}`;
//         })
//       }
//     }
//   );
//   return res.data;
// };

// export const serverSpotifyIndividualPlaylistTracks = async (
//   token: string,
//   playlist_id: string
// ) => {
//   const res = await spotifyInstance.get(
//     `${endpoints.spotify.playlist_tracks(
//       playlist_id
//     )}?fields:${encodeURIComponent(
//       "items(is_local,track(album(name,images,artists(name))))"
//     ).replace(/[!'()*]/g, (c) => {
//       return `%${c.charCodeAt(0).toString(16)}`;
//     })}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }
//   );
//   return res.data;
// };
