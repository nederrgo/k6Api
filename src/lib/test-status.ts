export const testStatuses= ['PENDING', 'RUNNING', 'COMPLETED', 'FAILED'] as const;

export type TestStatus = typeof testStatuses[number];

export const testStatusValues = {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
};