
import { useState, useEffect } from 'react';
import { SensorData } from '@/types/sensorTypes';

interface HistoricalDataPoint {
  timestamp: Date;
  value: number;
}

export interface SensorHistory {
  temperature: HistoricalDataPoint[];
  turbidity: HistoricalDataPoint[];
}

const MAX_HISTORY_POINTS = 48; // 24 heures avec des points toutes les 30 minutes

export function useSensorHistory(currentData: SensorData) {
  const [history, setHistory] = useState<SensorHistory>({
    temperature: [],
    turbidity: [],
  });

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setHistory(prev => {
        const now = new Date();
        
        // Ajouter les nouvelles données
        const newTemp = [...prev.temperature, { 
          timestamp: now, 
          value: currentData.temperature 
        }];
        const newTurb = [...prev.turbidity, { 
          timestamp: now, 
          value: currentData.turbidity 
        }];

        // Limiter le nombre de points
        return {
          temperature: newTemp.slice(-MAX_HISTORY_POINTS),
          turbidity: newTurb.slice(-MAX_HISTORY_POINTS),
        };
      });
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(updateInterval);
  }, [currentData]);

  return history;
}
