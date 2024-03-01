import assets from "@/json/assets";
import DoneIcon from "@mui/icons-material/Done";
import { Stack } from "@mui/system";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { parseCookies, setCookie } from "nookies";
import { authOptions } from "./api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session?.user?.provider === "spotify") {
    setCookie(context, "spotify_user", JSON.stringify(session?.user));
    setCookie(context, "spotify_token", session?.user?.access_token);
    setCookie(context, "spotify_expires", session?.user?.expiresIn);
  } else if (session?.user?.provider === "google") {
    setCookie(context, "google_user", JSON.stringify(session?.user));
    setCookie(context, "google_token", session?.user?.access_token);
  }
  return {
    props: {}
  };
};

export default function Homepage() {
  const cookies = parseCookies();

  return (
    <div>
      {/* {cookies.spotify_token ? ( */}
      <Stack direction="row" alignItems="center" gap={2}>
        {cookies.spotify_token && <DoneIcon fontSize="medium" />}
        <button
          type="button"
          onClick={() => {
            signIn("spotify");
          }}
          disabled={Boolean(cookies.spotify_token)}
        >
          <Image
            src={assets.spotify}
            alt="spotify"
            width={250}
            height={60}
            style={{ backgroundColor: "#fff", borderRadius: 25 }}
          />
        </button>
      </Stack>
      <Stack direction="row" alignItems="center" gap={2}>
        {cookies.google_token && <DoneIcon fontSize="medium" />}
        <button
          type="button"
          onClick={() => {
            signIn("google");
          }}
          disabled={Boolean(cookies.google_token)}
        >
          <Image
            src={assets.google}
            alt="google"
            width={250}
            height={60}
            style={{ backgroundColor: "#fff", borderRadius: 25 }}
          />
        </button>
      </Stack>
      {/* // ) : (
      //   <button
      //     type="button"
      //     onClick={() => {
      //       signIn("spotify");
      //     }}
      //   >
      //     <Image
      //       src={assets.spotify}
      //       alt="spotify"
      //       width={250}
      //       key="spotify"
      //       height={60}
      //       style={{ backgroundColor: "#fff", borderRadius: 15 }}
      //     />
      //   </button>
      // )} */}
    </div>
  );
}
