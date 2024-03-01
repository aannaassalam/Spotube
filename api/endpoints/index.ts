export const baseUrl = process.env.NEXT_APP_BASE_URL;
export const baseUrlApi = `${process.env.NEXT_APP_BASE_URL}/api`;
export const baseUrlMedia = process.env.NEXT_APP_BASE_URL;

// Spotify

export const spotifyBaseUrl = process.env.NEXT_APP_SPOTIFY_BASE_URL;
export const spotifyBaseUrlApi = `${process.env.NEXT_APP_SPOTIFY_BASE_URL}/v1`;

// Youtube

export const youtubeBaseUrl = process.env.NEXT_APP_YOUTUBE_BASE_URL;
export const youtubeBaseUrlApi = `${process.env.NEXT_APP_YOUTUBE_BASE_URL}/v3`;

// api doc => https://militarymoves-admin.dedicateddevelopers.us/apidoc

export const mediaUrl = (url: string) => {
  return `${baseUrlMedia}/uploads/${url}`;
};

export const endpoints = {
  spotify: {
    my_playlist: "/me/playlists",
    playlist: "/playlists",
    playlist_tracks: (playlist_id: string) => `/playlists/${playlist_id}/tracks`
  },
  youtube: {
    create_playlist: "/playlists",
    search: "/search",
    add_items: "/playlistItems"
  }
};
export const sucessNotificationEndPoints = [
  // endpoints.auth.signup,
  // endpoints.auth.signUpProfile,
  // endpoints.auth.login,
  // endpoints.auth.profileUpdate
];
