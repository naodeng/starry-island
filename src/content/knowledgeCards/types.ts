export interface KnowledgeCardExample {
  prompt: string;
  answer: string;
  reasoning: string;
}

export interface KnowledgeCardDefinition {
  id: string;
  topic: string;
  explanation: string;
  example: KnowledgeCardExample;
}

export type KnowledgeCardRow = readonly [
  topic: string,
  explanation: string,
  prompt: string,
  answer: string,
  reasoning: string,
];

export function defineKnowledgeCards(unitKey: string, rows: readonly KnowledgeCardRow[]): KnowledgeCardDefinition[] {
  return rows.map(([topic, explanation, prompt, answer, reasoning], index) => ({
    id: `${unitKey}/knowledge-${String(index + 1).padStart(2, '0')}`,
    topic,
    explanation,
    example: { prompt, answer, reasoning },
  }));
}
