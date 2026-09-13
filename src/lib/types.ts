// ── CALIGYM shared domain types ──
// Server-safe. Keep in sync with supabase/schema.sql.

export type ExperienceLevel = "beginner" | "intermediate" | "advanced";
export type PrimaryGoal =
  | "strength" | "skills" | "muscle" | "mobility"
  | "fat_loss" | "general" | "competition";
export type Equipment =
  | "none" | "pull_up_bar" | "parallel_bars" | "resistance_bands"
  | "rings" | "gym_equipment" | "wall" | "parallettes" | "dip_station";
export type TrainingLocation = "home" | "outdoor" | "gym" | "mixed";
export type Plan = "free" | "pro" | "coach";
export type UserRole = "user" | "admin";
export type SkillStatus = "locked" | "active" | "trained" | "mastered";
export type WorkoutLogStatus = "active" | "completed" | "abandoned";

export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  age_range: string | null;
  experience: ExperienceLevel | null;
  primary_goal: PrimaryGoal | null;
  equipment: Equipment[];
  training_location: TrainingLocation | null;
  training_days: number[];
  session_duration: number | null;
  max_pushups: number | null;
  max_pullups: number | null;
  max_dips: number | null;
  max_plank_seconds: number | null;
  current_skills: string[];
  limitations: string | null;
  is_onboarded: boolean;
  xp: number;
  role: UserRole;
  plan: Plan;
  created_at: string;
  updated_at: string;
}


export interface Exercise {
  id: string;
  slug: string;
  name: string;
  category: string;
  muscle_groups: string[];
  equipment: string[];
  difficulty: string;
  movement_pattern: string | null;
  exercise_type: string | null;
  goal: string | null;
  description: string | null;
  instructions: string[];
  coaching_cues: string[];
  common_mistakes: string[];
  progression: string | null;
  regression: string | null;
  sets_recommended: number | null;
  reps_recommended: string | null;
  is_active: boolean;
  created_at: string;
}

export interface SeedExercise {
  slug: string;
  name: string;
  category: string;
  muscleGroups: string[];
  equipment: string[];
  difficulty: "foundation" | "beginner" | "intermediate" | "advanced" | "elite";
  movementPattern: string;
  exerciseType: string;
  goal: string;
  description: string;
  instructions: string[];
  coachingCues: string[];
  commonMistakes: string[];
  progression: string | null;
  regression: string | null;
  setsRecommended: number;
  repsRecommended: string;
}

export interface Skill {
  id: string;
  slug: string;
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
  level_label: string;
  path: string;
  description: string | null;
  badge: string | null;
  milestone_exercises: string[];
  requirements: string[];
  created_at: string;
}

export interface SeedSkill {
  slug: string;
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
  levelLabel: string;
  path: string;
  description: string;
  prerequisites: string[];
  milestoneExercises: string[];
  requirements: string[];
}

export interface UserSkill {
  user_id: string;
  skill_id: string;
  status: string;
  progress_percent: number;
}

export interface WorkoutTemplateExercise {
  slug: string;
  name: string;
  sets: number;
  reps: string;
  restSeconds: number;
  notes?: string;
}

export interface WorkoutTemplate {
  slug: string;
  title: string;
  description: string;
  goal: string;
  difficulty: string;
  durationMin: number;
  level: ExperienceLevel;
  tags: string[];
  exercises: WorkoutTemplateExercise[];
}

export interface WorkoutLog {
  id: string;
  user_id: string;
  workout_slug: string;
  workout_title: string;
  started_at: string;
  completed_at: string | null;
  duration_seconds: number;
  status: WorkoutLogStatus;
  xp_earned: number;
  notes: string | null;
  created_at: string;
}

export interface ExerciseLog {
  id: string;
  user_id: string;
  workout_log_id: string;
  exercise_slug: string;
  exercise_name: string;
  sets: number;
  reps: number[];
  rpe: string | null;
  notes: string | null;
  created_at: string;
}

export interface Achievement {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
  xp_reward: number;
  criteria_type: string;
  criteria_value: number;
  is_secret: boolean;
}

export interface Challenge {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  duration_days: number;
  difficulty: string | null;
  xp_reward: number;
  badge: string | null;
  daily_objectives: { day: number; title: string; detail: string }[];
  is_active: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string | null;
  body: string | null;
  author: string | null;
  read_minutes: number;
  tags: string[];
  cover_image: string | null;
  is_featured: boolean;
  published_at: string;
}

export interface Athlete {
  id: string;
  slug: string;
  name: string;
  country: string | null;
  discipline: string | null;
  category: string | null;
  bio: string | null;
  highlights: string[];
  skills: string[];
  socials: { instagram?: string; youtube?: string; website?: string };
  is_legend: boolean;
  is_featured: boolean;
}

export interface Creator {
  id: string;
  slug: string;
  name: string;
  handle: string | null;
  country: string | null;
  focus: string | null;
  category: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  description: string | null;
}

export interface Quote {
  id: string;
  text: string;
  author: string | null;
  category: string | null;
}

export interface AiConversation {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface AiMessage {
  id: string;
  conversation_id: string;
  user_id: string;
  role: string;
  content: string;
  structured: Record<string, unknown> | null;
  created_at: string;
}