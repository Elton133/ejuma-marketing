import {
  DeliveryTracking01Icon,
  Location01Icon,
  ShieldUserIcon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";

export type FeatureIconKey = "verified" | "search" | "tracking" | "deposit";

export const FEATURE_ICONS = {
  verified: ShieldUserIcon,
  search: Location01Icon,
  tracking: DeliveryTracking01Icon,
  deposit: Wallet01Icon,
} as const satisfies Record<FeatureIconKey, typeof ShieldUserIcon>;
