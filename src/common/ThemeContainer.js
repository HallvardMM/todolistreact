import { deepOrange, deepPurple, red } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: deepOrange[500],
    },
    secondary: {
      main: deepPurple[500],
    },
    danger: {
      main: red[500],
    },
  },
});

export default function ThemeContainer(props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
