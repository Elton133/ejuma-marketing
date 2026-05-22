import {
  DeliveryTracking01Icon,
  Location01Icon,
  MapsLocation01Icon,
  Notification01Icon,
  ShieldUserIcon,
  SmartPhone01Icon,
  UserStar01Icon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";

export type FeatureIconKey =
  | "verified"
  | "search"
  | "tracking"
  | "deposit"
  | "findSpecialist"
  | "mapTrack"
  | "notification"
  | "easyUI"
  | "bio";

export const FEATURE_ICONS = {
  verified: ShieldUserIcon,
  search: Location01Icon,
  tracking: DeliveryTracking01Icon,
  deposit: Wallet01Icon,
  findSpecialist: MapsLocation01Icon,
  mapTrack: DeliveryTracking01Icon,
  notification: Notification01Icon,
  easyUI: SmartPhone01Icon,
  bio: UserStar01Icon,
} as const satisfies Record<FeatureIconKey, typeof ShieldUserIcon>;
