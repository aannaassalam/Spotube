import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const StyledPlaylist = styled(Box)`
  background: #0b1623;
  /* box-shadow: 0px 4px 58px rgba(0, 0, 0, 0.07); */
  padding-block: 50px;
  .radio-container {
    width: 100%;
    align-items: center;
    margin-bottom: 40px;
  }
  .each-playlist {
    width: 170px;
    background-color: #042248;
    border: 1px solid #eeeeee5f;
    padding: 10px;
    border-radius: 20px;

    img {
      border-radius: 12px;
      object-fit: cover;
    }
    p {
      font-size: 14px;
      width: 100%;
      padding-left: 2px;
    }
    &.selected {
      border: 1px solid #eeeeee;
    }
  }
`;
