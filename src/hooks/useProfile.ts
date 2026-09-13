"use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/lib/supabase-client';

type LocalProfile = {
  id: string;
  username: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar_url?: string;
  xp: number;
  streak: number;
  last_workout_date?: string;
  fatigue_level?: 'low' | 'moderate' | 'high';
  created_at: string;
};

export const useProfile = () => {
  const [profile, setProfile] = useState<LocalProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        // Try to create profile if it doesn't exist
        await createProfile();
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const createProfile = useCallback(async () => {
    if (!user) {
      throw new Error('User must be authenticated');
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([
          {
            id: user.id,
            email: user.email,
            username: user.email?.split('@')[0] || 'user',
            name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
            role: 'user',
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Error creating profile:', error);
        throw error;
      }

      setProfile(data);
      return data;
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  }, [user]);

  const updateProfile = useCallback(
    async (updates: Partial<LocalProfile>) => {
      if (!user || !profile) {
        throw new Error('User must be authenticated and have a profile');
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', user.id)
          .select()
          .single();

        if (error) {
          console.error('Error updating profile:', error);
          throw error;
        }

        setProfile(data);
        return data;
      } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
      }
    },
    [user, profile]
  );

  const incrementXP = useCallback(
    async (amount: number) => {
      if (!user || !profile) {
        throw new Error('User must be authenticated and have a profile');
      }

      try {
        const newXP = profile.xp + amount;
        const { data, error } = await supabase
          .from('profiles')
          .update({ xp: newXP })
          .eq('id', user.id)
          .select()
          .single();

        if (error) {
          console.error('Error incrementing XP:', error);
          throw error;
        }

        setProfile(data);
        return data;
      } catch (error) {
        console.error('Error incrementing XP:', error);
        throw error;
      }
    },
    [user, profile]
  );

  const incrementStreak = useCallback(async () => {
    if (!user || !profile) {
      throw new Error('User must be authenticated and have a profile');
    }

    try {
      const newStreak = profile.streak + 1;
      const { data, error } = await supabase
        .from('profiles')
        .update({ streak: newStreak })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error incrementing streak:', error);
        throw error;
      }

      setProfile(data);
      return data;
    } catch (error) {
      console.error('Error incrementing streak:', error);
      throw error;
    }
  }, [user, profile]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated, fetchProfile]);

  return {
    profile,
    isLoading,
    fetchProfile,
    createProfile,
    updateProfile,
    incrementXP,
    incrementStreak,
  };
};