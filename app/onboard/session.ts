// Plain constants shared between the server actions and the dashboard.
// (A 'use server' file may only export async functions, so this can't live in actions.ts.)

/** httpOnly cookie holding the current business id during the test phase. */
export const BUSINESS_COOKIE = 'pp_business_id'
