import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const StyledTransfer = styled(Box)`
  background: #0b1623;
  /* box-shadow: 0px 4px 58px rgba(0, 0, 0, 0.07); */
  padding-block: 50px;
  .input_box {
    margin: 40px auto;
    width: 60%;
    background-color: #fff;
    border-radius: 15px;
    overflow: hidden;
    border-color: transparent;
    .MuiInputBase-root {
      color: #333;
      &.Mui-focused {
        fieldset {
          border-color: transparent;
        }
      }
    }
    button {
      width: 20%;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  .transfer_box {
    margin-top: 50px;
    .tracks {
      width: 40%;
      padding: 10px;
      border-radius: 20px;
      border: 1px solid #eeeeee5f;
      .each_track {
        padding: 10px;
        border-radius: 10px;
        &:hover {
          background-color: #ffffff22;
        }
        p {
          font-size: 14px;
        }
      }
    }
  }
`;
