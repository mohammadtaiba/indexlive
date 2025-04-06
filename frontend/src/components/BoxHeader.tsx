import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

type Props = {
    title: string;
    sideText: string;
};

const BoxHeader = ({ title, sideText }: Props) => {
    const { palette } = useTheme();
    return (
        <FlexBetween margin="1rem">

            <FlexBetween>
                <Box width="100%">
                    <Typography variant="h4"> {title} </Typography>
                </Box>
            </FlexBetween>

            <Typography
                variant="h5"
                fontWeight="900"
                color={palette.primary['900' as keyof typeof palette.primary]}
                sx={{
                    backgroundColor: palette.grey[100],
                    padding: '0.35rem',
                    borderRadius: '0.35rem',
                }}
            >
                {sideText}
            </Typography>
        </FlexBetween>
    );
};

export default BoxHeader;