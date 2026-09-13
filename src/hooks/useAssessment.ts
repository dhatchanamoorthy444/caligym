"use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/lib/supabase-client';

type LocalAssessment = {
  id: string;
  user_id: string;
  completed: boolean;
  age?: number;
  weight_kg?: number;
  height_cm?: number;
  experience_years?: number;
  available_days?: number;
  session_duration_mins?: number;
  training_location?: 'home' | 'gym';
  primary_goal?: string;
  diet_preference?: string;
  cuisine?: string;
  meals_per_day?: number;
  budget?: string;
  max_pushups?: number;
  max_pullups?: number;
  max_dips?: number;
  max_plank_sec?: number;
  max_dead_hang_sec?: number;
  handstand_sec?: number;
  created_at: string;
};

export const useAssessment = () => {
  const [assessment, setAssessment] = useState<LocalAssessment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const fetchAssessment = useCallback(async () => {
    if (!user) {
      setAssessment(null);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching assessment:', error);
        return;
      }

      setAssessment(data || null);
    } catch (error) {
      console.error('Error fetching assessment:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const saveAssessment = useCallback(
    async (assessmentData: Partial<LocalAssessment>) => {
      if (!user) {
        throw new Error('User must be authenticated');
      }

      try {
        const { data, error } = await supabase
          .from('assessments')
          .upsert([
            {
              user_id: user.id,
              ...assessmentData,
              completed: true,
            },
          ])
          .select()
          .single();

        if (error) {
          console.error('Error saving assessment:', error);
          throw error;
        }

        setAssessment(data);
        return data;
      } catch (error) {
        console.error('Error saving assessment:', error);
        throw error;
      }
    },
    [user]
  );

  useEffect(() => {
    if (isAuthenticated) {
      fetchAssessment();
    }
  }, [isAuthenticated, fetchAssessment]);

  return {
    assessment,
    isLoading,
    fetchAssessment,
    saveAssessment,
  };
};