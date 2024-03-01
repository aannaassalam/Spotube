/* eslint-disable no-restricted-syntax */
import {
  serverSpotifyIndividualPlaylist,
  serverSpotifyIndividualPlaylistTracks
} from "@/api/functions/spotify";
import {
  addItemsToPlaylist,
  createPlaylist,
  searchTracksServer
} from "@/api/functions/youtube";
import { StyledTransfer } from "@/styles/StyledComponents/Transfer";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Box, Container, Stack } from "@mui/system";
import { useMutation } from "@tanstack/react-query";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const cookies = parseCookies(context);

  const playlist = await serverSpotifyIndividualPlaylist(
    cookies.spotify_token,
    query.playlist_id as string
  );
  const playlist_tracks = await serverSpotifyIndividualPlaylistTracks(
    cookies.spotify_token,
    query.playlist_id as string
  );
  const queries = playlist_tracks.items?.map((_item) => {
    const artists = _item.track.artists
      .map((_artist) => _artist.name)
      .join(" & ");
    return `${_item.track.name} by ${artists}`;
  });
  const youtube_tracks = [];
  for await (const query of queries) {
    const track = await searchTracksServer(cookies.google_token, query);
    youtube_tracks.push(track.items[0]);
  }

  return {
    props: {
      playlist,
      playlist_tracks: playlist_tracks.items,
      youtube_tracks
    }
  };
};

const schema = yup.object().shape({
  playlist_name: yup.string().required("Please enter a playlist name")
});

export default function Transfer({
  playlist,
  playlist_tracks,
  youtube_tracks
}) {
  const router = useRouter();
  const cookies = parseCookies();
  const [playlistData, setPlaylistData] = useState({});
  console.log(youtube_tracks);

  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      playlist_name: playlist.name
    }
  });

  const { mutate: addItem } = useMutation({
    mutationFn: addItemsToPlaylist,
    onSuccess: (data) => {
      toast.success("Done");
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createPlaylist,
    onSuccess: async (data) => {
      setPlaylistData(data);
      for await (const item of youtube_tracks) {
        addItem({
          playlistId: data.id,
          resourseId: {
            videoId: item.id.videoId,
            channelId: item.snippet.channelId,
            kind: item.id.kind,
            playlistId: data.id
          }
        });
      }
    }
  });

  useEffect(() => {
    if (errors.playlist_name?.message) {
      toast.error(errors.playlist_name.message);
    }
  }, [errors]);

  const onSubmit = (data) => {
    mutate(data.playlist_name);
  };

  return (
    <StyledTransfer>
      <Container fixed>
        <Typography variant="h1" textAlign="center" marginBottom={5}>
          Spotube
        </Typography>
        <Typography variant="h3" textAlign="center">
          Transferring &quot;{playlist.name}&quot; to Youtube Music
        </Typography>
        <Stack direction="row" className="input_box">
          <Controller
            name="playlist_name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                placeholder="Enter your new playlist name here..."
                fullWidth
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Start
          </Button>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          className="transfer_box"
        >
          <Box className="tracks">
            {playlist_tracks.map((_track: any) => {
              return (
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1}
                  className="each_track"
                >
                  <Image
                    src={_track.track.album.images[0].url}
                    width={30}
                    height={30}
                    alt="image"
                  />
                  <Typography variant="body1">{_track.track.name}</Typography>
                </Stack>
              );
            })}
          </Box>
          <Box className="tracks">
            {youtube_tracks.map((_track: any) => {
              return (
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1}
                  className="each_track"
                >
                  <Image
                    src={_track.snippet.thumbnails.default.url}
                    width={30}
                    height={30}
                    alt="image"
                  />
                  <Typography variant="body1">
                    {_track.snippet.title}
                  </Typography>
                </Stack>
              );
            })}
          </Box>
        </Stack>
      </Container>
    </StyledTransfer>
  );
}
