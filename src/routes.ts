export const Routes = {
  inventory: "/inventory.html",
} as const;

export type RouteKey = keyof typeof Routes;