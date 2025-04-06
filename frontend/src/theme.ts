export const tokens = {
    black: {
        100: "#bdbdbd",
        200: "#969696",
        300: "#787878",
        400: "#646464",
        500: "#505050",
        600: "#3c3c3c",
        700: "#212121",
        800: "#212121",
        900: "#212121",
    },
    primary: {
        // darkBlue
        100: "#a0c4ea",
        200: "#78a9e6",
        300: "#4f8ed5",
        400: "#2c79d0",
        500: "#0d63c9",
        600: "#0b57b7",
        700: "#0948a4",
        800: "#073b92",
        900: "#052b70",
    },
    secondary: {
        // darkOrange
        100: "#ffe0b2",
        200: "#ffcc80",
        300: "#ffb74d",
        400: "#ffa726",
        500: "#ff9800",
        600: "#fb8c00",
        700: "#f57c00",
        800: "#ef6c00",
        900: "#e65100",
    },
    tertiary: {
        // darkOrange
        500: "#e65100",
    },
    background: {
        light: "#ffffff",
        main: "#f0f0f3",
    },
};

// mui theme settings
export const themeSettings = {
    palette: {
        primary: {
            ...tokens.primary,
            main: tokens.primary[500],
            light: tokens.primary[400],
        },
        secondary: {
            ...tokens.secondary,
            main: tokens.secondary[500],
        },
        tertiary: {
            ...tokens.tertiary,
        },
        grey: {
            ...tokens.black,
            main: tokens.black[500],
        },
        background: {
            default: tokens.background.main,
            light: tokens.background.light,
        },
    },
    typography: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 32,
        },
        h2: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 24,
        },
        h3: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 20,
            fontWeight: 800,
            color: tokens.black[900],
        },
        h4: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 14,
            fontWeight: 600,
            color: tokens.black[700],
        },
        h5: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 12,
            fontWeight: 400,
            color: tokens.black[600],
        },
        h6: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 10,
            color: tokens.black[500],
        },
    },
};
