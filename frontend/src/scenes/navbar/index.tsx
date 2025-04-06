import { useState } from "react";
import { Link } from "react-router-dom";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween.tsx";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { palette } = useTheme();
    const [selected, setSelected] = useState("charts");
    const navigate = useNavigate();

    return (
        <FlexBetween mb="0.25rem" p="0.5rem 0">
            {/* LEFT SIDE */}
            <FlexBetween gap="0.75rem"
                         sx={{
                             cursor: 'pointer',
                             "&:hover": { color: palette.primary['900' as keyof typeof palette.primary] },
                         }}
                         onClick={() => {
                             navigate('/');
                             setSelected('home');

                         }}
            >
                <CurrencyExchangeIcon sx={{ fontSize: "28px", color: palette.primary.main }} />
                <Typography variant="h4" fontSize="20px" fontWeight="bold" color={palette.text.primary}>
                    IndexLive
                </Typography>
            </FlexBetween>

            {/* RIGHT SIDE */}
            <FlexBetween gap="2rem">
                {['charts', 'predictions'].map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            "&:hover": { color: palette.primary['900' as keyof typeof palette.primary] },
                            color: selected === item ? palette.primary['700' as keyof typeof palette.primary] : palette.grey[900],
                            fontSize: "18px",
                            fontWeight: selected === item ? 'bold' : 'normal',
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }}
                        onClick={() => setSelected(item)}
                    >
                        <Link
                            to={`/${item === 'charts' ? '' : item}`}
                            style={{
                                color: 'inherit',
                                textDecoration: 'inherit',
                            }}
                        >
                            {item}
                        </Link>
                    </Box>
                ))}
            </FlexBetween>
        </FlexBetween>

    );
};

export default Navbar;