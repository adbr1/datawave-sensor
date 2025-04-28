
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { HistoricalDataPoint } from "@/hooks/useSensorHistory";

interface TurbidityChartProps {
  data: HistoricalDataPoint[];
  className?: string;
}

const TurbidityChart = ({ data, className }: TurbidityChartProps) => {
  const chartData = data.map(point => ({
    time: format(point.timestamp, 'HH:mm', { locale: fr }),
    turbidity: point.value,
  }));

  return (
    <ChartContainer
      config={{
        turbidity: {
          theme: {
            light: "var(--sensor-turbidity)",
            dark: "var(--sensor-turbidity)",
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
            dataKey="turbidity"
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

export default TurbidityChart;
