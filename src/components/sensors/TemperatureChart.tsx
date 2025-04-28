
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { HistoricalDataPoint } from "@/hooks/useSensorHistory";

interface TemperatureChartProps {
  data: HistoricalDataPoint[];
  className?: string;
}

const TemperatureChart = ({ data, className }: TemperatureChartProps) => {
  const chartData = data.map(point => ({
    time: format(point.timestamp, 'HH:mm', { locale: fr }),
    temperature: point.value,
  }));

  return (
    <ChartContainer
      config={{
        temperature: {
          theme: {
            light: "var(--sensor-temperature)",
            dark: "var(--sensor-temperature)",
          }
        }
      }}
      className={className}
    >
      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={chartData}>
          <XAxis
            dataKey="time"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value}
            interval="preserveStartEnd"
          />
          <YAxis
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tickCount={3}
            domain={['auto', 'auto']}
          />
          <ChartTooltip />
          <Line
            type="monotone"
            dataKey="temperature"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default TemperatureChart;
