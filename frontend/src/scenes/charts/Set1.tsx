import BoxHeader from "@/components/BoxHeader";
import ChartsBox from "@/components/ChartsBox.tsx";
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
    ResponsiveContainer,
    CartesianGrid,
    AreaChart,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Area,
} from "recharts";

const Set1 = () => {
    const { palette } = useTheme();
    const { data } = useGetKpisQuery();

    const revenueExpenses = useMemo(() => {
        return (
            data &&
            data[0].monthlyData.map(({ month, revenue, expenses }) => {
                return {
                    name: month.substring(0, 3),
                    revenue: revenue,
                    expenses: expenses,
                    profit: (revenue - expenses).toFixed(2),
                };
            })
        );
    }, [data]);

    return (
        <>
            <ChartsBox gridArea="a">
                <BoxHeader
                    title="Monthly Profits"
                    sideText="+10%"
                />
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={revenueExpenses}
                        margin={{
                            top: 15,
                            right: 25,
                            left: -10,
                            bottom: 60,
                        }}
                    >
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey="name"
                            style={{ fontSize: "10px" }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={{ strokeWidth: "0" }}
                            style={{ fontSize: "10px" }}
                            domain={[1500, 9000]}
                            ticks={[1000, 3000, 5000, 7000, 9000]}
                        />

                        <Tooltip
                            contentStyle={{ backgroundColor: palette.primary['100' as keyof typeof palette.primary], color: '#444444' }}
                            itemStyle={{ color: "#444444" }}
                        />

                        <Area
                            type="monotone"
                            dataKey="profit"
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                        />
                    </AreaChart>

                </ResponsiveContainer>
            </ChartsBox>

            <ChartsBox gridArea="b">
                <BoxHeader title="Monthly Expenses vs Revenues" sideText="+10%" />
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={revenueExpenses}
                        margin={{
                            top: 17,
                            right: 15,
                            left: -5,
                            bottom: 58,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor={palette.primary['400' as keyof typeof palette.primary]}
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={palette.primary['300' as keyof typeof palette.primary]}
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <defs>
                            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor={palette.secondary['400' as keyof typeof palette.secondary]}
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={palette.secondary['300' as keyof typeof palette.secondary]}
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke={palette.grey[100]}/>
                        <XAxis
                            dataKey="name"
                            style={{ fontSize: "10px" }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: "10px" }}
                            domain={[10000, 25000]}
                            ticks={[10000, 13000, 16000, 19000, 22000, 25000]}
                        />

                        <Tooltip
                            contentStyle={{ backgroundColor: palette.primary['100' as keyof typeof palette.primary], color: '#444444' }}
                            itemStyle={{ color: "#444444" }}
                        />

                        <Bar dataKey="expenses" fill="url(#colorExpenses)" />
                        <Bar dataKey="revenue" fill="url(#colorRevenue)" />
                    </BarChart>
                </ResponsiveContainer>
            </ChartsBox>
        </>
    );
};

export default Set1;