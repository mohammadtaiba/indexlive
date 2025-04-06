import { Box, useMediaQuery } from "@mui/material";
import Set1 from "./Set1.tsx";
import Set2 from "./Set2.tsx";
import Set3 from "./Set3.tsx";

const gridTemplateLargeScreens = `
"a b"
"a b"
"a b"
"a b"

"c d"
"c d"
"c d"
"c d"

"e f"
"e f"
"e f"
"e f"
"e f"
"e f"
"e f"

"g h"
"g h"
"g h"
`;
const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  
  "b"
  "b"
  "b"
  "b"
  
  "c"
  "c"
  "c"
  "c"
  
  "d"
  "d"
  "d"
  
  "e"
  "e"
  "e"
  "e"
  "e"
  "e"

  "f"
  "f"
  "f"
  "f"
  "f"
  "f"
  
  "g"
  "g"
  
  "h"
  "h"
`;

const Charts = () => {
    const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
    return (
        <Box
            width="100%"
            height="100%"
            display="grid"
            gap="1.5rem"
            sx={
                isAboveMediumScreens
                    ? {
                        gridTemplateColumns: "repeat(2, minmax(37px, 1fr))",
                        gridTemplateRows: "repeat(20, minmax(60px, 1fr))",
                        gridTemplateAreas: gridTemplateLargeScreens,
                    }
                    : {
                        gridAutoColumns: "1fr",
                        gridAutoRows: "80px",
                        gridTemplateAreas: gridTemplateSmallScreens,
                    }
            }
        >
            <Set1 />
            <Set2 />
            <Set3 />
        </Box>
    );
};

export default Charts;