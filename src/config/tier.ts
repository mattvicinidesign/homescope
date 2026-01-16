export type AppTier = 'agent_pro' | 'buyer_lite';

// Single source of truth for app tier configuration
// In production, this would come from user profile, subscription, or environment config
export const appTier: AppTier = 'agent_pro';
