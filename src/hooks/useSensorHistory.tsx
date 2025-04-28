
import { useState, useEffect } from 'react';
import { SensorData } from '@/types/sensorTypes';

export interface HistoricalDataPoint {
  timestamp: Date;
  value: number;
}

export interface SensorHistory {
  temperature: HistoricalDataPoint[];
  turbidity: HistoricalDataPoint[];
}

const MAX_HISTORY_POINTS = 48; // 24 heures avec des points toutes les 30 minutes

// Fonction utilitaire pour générer des données historiques initiales
const generateInitialData = (baseValue: number): HistoricalDataPoint[] => {
  const now = new Date();
  const result: HistoricalDataPoint[] = [];
  
  // Générer des données pour les dernières 12 heures (24 points de 30 minutes)
  for (let i = 24; i > 0; i--) {
    const timestamp = new Date(now.getTime() - (i * 30 * 60 * 1000));
    // Ajouter une petite variation aléatoire au baseValue
    const variation = Math.random() * 2 - 1; // Entre -1 et +1
    const value = +(baseValue + variation).toFixed(1);
    result.push({ timestamp, value });
  }
  
  return result;
};

export function useSensorHistory(currentData: SensorData) {
  const [history, setHistory] = useState<SensorHistory>(() => ({
    temperature: generateInitialData(currentData.temperature || 23),
    turbidity: generateInitialData(currentData.turbidity || 5),
  }));

  useEffect(() => {
    // Ajoute immédiatement le point actuel aux données historiques
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
    
    // Configure l'intervalle pour les mises à jour futures
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
