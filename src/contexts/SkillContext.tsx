import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

type SkillLevel = 'foundation' | 'beginner' | 'intermediate' | 'advanced' | 'elite';

type Skill = {
  id: string;
  name: string;
  category: 'strength' | 'flexibility' | 'endurance' | 'skill';
  level: SkillLevel;
  description: string;
  icon: string;
  color: string;
  xpCost: number;
  timeToMaster: number; // weeks
  prerequisites: string[]; // skill IDs
  exercises: string[]; // exercise IDs
  benefits: string[];
  progressionPath: string[]; // skill IDs in order
  thumbnail: string;
  videoUrl?: string;
  difficulty: 'low' | 'medium' | 'high' | 'extreme';
};

type UserSkillProgress = {
  skillId: string;
  currentLevel: SkillLevel;
  progress: number; // 0-100%
  unlockTime: Date;
  lastPracticed?: Date;
  streak: number;
  totalPracticeTime: number; // minutes
  personalRecord?: {
    value: number;
    unit: string;
    date: Date;
  };
  achievedAt?: Date;
};

type SkillTreeNode = {
  skill: Skill;
  position: { x: number; y: number };
  isUnlocked: boolean;
  isCurrent: boolean;
  progress: number;
  children: SkillTreeNode[];
  parent?: SkillTreeNode;
};

interface SkillContextType {
  skills: Skill[];
  userProgress: UserSkillProgress[];
  skillTree: SkillTreeNode[];
  currentSkill: Skill | null;
  unlockSkill: (skillId: string) => void;
  practiceSkill: (skillId: string, duration: number, value?: number, unit?: string) => void;
  getNextSkill: () => Skill | null;
  getSkillProgress: (skillId: string) => UserSkillProgress | null;
  getSkillTree: () => SkillTreeNode[];
  setCurrentSkill: (skillId: string | null) => void;
  loadProgress: () => void;
  saveProgress: () => void;
}

const SkillContext = createContext<SkillContextType | null>(null);

