import { describe, expect, it } from 'vitest';
import type { ActivityDefinition, CurriculumUnit } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import type { ChallengeManifest } from '../domain/types';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { pilotSupplementalActivities } from './pilotSupplementalActivities';
import { validatePilotManifest } from './validateManifest';
import rawManifest from './pilot-manifest.json';

const manifest = rawManifest as ChallengeManifest;
const sourceUnitIds = [1, 2, 3, 4].map((number) => `grade-2/term-1/math/unit-${String(number).padStart(2, '0')}`);
const safeKinds = new Set(['choice', 'match', 'order', 'categorize', 'arithmetic']);

describe('pilot manifest against the real curriculum', () => {
  it('resolves all 226 unique candidates and passes both release gates', async () => {
    const activitiesById = new Map<string, ActivityDefinition>();
    const sourceUnitByActivityId = new Map<string, string>();
    const unitsById = new Map<string, CurriculumUnit>();

    for (const sourceUnitId of sourceUnitIds) {
      const unit = await loadUnit(sourceUnitId);
      expect(unit).toBeDefined();
      unitsById.set(sourceUnitId, unit!);
      for (const track of Object.values(unit!.difficultyTracks)) {
        for (const task of track.tasks) {
          for (const session of task.sessions) {
            for (const activity of session.activities) {
              if (!safeKinds.has(activity.kind)) continue;
              activitiesById.set(activity.id, activity);
              sourceUnitByActivityId.set(activity.id, sourceUnitId);
            }
          }
        }
      }
    }

    for (const supplemental of pilotSupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, sourceUnitIds[1]);
    }

    const report = await validatePilotManifest(manifest, activitiesById, sourceUnitByActivityId, unitsById);
    expect(report.errors).toEqual([]);
    expect(report.contentChanges).toEqual([]);
    for (const question of manifest.questions) {
      const activity = activitiesById.get(question.activityId)!;
      const sourceUnitId = sourceUnitByActivityId.get(question.activityId)!;
      expect(question.knowledgePointIds).toEqual(derivePilotQuestionKnowledgePointIds(sourceUnitId, activity));
    }
    expect(report.groupStatusById).toEqual({
      'grade-2-term-1-math-unit-02': 'ready',
      'grade-2-term-1-math-first-half': 'ready',
    });
    expect(manifest.groups[0].questionIds).toHaveLength(90);
    expect(manifest.groups[1].questionIds).toHaveLength(226);
  });

  it('keeps chapter boundary evidence explicit and the unit group scoped to Unit 2', () => {
    const unitGroup = manifest.groups.find(({ definition }) => definition.kind === 'unit')!;
    const semesterGroup = manifest.groups.find(({ definition }) => definition.kind === 'semester')!;
    expect(unitGroup.definition.sourceUnitIds).toEqual([sourceUnitIds[1]]);
    expect(semesterGroup.definition.sourceUnitIds).toEqual(sourceUnitIds);
    expect(semesterGroup.definition.stage).toBe('first-half');
    expect(semesterGroup.definition.mappingEvidence.notes).toContain('first-half=01–04');
    expect(semesterGroup.definition.mappingEvidence.notes).toContain('不声称代表学校授课日历');
  });
});
