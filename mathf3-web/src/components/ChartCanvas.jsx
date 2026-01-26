import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

export default function ChartCanvas({ config, height = 280, theme }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !config) return undefined;

    const style = getComputedStyle(document.documentElement);
    const textColor = style.getPropertyValue('--text').trim() || '#f2ede3';
    const gridColor = style.getPropertyValue('--line').trim() || '#2b2b2f';

    const finalConfig = {
      ...config,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: textColor,
              ...config.options?.plugins?.legend?.labels,
            },
            ...config.options?.plugins?.legend,
          },
          ...config.options?.plugins,
        },
        scales: {
          x: {
            ticks: { color: textColor },
            grid: { color: gridColor },
            ...config.options?.scales?.x,
          },
          y: {
            ticks: { color: textColor },
            grid: { color: gridColor },
            ...config.options?.scales?.y,
          },
          ...config.options?.scales,
        },
        ...config.options,
      },
    };

    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = new Chart(canvasRef.current, finalConfig);

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [config, theme]);

  return (
    <div style={{ height }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
