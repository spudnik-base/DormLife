import IconDishes from "./IconDishes.jsx";
import IconLaundry from "./IconLaundry.jsx";
import IconGarbage from "./IconGarbage.jsx";
import IconOrganisation from "./IconOrganisation.jsx";
import IconKitchen from "./IconKitchen.jsx";
import IconCommunity from "./IconCommunity.jsx";
import IconHome from "./IconHome.jsx";
import IconChores from "./IconChores.jsx";
import IconBadges from "./IconBadges.jsx";

export {
  IconDishes,
  IconLaundry,
  IconGarbage,
  IconOrganisation,
  IconKitchen,
  IconCommunity,
  IconHome,
  IconChores,
  IconBadges,
};

export const MODULE_ICONS = {
  dishes: IconDishes,
  laundry: IconLaundry,
  garbage: IconGarbage,
  organisation: IconOrganisation,
  kitchen: IconKitchen,
  community: IconCommunity,
};

export function ModuleIcon({ id, size, color, stroke, accent }) {
  const Component = MODULE_ICONS[id];
  if (!Component) return null;
  return <Component size={size} color={color} stroke={stroke} accent={accent} />;
}
