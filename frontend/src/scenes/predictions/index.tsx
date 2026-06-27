import BoxHeader from "@/components/BoxHeader";
import ChartsBox from "@/components/ChartsBox";
import { useGetKpisQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const FORECAST_DAYS = 30;

type HistoricalPoint = {
    date: string;
    label: string;
    revenue: number;
    expenses: number;
    profit: number;
};

type ChartPoint = {
    label: string;
    actualRevenue?: number;
    actualExpenses?: number;
    actualProfit?: number;
    predictedRevenue?: number;
    predictedExpenses?: number;
    predictedProfit?: number;
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(value);
};

const roundToTwo = (value: number) => Number(value.toFixed(2));

const average = (values: Array<number>) => {
    if (values.length === 0) {
        return 0;
    }

    return values.reduce((total, value) => total + value, 0) / values.length;
};

const addDays = (dateValue: string, days: number) => {
    const [year, month, day] = dateValue.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    date.setUTCDate(date.getUTCDate() + days);

    return date.toISOString().slice(5, 10);
};

const createLinearRegression = (values: Array<number>) => {
    const n = values.length;

    if (n === 0) {
        return { slope: 0, intercept: 0, predict: () => 0 };
    }

    if (n === 1) {
        const onlyValue = values[0];
        return { slope: 0, intercept: onlyValue, predict: () => onlyValue };
    }

    const sumX = values.reduce((total, _, index) => total + index, 0);
    const sumY = values.reduce((total, value) => total + value, 0);
    const sumXY = values.reduce((total, value, index) => total + index * value, 0);
    const sumXX = values.reduce((total, _, index) => total + index * index, 0);
    const denominator = n * sumXX - sumX * sumX;
    const slope = denominator === 0 ? 0 : (n * sumXY - sumX * sumY) / denominator;
    const intercept = (sumY - slope * sumX) / n;

    return {
        slope,
        intercept,
        predict: (index: number) => Math.max(0, intercept + slope * index),
    };
};

const Predictions = () => {
    const { palette } = useTheme();
    const { data } = useGetKpisQuery();

    const historicalData = useMemo<Array<HistoricalPoint>>(() => {
        const dailyData = data?.[0]?.dailyData?.slice(-30) ?? [];

        return dailyData.map(({ date, revenue, expenses }) => ({
            date,
            label: date.slice(5),
            revenue,
            expenses,
            profit: roundToTwo(revenue - expenses),
        }));
    }, [data]);

    const forecastData = useMemo<Array<ChartPoint>>(() => {
        if (historicalData.length === 0) {
            return [];
        }

        const revenueModel = createLinearRegression(historicalData.map(({ revenue }) => revenue));
        const expensesModel = createLinearRegression(historicalData.map(({ expenses }) => expenses));
        const lastHistoricalPoint = historicalData[historicalData.length - 1];

        return Array.from({ length: FORECAST_DAYS }, (_, forecastIndex) => {
            const modelIndex = historicalData.length + forecastIndex;
            const predictedRevenue = roundToTwo(revenueModel.predict(modelIndex));
            const predictedExpenses = roundToTwo(expensesModel.predict(modelIndex));

            return {
                label: addDays(lastHistoricalPoint.date, forecastIndex + 1),
                predictedRevenue,
                predictedExpenses,
                predictedProfit: roundToTwo(predictedRevenue - predictedExpenses),
            };
        });
    }, [historicalData]);

    const chartData = useMemo<Array<ChartPoint>>(() => {
        if (historicalData.length === 0) {
            return [];
        }

        const lastHistoricalIndex = historicalData.length - 1;
        const actualRows = historicalData.map((point, index) => ({
            label: point.label,
            actualRevenue: point.revenue,
            actualExpenses: point.expenses,
            actualProfit: point.profit,
            predictedRevenue: index === lastHistoricalIndex ? point.revenue : undefined,
            predictedExpenses: index === lastHistoricalIndex ? point.expenses : undefined,
            predictedProfit: index === lastHistoricalIndex ? point.profit : undefined,
        }));

        return [...actualRows, ...forecastData];
    }, [forecastData, historicalData]);

    const summary = useMemo(() => {
        const historicalRevenues = historicalData.map(({ revenue }) => revenue);
        const forecastRevenue = forecastData.reduce((total, point) => total + (point.predictedRevenue ?? 0), 0);
        const forecastExpenses = forecastData.reduce((total, point) => total + (point.predictedExpenses ?? 0), 0);
        const forecastProfit = forecastData.reduce((total, point) => total + (point.predictedProfit ?? 0), 0);
        const firstForecastRevenue = forecastData[0]?.predictedRevenue ?? 0;
        const lastForecastRevenue = forecastData[forecastData.length - 1]?.predictedRevenue ?? 0;
        const forecastTrend = firstForecastRevenue === 0
            ? 0
            : ((lastForecastRevenue - firstForecastRevenue) / firstForecastRevenue) * 100;

        return {
            averageRevenue: average(historicalRevenues),
            averageForecastRevenue: forecastRevenue / FORECAST_DAYS,
            averageForecastExpenses: forecastExpenses / FORECAST_DAYS,
            forecastRevenue,
            forecastExpenses,
            forecastProfit,
            forecastMargin: forecastRevenue === 0 ? 0 : (forecastProfit / forecastRevenue) * 100,
            forecastTrend,
        };
    }, [forecastData, historicalData]);

    const periods = useMemo(() => {
        const firstHistorical = historicalData[0]?.label;
        const lastHistorical = historicalData[historicalData.length - 1]?.label;
        const firstForecast = forecastData[0]?.label;
        const lastForecast = forecastData[forecastData.length - 1]?.label;

        return {
            historicalPeriod: firstHistorical && lastHistorical
                ? `${firstHistorical} - ${lastHistorical}`
                : "Loading",
            forecastPeriod: firstForecast && lastForecast
                ? `${firstForecast} - ${lastForecast}`
                : "Loading",
            actualContext: firstHistorical && lastHistorical
                ? `Last ${historicalData.length} actual days`
                : "Actual period loading",
            forecastContext: firstForecast && lastForecast
                ? `Next ${FORECAST_DAYS} forecast days`
                : "Forecast period loading",
        };
    }, [forecastData, historicalData]);

    const summaryText = useMemo(() => {
        if (forecastData.length === 0) {
            return "Forecast data is calculated after the KPI daily values are loaded.";
        }

        const trendDirection = summary.forecastTrend >= 0 ? "upward" : "downward";
        const profitDirection = summary.forecastProfit >= 0 ? "profit" : "loss";

        return `Based on actual data from ${periods.historicalPeriod}, the forecast covers ${periods.forecastPeriod}. The next ${FORECAST_DAYS} days are trending ${trendDirection} at ${Math.abs(summary.forecastTrend).toFixed(1)}%. The model projects ${formatCurrency(Math.abs(summary.forecastProfit))} in ${profitDirection}, with an expected margin of ${summary.forecastMargin.toFixed(1)}%.`;
    }, [forecastData.length, periods.forecastPeriod, periods.historicalPeriod, summary]);

    return (
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="1.5rem">
            <ChartsBox gridColumn="span 12" minHeight="420px">
                <BoxHeader title="30 Day Linear Regression Forecast" sideText={`${summary.forecastTrend.toFixed(1)}% forecast`} />
                <Box height="330px" px="1rem">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={chartData}
                            margin={{ top: 20, right: 20, bottom: 30, left: -10 }}
                        >
                            <CartesianGrid vertical={false} stroke={palette.grey[100]} />
                            <XAxis dataKey="label" style={{ fontSize: "10px" }} interval={6} />
                            <YAxis
                                style={{ fontSize: "10px" }}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip
                                formatter={(value) => formatCurrency(Number(value))}
                                contentStyle={{
                                    backgroundColor: palette.primary["100" as keyof typeof palette.primary],
                                    color: "#444444",
                                }}
                                itemStyle={{ color: "#444444" }}
                            />
                            <Legend wrapperStyle={{ fontSize: "11px" }} />
                            <Line
                                name="Actual Revenue"
                                type="monotone"
                                dataKey="actualRevenue"
                                stroke={palette.primary["700" as keyof typeof palette.primary]}
                                strokeWidth={2}
                                dot={false}
                                connectNulls={false}
                            />
                            <Line
                                name="Forecast Revenue"
                                type="monotone"
                                dataKey="predictedRevenue"
                                stroke={palette.primary["700" as keyof typeof palette.primary]}
                                strokeDasharray="6 4"
                                strokeWidth={2}
                                dot={false}
                                connectNulls={false}
                            />
                            <Line
                                name="Actual Expenses"
                                type="monotone"
                                dataKey="actualExpenses"
                                stroke={palette.secondary["600" as keyof typeof palette.secondary]}
                                strokeWidth={2}
                                dot={false}
                                connectNulls={false}
                            />
                            <Line
                                name="Forecast Expenses"
                                type="monotone"
                                dataKey="predictedExpenses"
                                stroke={palette.secondary["600" as keyof typeof palette.secondary]}
                                strokeDasharray="6 4"
                                strokeWidth={2}
                                dot={false}
                                connectNulls={false}
                            />
                            <Line
                                name="Actual Profit"
                                type="monotone"
                                dataKey="actualProfit"
                                stroke={palette.grey[700]}
                                strokeWidth={2}
                                dot={false}
                                connectNulls={false}
                            />
                            <Line
                                name="Forecast Profit"
                                type="monotone"
                                dataKey="predictedProfit"
                                stroke={palette.grey[700]}
                                strokeDasharray="6 4"
                                strokeWidth={2}
                                dot={false}
                                connectNulls={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
                <Box
                    mx="1rem"
                    mb="1rem"
                    p="0.85rem 1rem"
                    bgcolor={palette.background.default}
                    borderRadius="0.5rem"
                    display="grid"
                    gridTemplateColumns={{ xs: "1fr", md: "1.4fr 1fr 1fr" }}
                    gap="1rem"
                >
                    <Box>
                        <Typography variant="h4">Forecast Summary</Typography>
                        <Typography variant="h5" mt="0.35rem">
                            {summaryText}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5">Avg. Forecast Revenue</Typography>
                        <Typography variant="h6">{periods.forecastContext}</Typography>
                        <Typography variant="h4" mt="0.35rem">
                            {formatCurrency(summary.averageForecastRevenue)}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5">Avg. Forecast Expenses</Typography>
                        <Typography variant="h6">{periods.forecastContext}</Typography>
                        <Typography variant="h4" mt="0.35rem">
                            {formatCurrency(summary.averageForecastExpenses)}
                        </Typography>
                    </Box>
                </Box>
            </ChartsBox>

            {[
                ["Average Actual Revenue", `${periods.actualContext} (${periods.historicalPeriod})`, summary.averageRevenue],
                ["Forecast Revenue", `${periods.forecastContext} (${periods.forecastPeriod})`, summary.forecastRevenue],
                ["Forecast Expenses", `${periods.forecastContext} (${periods.forecastPeriod})`, summary.forecastExpenses],
                ["Forecast Profit", `${periods.forecastContext} (${periods.forecastPeriod})`, summary.forecastProfit],
            ].map(([label, context, value]) => (
                <ChartsBox key={label} gridColumn={{ xs: "span 12", md: "span 3" }} p="1rem">
                    <Typography variant="h5">{label}</Typography>
                    <Typography variant="h6" mt="0.15rem">
                        {context}
                    </Typography>
                    <Typography variant="h3" mt="0.4rem">
                        {formatCurrency(Number(value))}
                    </Typography>
                </ChartsBox>
            ))}
        </Box>
    );
};

export default Predictions;
