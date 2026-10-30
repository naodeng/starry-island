import { useEffect, useMemo, useRef } from 'react';
import { createChallengeRepository } from '../storage/indexedDbRepository';
import type { ChallengeRepository } from '../storage/repository';

export default function useChallengeRepository(providedRepository?: ChallengeRepository): ChallengeRepository {
  const repository = useMemo(
    () => providedRepository ?? createChallengeRepository(),
    [providedRepository],
  );
  const lifecycleGeneration = useRef(0);
  const lifecycle = useRef({ repository, owned: !providedRepository });

  useEffect(() => {
    const previous = lifecycle.current;
    if (previous.repository !== repository && previous.owned) previous.repository.close();
    lifecycle.current = { repository, owned: !providedRepository };
    const generation = ++lifecycleGeneration.current;

    return () => {
      if (providedRepository) return;
      queueMicrotask(() => {
        const current = lifecycle.current;
        if (lifecycleGeneration.current === generation && current.repository === repository && current.owned) {
          repository.close();
        }
      });
    };
  }, [providedRepository, repository]);

  return repository;
}
