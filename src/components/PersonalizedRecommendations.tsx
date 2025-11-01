"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/firebase/auth';
import { personalizedModuleRecommendations } from '@/ai/flows/personalized-module-recommendations';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { Module, UserProgress } from '@/lib/types';
import { ModuleCard } from './ModuleCard';
import { Skeleton } from './ui/skeleton';

interface PersonalizedRecommendationsProps {
  allModules: Module[];
}

export function PersonalizedRecommendations({ allModules }: PersonalizedRecommendationsProps) {
  const { user } = useAuth();
  const [recommendedModules, setRecommendedModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const progressQuery = query(collection(db, 'userProgress'), where('userId', '==', user.uid));
        const progressSnapshot = await getDocs(progressQuery);
        const userProgress = progressSnapshot.docs.map(doc => doc.data() as UserProgress);
        
        const completedLessons = userProgress.filter(p => p.completed).map(p => p.lessonId);
        const learningHistory = [...new Set(userProgress.map(p => p.lessonId))];

        const recommendationInput = {
          userId: user.uid,
          learningHistory: learningHistory,
          interests: [], // Interests are not collected in this version
          completedLessons: completedLessons,
        };

        const result = await personalizedModuleRecommendations(recommendationInput);
        
        const recommended = result.moduleIds
            .map(id => allModules.find(m => m.id === id))
            .filter((m): m is Module => !!m);

        setRecommendedModules(recommended);
      } catch (error) {
        console.error("Failed to get recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user, allModules]);

  if (loading) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="aspect-[9/13.5] w-full" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            ))}
        </div>
    );
  }

  if (recommendedModules.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {recommendedModules.map(module => (
        <ModuleCard key={module.id} module={module} />
      ))}
    </div>
  );
}
