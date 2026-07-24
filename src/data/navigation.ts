// Nav structure. `href` accepts:
//   - anchor links (#projects) → scroll on home, route to home + anchor elsewhere
//   - route paths (/about) → standard Next Link
export type NavItem = {
  label: string;
  href: string;
  cta?: boolean;
};

export const primaryNav: NavItem[] = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume", cta: true },
];
