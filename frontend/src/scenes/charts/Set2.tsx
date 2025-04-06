import BoxHeader from "@/components/BoxHeader";
import ChartsBox from "@/components/ChartsBox.tsx";
import FlexBetween from "@/components/FlexBetween";
import { useGetProductsQuery } from "@/state/api";
import {Box, Typography, useTheme} from "@mui/material";
import { useMemo } from "react";
import {
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    YAxis,
    PieChart,
    Pie,
    Cell,
    ScatterChart,
    Scatter,
} from "recharts";

const pieData = [
    { name: "Group A", value: 65 },
    { name: "Group B", value: 35 },
];

const Set2 = () => {
    const { palette } = useTheme();
    const pieColors = [palette.primary['800' as keyof typeof palette.primary], palette.primary['200' as keyof typeof palette.primary]];
    const { data: productData } = useGetProductsQuery();

    const productExpenseData = useMemo(() => {
        return (
            productData &&
            productData.map(({ _id, price, expense }) => {
                return {
                    id: _id,
                    price: price,
                    expense: expense,
                };
            })
        );
    }, [productData]);

    return (
        <>
            <ChartsBox gridArea="c">
                <BoxHeader title="Product Prices vs Expenses" sideText="+8%" />
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                        margin={{
                            top: 20,
                            right: 25,
                            bottom: 60,
                            left: -10,
                        }}
                    >
                        <CartesianGrid vertical={false} stroke={palette.grey['100']} />
                        <XAxis
                            type="number"
                            dataKey="price"
                            name="price"
                            axisLine={false}
                            style={{ fontSize: "10px" }}
                            ticks={[0, 25, 50, 75, 100, 125, 150, 175, 200]}
                            tickFormatter={(v) => `$${v}`}
                        />
                        <YAxis
                            type="number"
                            dataKey="expense"
                            name="expense"
                            tickLine={false}
                            axisLine={false}
                            style={{ fontSize: "10px" }}
                            domain={[0, 12]}
                            ticks={[0, 2, 4, 6, 8, 10, 12]}
                            tickFormatter={(v) => `$${v}`} // v = value
                            
                        />
                        <Tooltip
                            formatter={(v) => `$${v}`}
                            contentStyle={{ backgroundColor: palette.primary['100' as keyof typeof palette.primary], color: '#444444' }}
                            itemStyle={{ color: "#444444" }}
                        />
                        <Scatter
                            name="Product Expense Ratio"
                            data={productExpenseData}
                            fill={palette.primary['200' as keyof typeof palette.primary]}
                        />

                    </ScatterChart>
                </ResponsiveContainer>
            </ChartsBox>

            <ChartsBox gridArea="d">
                <BoxHeader title="Targets" sideText="+0,35%" />
                <FlexBetween>
                    <PieChart
                        width={210}
                        height={200}
                        margin={{left: 10 }}
                    >
                        <Pie
                            stroke="none"
                            data={pieData}
                            outerRadius={80}
                            dataKey="value"
                        >
                            {pieData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={pieColors[index]} />
                            ))}
                        </Pie>
                    </PieChart>

                    <Box>
                        <Typography variant="h4" color={palette.secondary['800' as keyof typeof palette.secondary]} > Target Sales  </Typography>
                        <Typography m="0.5rem 0" color={palette.secondary['800' as keyof typeof palette.secondary]} variant="h4"> 1100 </Typography>
                    </Box>

                    <Box flexBasis="30%">
                        <Typography variant="h4">             Losses in Revenue                      </Typography>
                        <Typography variant="h5">             Losses are down 15%                    </Typography>
                        <Typography mt="1.4rem" variant="h4"> Profit Margins                         </Typography>
                        <Typography variant="h5">             Margins are up by 20% from last month. </Typography>
                    </Box>

                </FlexBetween>
            </ChartsBox>
        </>
    );
};

export default Set2;