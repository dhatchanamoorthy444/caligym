"use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/lib/supabase-client';

type LocalWorkoutLog = {
  id: string;
  date: string;
  workout_data: any;
  created_at: string;
  updated_at: string;
};

export const useWorkoutLogs = () => {
  const [logs, setLogs] = useState<LocalWorkoutLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const fetchLogs = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('workout_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching workout logs:', error);
        return;
      }

      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching workout logs:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const saveWorkout = useCallback(
    async (date: string, workoutData: any) => {
      if (!user) {
        throw new Error('User must be authenticated');
      }

      try {
        const { data, error } = await supabase
          .from('workout_logs')
          .insert([
            {
              user_id: user.id,
              date,
              workout_data: workoutData,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ])
          .select()
          .single();

        if (error) {
          console.error('Error saving workout:', error);
          throw error;
        }

        setLogs(prev => [data, ...prev]);
        return data;
      } catch (error) {
        console.error('Error saving workout:', error);
        throw error;
      }
    },
    [user]
  );

  const getWorkout = useCallback(
    async (date: string) => {
      if (!user) return null;

      try {
        const { data, error } = await supabase
          .from('workout_logs')
          .select('*')
          .eq('user_id', user.id)
          .eq('date', date)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error getting workout:', error);
          return null;
        }

        return data || null;
      } catch (error) {
        console.error('Error getting workout:', error);
        return null;
      }
    },
    [user]
  );

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return {
    logs,
    isLoading,
    fetchLogs,
    saveWorkout,
    getWorkout,
  };
};