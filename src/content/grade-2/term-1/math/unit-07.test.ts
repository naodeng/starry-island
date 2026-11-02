import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('二年级上册数学旧版时间单元', () => {
  it('does not publish the retired time unit in the new textbook curriculum', () => {
    expect(curriculum.units['grade-2/term-1/math/unit-07']).toBeUndefined();
  });
});
