export interface FlzToolbarRouteBase {
  icon: string;
  link: string;
  children?: Array<FlzToolbarRouteLabel>;
}

export interface FlzToolbarRouteLabel extends FlzToolbarRouteBase {
  label: string;
  labelDefault?: string;
  langKey?: string;
}

export type FlzToolbarRoute = FlzToolbarRouteBase | FlzToolbarRouteLabel;
export type FlzToolbarRoutes = Array<FlzToolbarRoute>;