// Seed skills data
export const SKILLS_DATA: Skill[] = [
  // Foundation Skills
  {
    id: 'push-up',
    name: 'Push-Up',
    category: 'strength',
    level: 'foundation',
    description: 'The fundamental bodyweight pressing movement',
    icon: ' 💪 ',
    color: 'from-red-500 to-rose-500',
    xpCost: 100,
    timeToMaster: 4,
    prerequisites: [],
    exercises: ['basic-pushup', 'incline-pushup', 'decline-pushup'],
    benefits: ['Upper body strength', 'Core stability', 'Shoulder health'],
    progressionPath: ['push-up', 'diamond-pushup', 'hand-release-pushup'],
    thumbnail: '/images/skills/pushup.jpg',
    videoUrl: '/videos/pushup-demo.mp4',
    difficulty: 'low',
  },
  {
    id: 'pull-up',
    name: 'Pull-Up',
    category: 'strength',
    level: 'foundation',
    description: 'The horizontal pulling movement for back and biceps',
    icon: ' 🤜 ',
    color: 'from-blue-500 to-cyan-500',
    xpCost: 120,
    timeToMaster: 6,
    prerequisites: [],
    exercises: ['basic-pullup', 'negative-pullup', 'weighted-pullup'],
    benefits: ['Back strength', 'Biceps development', 'Hanging strength'],
    progressionPath: ['pull-up', 'muscle-up', 'front-lever'],
    thumbnail: '/images/skills/pullup.jpg',
    videoUrl: '/videos/pullup-demo.mp4',
    difficulty: 'medium',
  },
  {
    id: 'dip',
    name: 'Dip',
    category: 'strength',
    level: 'foundation',
    description: 'The triceps and chest pressing movement',
    icon: ' 🏋️ ',
    color: 'from-purple-500 to-violet-500',
    xpCost: 80,
    timeToMaster: 3,
    prerequisites: [],
    exercises: ['basic-dip', 'weighted-dip', 'l-sit-dip'],
    benefits: ['Triceps strength', 'Chest development', 'Core control'],
    progressionPath: ['dip', 'muscle-up', 'handstand'],
    thumbnail: '/images/skills/dip.jpg',
    videoUrl: '/videos/dip-demo.mp4',
    difficulty: 'medium',
  },
  {
    id: 'plank',
    name: 'Plank',
    category: 'strength',
    level: 'foundation',
    description: 'The core stability exercise',
    icon: ' 🌊 ',
    color: 'from-amber-500 to-orange-500',
    xpCost: 60,
    timeToMaster: 2,
    prerequisites: [],
    exercises: ['basic-plank', 'side-plank', 'hanging-plank'],
    benefits: ['Core strength', 'Shoulder stability', 'Posture'],
    progressionPath: ['plank', 'hollow-hold', 'front-lever'],
    thumbnail: '/images/skills/plank.jpg',
    videoUrl: '/videos/plank-demo.mp4',
    difficulty: 'low',
  },

  // Intermediate Skills
  {
    id: 'handstand',
    name: 'Handstand',
    category: 'skill',
    level: 'beginner',
    description: 'Standing on hands with control',
    icon: ' 🤸 ',
    color: 'from-green-500 to-emerald-500',
    xpCost: 300,
    timeToMaster: 12,
    prerequisites: ['push-up', 'wrist-preparation'],
    exercises: ['wall-handstand', 'freestanding-handstand', 'handstand-pushup'],
    benefits: ['Balance', 'Shoulder strength', 'Body control'],
    progressionPath: ['handstand', 'one-arm-stand', 'inverted-pike'],
    thumbnail: '/images/skills/handstand.jpg',
    videoUrl: '/videos/handstand-demo.mp4',
    difficulty: 'high',
  },
  {
    id: 'muscle-up',
    name: 'Muscle-Up',
    category: 'skill',
    level: 'beginner',
    description: 'Pulling up and pressing up from the top position',
    icon: ' 💪 ',
    color: 'from-pink-500 to-rose-500',
    xpCost: 400,
    timeToMaster: 10,
    prerequisites: ['pull-up', 'dip', 'explosive-strength'],
    exercises: ['ring-muscleup', 'bar-muscleup', 'transition-muscleup'],
    benefits: ['Full body power', 'Transition skill', 'Strength-endurance'],
    progressionPath: ['muscle-up', 'human-flag', 'front-lever'],
    thumbnail: '/images/skills/muscleup.jpg',
    videoUrl: '/videos/muscleup-demo.mp4',
    difficulty: 'high',
  },
  {
    id: 'front-lever',
    name: 'Front Lever',
    category: 'strength',
    level: 'intermediate',
    description: 'Hanging horizontal body position',
    icon: ' 🕊️ ',
    color: 'from-cyan-500 to-sky-500',
    xpCost: 350,
    timeToMaster: 8,
    prerequisites: ['pull-up', 'hollow-body', 'core-strength'],
    exercises: ['tuck-frontlever', 'one-leg-frontlever', 'straddle-frontlever'],
    benefits: ['Core power', 'Back strength', 'Body tension'],
    progressionPath: ['front-lever', 'back-lever', 'planche'],
    thumbnail: '/images/skills/frontlever.jpg',
    videoUrl: '/videos/frontlever-demo.mp4',
    difficulty: 'high',
  },
  {
    id: 'back-lever',
    name: 'Back Lever',
    category: 'strength',
    level: 'intermediate',
    description: 'Inverted horizontal body hold',
    icon: ' 🔄 ',
    color: 'from-indigo-500 to-blue-500',
    xpCost: 400,
    timeToMaster: 10,
    prerequisites: ['pull-up', 'core-hanging', 'scapular-strength'],
    exercises: ['tuck-backlever', 'straddle-backlever', 'planche-to-backlever'],
    benefits: ['Core endurance', 'Inverted strength', 'Control'],
    progressionPath: ['back-lever', 'human-flag', 'full-planche'],
    thumbnail: '/images/skills/backlever.jpg',
    videoUrl: '/videos/backlever-demo.mp4',
    difficulty: 'extreme',
  },

  // Advanced Skills
  {
    id: 'planche',
    name: 'Planche',
    category: 'skill',
    level: 'advanced',
    description: 'Horizontal body hold with arms at 90 degrees',
    icon: ' 📐 ',
    color: 'from-orange-500 to-red-500',
    xpCost: 600,
    timeToMaster: 16,
    prerequisites: ['push-up', 'pseudo-planche', 'wrist-preparation', 'core-poise'],
    exercises: ['tuck-planche', 'straddle-planche', 'full-planche'],
    benefits: ['Extreme core strength', 'Pressing mastery', 'Body control'],
    progressionPath: ['planche', 'one-arm-planche', 'human-flag'],
    thumbnail: '/images/skills/planche.jpg',
    videoUrl: '/videos/planche-demo.mp4',
    difficulty: 'extreme',
  },
  {
    id: 'human-flag',
    name: 'Human Flag',
    category: 'skill',
    level: 'advanced',
    description: 'Horizontal body hold with leg extension',
    icon: ' 🚩 ',
    color: 'from-violet-500 to-purple-500',
    xpCost: 800,
    timeToMaster: 20,
    prerequisites: ['front-lever', 'side-control', 'leg-control'],
    exercises: ['basic-humanflag', 'one-arm-humanflag', 'gardless-humanflag'],
    benefits: ['Advanced control', 'Leg strength', 'Suspension skill'],
    progressionPath: ['human-flag', 'one-arm-flag', 'between-the-racks'],
    thumbnail: '/images/skills/humanflag.jpg',
    videoUrl: '/videos/humanflag-demo.mp4',
    difficulty: 'extreme',
  },
];

export const useSkills = () => {
  const context = useContext(SkillContext);
  if (!context) {
    throw new Error('useSkills must be used within a SkillProvider');
  }
  return context;
};

