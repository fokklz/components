export interface FlzSidenavRoute {
  icon: string;
  link: string;
  children?: Array<FlzSidenavRoute>;
}

export type FlzSidenavRoutes = Array<FlzSidenavRoute>;
