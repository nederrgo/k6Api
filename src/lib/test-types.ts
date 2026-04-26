export const testTypes = ['smoke', 'spike', 'soak', 'stress', 'load', 'breakpoint'] as const;

export type TestType = typeof testTypes[number];
