import { serverSpotifyPlaylists } from "@/api/functions/spotify";
import { StyledPlaylist } from "@/styles/StyledComponents/Playlist";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { Container, Stack } from "@mui/system";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const res = await serverSpotifyPlaylists(cookies.spotify_token);
  return {
    props: {
      list: res.items
    }
  };
};

export default function Transfer({ list }: { list: any[] }) {
  const [preference, setPreference] = useState("private");
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  const router = useRouter();

  return (
    <StyledPlaylist>
      <Container fixed>
        <Typography variant="h1" textAlign="center" marginBottom={5}>
          Spotube
        </Typography>
        <FormControl className="radio-container">
          <FormLabel id="demo-row-radio-buttons-group-label">
            Preference
          </FormLabel>
          <RadioGroup
            row
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
          >
            <FormControlLabel
              value="private"
              control={<Radio />}
              label="Private"
            />
            <FormControlLabel
              value="public"
              control={<Radio />}
              label="Public"
            />
          </RadioGroup>
        </FormControl>
        <Stack
          direction="row"
          alignItems="flex-start"
          columnGap={3}
          rowGap={2}
          flexWrap="wrap"
        >
          {list.map((_list: { id: string; images: any[]; name: string }) => {
            return (
              <Stack
                direction="column"
                alignItems="center"
                gap={1}
                key={_list.id}
                className={`each-playlist ${
                  selectedPlaylist === _list.id && "selected"
                }`}
                onClick={() => setSelectedPlaylist(_list.id)}
              >
                <Image
                  src={_list.images[0].url}
                  alt={_list.name}
                  width={150}
                  height={150}
                />
                {_list.name && (
                  <Typography variant="body1">{_list.name}</Typography>
                )}
              </Stack>
            );
          })}
        </Stack>
        {selectedPlaylist && (
          <Fab
            variant="extended"
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16
            }}
            onClick={() =>
              router.push({
                pathname: "/transfer",
                query: {
                  playlist_id: selectedPlaylist
                }
              })
            }
          >
            Next
            <NavigationIcon sx={{ ml: 1, transform: "rotate(90deg)" }} />
          </Fab>
        )}
      </Container>
    </StyledPlaylist>
  );
}
