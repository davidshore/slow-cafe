export type MenuCategory = "Alla" | "Kaffe" | "Fika" | "Lunch";

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  category: Exclude<MenuCategory, "Alla">;
  price: number;
  popular?: boolean;
};

export const MENU_CATEGORIES: MenuCategory[] = [
  "Alla",
  "Kaffe",
  "Fika",
  "Lunch",
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: "Bryggkaffe",
    description: "Dagens ljusrostade kaffe från vårt rosteri i Stockholm.",
    category: "Kaffe",
    price: 38,
    popular: true,
  },
  {
    id: 2,
    name: "Havrecappuccino",
    description: "Dubbel espresso med ångad havredryck.",
    category: "Kaffe",
    price: 52,
  },
  {
    id: 3,
    name: "Kanelbulle",
    description: "Bakad varje morgon med kardemumma och svenskt smör.",
    category: "Fika",
    price: 42,
    popular: true,
  },
  {
    id: 4,
    name: "Citronkaka",
    description: "Mjuk citronkaka med vallmo och färskostglasyr.",
    category: "Fika",
    price: 48,
  },
  {
    id: 5,
    name: "Grillad svampmacka",
    description: "Surdegsbröd, svamp, lagrad ost och picklad lök.",
    category: "Lunch",
    price: 125,
    popular: true,
  },
  {
    id: 6,
    name: "Säsongens soppa",
    description: "Serveras med surdegsbröd och vispat örtsmör.",
    category: "Lunch",
    price: 115,
  },
];

