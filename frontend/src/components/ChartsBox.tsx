import { Box } from "@mui/material";
import { styled } from "@mui/system";

const ChartsBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: "1rem",
    boxShadow: "0.1rem 0.1rem 0.5rem rgba(0, 0, 0, 0.1)",
}));

export default ChartsBox;