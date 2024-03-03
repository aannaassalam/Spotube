import { endpoints } from "../endpoints";
import spotifyInstance from "../spotifyInstance";

export const serverSpotifyPlaylists = async (token: string) => {
  const res = await spotifyInstance.get(
    `${endpoints.spotify.my_playlist}?limit=50`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return res?.data;
};

export const serverSpotifyIndividualPlaylist = async (
  token: string,
  playlist_id: string
) => {
  const res = await spotifyInstance.get(
    `${endpoints.spotify.playlist}/${playlist_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        fields: encodeURIComponent("name").replace(/[!'()*]/g, (c) => {
          return `%${c.charCodeAt(0).toString(16)}`;
        })
      }
    }
  );
  return res.data;
};

export const serverSpotifyIndividualPlaylistTracks = async (
  token: string,
  playlist_id: string
) => {
  const res = await spotifyInstance.get(
    `${endpoints.spotify.playlist_tracks(
      playlist_id
    )}?fields:${encodeURIComponent(
      "items(is_local,track(album(name,images,artists(name))))"
    ).replace(/[!'()*]/g, (c) => {
      return `%${c.charCodeAt(0).toString(16)}`;
    })}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return res.data;
};
