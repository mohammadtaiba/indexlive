import BoxHeader from "@/components/BoxHeader";
import ChartsBox from "@/components/ChartsBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from "@/state/api";
import {Box, Typography, useTheme} from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";

const Set3 = () => {
    const { palette}  = useTheme();
    const pieColors    = [palette.primary['800' as keyof typeof palette.primary], palette.primary['200' as keyof typeof palette.primary]];

    const { data: kpiData }             = useGetKpisQuery();
    const { data: productData }       = useGetProductsQuery();
    const { data: transactionData }   = useGetTransactionsQuery();

    const pieChartData = useMemo(() => {
        if (kpiData)
        {
            const totalExpenses = kpiData[0].totalExpenses;

            return Object.entries(kpiData[0].expensesByCategory).map(
                ([key, value]) => {
                    return [
                        {   // 1. Part of the PieChart
                            name: key,
                            value: value,
                        },

                        {   // 2. Part of the PieChart
                            name: `${key} of Total`,
                            value: totalExpenses - value,
                        },
                    ];
                }
            );
        }
    }, [kpiData]);

    const productColumns = [
        {
            field: "_id",
            headerName: "id",
            flex: 1,
        },
        {
            field: "expense",
            headerName: "Expense",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `$${params.value}`, // convert to string
        },
        {
            field: "price",
            headerName: "Price",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `$${params.value}`, // convert to string
        },
    ];

    const transactionColumns = [
        {
            field: "_id",
            headerName: "id",
            flex: 1,
        },
        {
            field: "buyer",
            headerName: "Buyer",
            flex: 0.67,

        },
        {
            field: "amount",
            headerName: "Amount",
            flex: 0.35,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
        {
            field: "productIds",
            headerName: "Count",
            flex: 0.1,
            renderCell: (params: GridCellParams) =>
                (params.value as Array<string>).length, // Anzahl gekaufte Produkte
        },
    ];

    return (
        <>
            <ChartsBox gridArea="e">
                <BoxHeader
                    title="List of Products"
                    sideText={`${productData?.length} products`}
                />
                <Box
                    mt="0.5rem"
                    p="0 0.5rem"
                    height="85%"
                >
                    <DataGrid
                        columnHeaderHeight={30}
                        rowHeight={33}
                        sx={{
                            '& .MuiDataGrid-colCell, & .MuiDataGrid-colCell:focus-within, & .MuiDataGrid-columnHeader, & .MuiDataGrid-footerContainer': {
                                minHeight: '30px',
                                backgroundColor: palette.primary['200' as keyof typeof palette.primary],
                            },
                        }}
                        rows={productData || []}
                        columns={productColumns}
                    />
                </Box>
            </ChartsBox>

            <ChartsBox gridArea="f">
                <BoxHeader
                    title="Recent Orders"
                    sideText={`${transactionData?.length} latest transactions`}
                />
                <Box
                    mt="0.5rem"
                    p="0 0.5rem"
                    height="85%"
                >
                    <DataGrid
                        columnHeaderHeight={30}
                        rowHeight={33}
                        sx={{
                            '& .MuiDataGrid-colCell, & .MuiDataGrid-colCell:focus-within, & .MuiDataGrid-columnHeader, & .MuiDataGrid-footerContainer': {
                                minHeight: '30px',
                                backgroundColor: palette.primary['200' as keyof typeof palette.primary],
                            },
                        }}
                        rows={transactionData || []}
                        columns={transactionColumns}
                    />
                </Box>
            </ChartsBox>

            <ChartsBox gridArea="g">
                <BoxHeader title="Expense Breakdown By Category" sideText="+12%" />
                <FlexBetween p="0 1rem" textAlign="center">
                    {pieChartData?.map((data) => (           // loop through pieChartData
                        <Box>
                            <PieChart width={120} height={100}>
                                <Pie
                                    stroke="none"
                                    data={data}
                                    innerRadius={30}
                                    outerRadius={50}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {data.map((_, index) => (   // loop through data entries
                                        <Cell key={`cell-${index}`} fill={pieColors[index]} />     // create a Cell for each entry
                                    ))}
                                </Pie>
                            </PieChart>
                            <Typography variant="h5">{data[0].name}</Typography>
                        </Box>
                    ))}
                </FlexBetween>
            </ChartsBox>

            <ChartsBox gridArea="h">
                <BoxHeader
                    title="Overall Summary and Explanation Data"
                    sideText="+23%"
                />
                <Box
                    height="20px" // Dicke der Linie
                    margin="1.1rem"
                    bgcolor={palette.primary['200' as keyof typeof palette.primary]}
                    borderRadius="1rem"
                >
                    <Box
                        height="20px" // Dicke der Linie
                        bgcolor={palette.primary['800' as keyof typeof palette.primary]}
                        borderRadius="1rem"
                        width="40%"
                    >
                    </Box>
                </Box>
                <Typography margin="2rem" variant="h5">
                    Orci aliquam enim vel diam. Venenatis euismod id donec mus lorem etiam
                    ullamcorper odio sed. Ipsum non sed gravida etiam urna egestas
                    molestie volutpat et. Malesuada quis pretium aliquet lacinia ornare
                    sed. In volutpat nullam at est id cum pulvinar nunc.
                </Typography>
            </ChartsBox>
        </>
    );
};

export default Set3;