export const SkillProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProgress, setUserProgress] = useLocalStorage<UserSkillProgress[]>(
    'caligym-skills-progress',
    []
  );

  // Generate skill tree with positions
  const generateSkillTree = (): SkillTreeNode[] => {
    const skillMap = new Map<string, Skill>();
    SKILLS_DATA.forEach(skill => skillMap.set(skill.id, skill));

    // Build tree with proper positioning
    const tree: SkillTreeNode[] = [];
    const visited = new Set<string>();

    SKILLS_DATA.forEach(skill => {
      if (visited.has(skill.id)) return;

      const node: SkillTreeNode = {
        skill,
        position: { x: 0, y: 0 }, // Will be calculated in a separate pass
        isUnlocked: false,
        isCurrent: false,
        progress: 0,
        children: [],
      };

      tree.push(node);
      visited.add(skill.id);

      // Find and link children
      SKILLS_DATA.forEach(childSkill => {
        if (childSkill.prerequisites.includes(skill.id)) {
          const childNode: SkillTreeNode = {
            skill: childSkill,
            position: { x: 0, y: 0 },
            isUnlocked: false,
            isCurrent: false,
            progress: 0,
            children: [],
            parent: node,
          };
          node.children.push(childNode);
          visited.add(childSkill.id);
        }
      });
    });

    // Calculate positions (simple tree layout)
    const calculatePositions = (nodes: SkillTreeNode[], x: number, y: number, offset: number) => {
      nodes.forEach((node, index) => {
        node.position = { x, y: y + index * offset };
        if (node.children.length > 0) {
          calculatePositions(node.children, x + offset * 2, y + offset, offset);
        }
      });
    };

    calculatePositions(tree, 100, 100, 80);

    return tree;
  };

  const skillTree = generateSkillTree();

  const unlockSkill = (skillId: string) => {
    setUserProgress(prev => {
      const existing = prev.find(p => p.skillId === skillId);
      if (existing) {
        return prev;
      }

      const skill = SKILLS_DATA.find(s => s.id === skillId);
      if (!skill) return prev;

      const newProgress: UserSkillProgress = {
        skillId,
        currentLevel: skill.level,
        progress: 0,
        unlockTime: new Date(),
        streak: 0,
        totalPracticeTime: 0,
        achievedAt: new Date(),
      };

      return [...prev, newProgress];
    });
  };

  const practiceSkill = (
    skillId: string,
    duration: number,
    value?: number,
    unit?: string
  ) => {
    setUserProgress(prev =>
      prev.map(progress => {
        if (progress.skillId !== skillId) return progress;

        const skill = SKILLS_DATA.find(s => s.id === skillId);
        if (!skill) return progress;

        const newProgress = { ...progress };
        newProgress.lastPracticed = new Date();
        newProgress.streak += 1;
        newProgress.totalPracticeTime += duration;

        // Calculate XP based on duration and skill difficulty
        const xpGain = Math.floor(duration * (skill.level === 'foundation' ? 10 :
                                skill.level === 'beginner' ? 15 :
                                skill.level === 'intermediate' ? 20 : 25));
        newProgress.progress = Math.min(100, (newProgress.progress || 0) + xpGain);

        if (value && unit) {
          newProgress.personalRecord = {
            value,
            unit,
            date: new Date(),
          };
        }

        // Check if skill is mastered
        if (newProgress.progress >= 100 && !newProgress.achievedAt) {
          newProgress.achievedAt = new Date();
        }

        return newProgress;
      })
    );
  };

  const getNextSkill = (): Skill | null => {
    const inProgress = userProgress.find(p => p.progress < 100);
    if (inProgress) {
      return SKILLS_DATA.find(s => s.id === inProgress.skillId) || null;
    }

    // Find first unlocked but not mastered skill
    const unlockedButNotMastered = userProgress
      .filter(p => p.progress < 100)
      .sort((a, b) => {
        const skillA = SKILLS_DATA.find(s => s.id === a.skillId);
        const skillB = SKILLS_DATA.find(s => s.id === b.skillId);
        return (skillB?.xpCost || 0) - (skillA?.xpCost || 0);
      });

    if (unlockedButNotMastered.length > 0) {
      const nextSkillId = unlockedButNotMastered[0].skillId;
      return SKILLS_DATA.find(s => s.id === nextSkillId) || null;
    }

    return null;
  };

  const getSkillProgress = (skillId: string): UserSkillProgress | null => {
    return userProgress.find(p => p.skillId === skillId) || null;
  };

  const setCurrentSkill = (skillId: string | null) => {
    // This would integrate with workout state
    console.log('Setting current skill:', skillId);
  };

  const loadProgress = () => {
    // Load from local storage or API
  };

  const saveProgress = () => {
    // Save to local storage or API
  };

  const contextValue: SkillContextType = {
    skills: SKILLS_DATA,
    userProgress,
    skillTree,
    currentSkill: null,
    unlockSkill,
    practiceSkill,
    getNextSkill,
    getSkillProgress,
    getSkillTree: () => skillTree,
    setCurrentSkill,
    loadProgress,
    saveProgress,
  };

  return (
    <SkillContext.Provider value={contextValue}>
      {children}
    </SkillContext.Provider>
  );
};