export interface SubCategory {
  name: string;
  greek_name: string;
  id: string;
  img_url: string;
}

export interface SubCategories {
  [key: string]: SubCategory[];
}

export const subCategories: SubCategories = {
  fruits_and_vegetables: [
    { name: "Fruits", greek_name: "Φρούτα", id: "fruits", img_url: "" },
    {
      name: "Vegetables",
      greek_name: "Λαχανικά",
      id: "vegetables",
      img_url: "",
    },
    { name: "Salads", greek_name: "Σαλάτες", id: "salads", img_url: "" },
  ],
  milk_and_dairy_products: [
    {
      name: "Fridge Milk",
      greek_name: "Γάλα Ψυγείου",
      id: "fridge_milk",
      img_url: "",
    },
    {
      name: "Chocolate Milk",
      greek_name: "Σοκολατούχο Γάλα",
      id: "chocolate_milk",
      img_url: "",
    },
    {
      name: "Long-Life",
      greek_name: "Μακράς Διάρκειας",
      id: "long_life",
      img_url: "",
    },
    {
      name: "Herbal & Other Drinks",
      greek_name: "Φυτικά & Άλλα Ποτά",
      id: "herbal_and_other_drinks",
      img_url: "",
    },
    {
      name: "Milk Creams",
      greek_name: "Κρέμες Γάλακτος",
      id: "milk_creams",
      img_url: "",
    },
    { name: "Yogurts", greek_name: "Γιαούρτια", id: "yogurts", img_url: "" },
    { name: "Butter", greek_name: "Βούτυρο", id: "butter", img_url: "" },
    { name: "Sweets", greek_name: "Επιδόρπια", id: "sweets", img_url: "" },
  ],
  coffee_tea_and_cocoa: [
    { name: "Coffee", greek_name: "Καφές", id: "coffee", img_url: "" },
    { name: "Tea", greek_name: "Τσάι", id: "tea", img_url: "" },
    { name: "Cocoa", greek_name: "Κακάο", id: "cocoa", img_url: "" },
  ],
  eggs_and_ointments: [
    { name: "Eggs", greek_name: "Αυγά", id: "eggs", img_url: "" },
    { name: "Ointments", greek_name: "Αλοιφές", id: "ointments", img_url: "" },
  ],
  meat_and_fish: [
    { name: "Chicken", greek_name: "Κοτόπουλο", id: "chicken", img_url: "" },
    { name: "Pork", greek_name: "Χοιρινό", id: "pork", img_url: "" },
    {
      name: "Lamb & Other Meats",
      greek_name: "Αρνί & Άλλα Κρέατα",
      id: "lamb_and_other_meats",
      img_url: "",
    },
    {
      name: "Minced Meat",
      greek_name: "Κιμάς",
      id: "minced_meat",
      img_url: "",
    },
    { name: "Fish", greek_name: "Ψάρι", id: "fish", img_url: "" },
  ],
  refrigerated_products_and_ice: [
    {
      name: "Refigerated Meat",
      greek_name: "Κατεψυγμένο Κρέας",
      id: "refrigerated_meat",
      img_url: "",
    },
    {
      name: "Refigerated F&V",
      greek_name: "Κατεψυγμένα Φ&Λ",
      id: "refrigerated_f_and_v",
      img_url: "",
    },
    {
      name: "Refigerated Fish",
      greek_name: "Κατεψυγμένο Ψάρι",
      id: "refrigerated_fish",
      img_url: "",
    },
    { name: "Ice", greek_name: "Πάγος", id: "ice", img_url: "" },
  ],
  beverages_juices_and_other_drinks: [
    { name: "Juices", greek_name: "Χυμοί", id: "juices", img_url: "" },
    { name: "Water", greek_name: "Νερό", id: "water", img_url: "" },
    { name: "Beverages", greek_name: "Ποτά", id: "beverages", img_url: "" },
    {
      name: "Cold Drinks",
      greek_name: "Κρύα Ποτά",
      id: "cold_drinks",
      img_url: "",
    },
  ],
  alcoholic_drinks: [
    { name: "Wine", greek_name: "Κρασί", id: "wine", img_url: "" },
    { name: "Beer", greek_name: "Μπύρα", id: "beer", img_url: "" },
    {
      name: "Other Drinks",
      greek_name: "Άλλα Ποτά",
      id: "other_drinks",
      img_url: "",
    },
  ],
  cheese: [
    {
      name: "Sliced Cheese",
      greek_name: "Φέτες Τυρί",
      id: "sliced_cheese",
      img_url: "",
    },
    {
      name: "Cream Cheese",
      greek_name: "Κρέμα Τυρί",
      id: "cream_cheese",
      img_url: "",
    },
    {
      name: "Grated Cheese",
      greek_name: "Τυρί Τριμμένο",
      id: "grated_cheese",
      img_url: "",
    },
    {
      name: "Feta, Challoumi & Other Cheese",
      greek_name: "Φέτα, Χαλούμι & Άλλα Τυριά",
      id: "feta_challoumi_and_other_cheese",
      img_url: "",
    },
    {
      name: "Vegan Cheese",
      greek_name: "Vegan Τυρί",
      id: "vegan_cheese",
      img_url: "",
    },
  ],
  cold_cuts_and_delicatessen: [
    {
      name: "Turkey & Chicken",
      greek_name: "Πουλερικά",
      id: "turkey_and_chicken",
      img_url: "",
    },
    { name: "Salami", greek_name: "Σαλάμι", id: "salami", img_url: "" },
    { name: "Bacon", greek_name: "Μπέικον", id: "bacon", img_url: "" },
    { name: "Sausages", greek_name: "Λουκάνικα", id: "sausages", img_url: "" },
    {
      name: "Other Cold Cuts",
      greek_name: "Άλλες Κρύες Κοπές",
      id: "other_cold_cuts",
      img_url: "",
    },
    {
      name: "Delicatessen",
      greek_name: "Delicatessen",
      id: "delicatessen",
      img_url: "",
    },
  ],
  cereals_snacks_and_nuts: [
    { name: "Cereal", greek_name: "Δημητριακά", id: "cereal", img_url: "" },
    {
      name: "Cereal Bars",
      greek_name: "Μπάρες Δημητριακών",
      id: "cereal_bars",
      img_url: "",
    },
    {
      name: "Sweet Snacks",
      greek_name: "Γλυκά Σνακς",
      id: "sweet_snacks",
      img_url: "",
    },
    {
      name: "Salty Snacks",
      greek_name: "Αλμυρά Σνακς",
      id: "salty_snacks",
      img_url: "",
    },
    { name: "Nuts", greek_name: "Ξηροί Καρποί", id: "nuts", img_url: "" },
  ],
  honey_jam_and_spreads: [
    { name: "Honey", greek_name: "Μέλι", id: "honey", img_url: "" },
    { name: "Jam", greek_name: "Μαρμελάδα", id: "jam", img_url: "" },
    {
      name: "Pralines & Other Spreads",
      greek_name: "Πραλίνες & Άλλες Αλοιφές",
      id: "pralines_and_other_spreads",
      img_url: "",
    },
  ],
  ready_made_meals: [
    { name: "Meals", greek_name: "Γεύματα", id: "meals", img_url: "" },
  ],
  pasta_and_rice: [
    { name: "Spaghetti", greek_name: "Σπαγγέτι", id: "spaghetti", img_url: "" },
    {
      name: "Stuffed & Other Pasta",
      greek_name: "Γεμιστά & Άλλα Ζυμαρικά",
      id: "stuffed_and_other_pasta",
      img_url: "",
    },
    { name: "Rice", greek_name: "Ρύζι", id: "rice", img_url: "" },
  ],
  grains: [
    { name: "Fasolia", greek_name: "Φασόλια", id: "fasolia", img_url: "" },
    { name: "Fakes", greek_name: "Φακές", id: "fakes", img_url: "" },
    {
      name: "Other Grains",
      greek_name: "Άλλα Σιτηρά",
      id: "other_grains",
      img_url: "",
    },
  ],
  groceries: [
    {
      name: "Canned Food",
      greek_name: "Κονσέρβες",
      id: "canned_food",
      img_url: "",
    },
    {
      name: "Olives & Oil",
      greek_name: "Ελιές & Λάδι",
      id: "olives_and_oil",
      img_url: "",
    },
    {
      name: "Seed Oil & Other Baking Oils",
      greek_name: "Σπορέλαιο & Άλλα Έλαια",
      id: "seed_oil_and_other_baking_oils",
      img_url: "",
    },
    {
      name: "Flour & Semolina",
      greek_name: "Αλεύρι & Σιμιγδάλι",
      id: "flour_and_semolina",
      img_url: "",
    },
    {
      name: "Sugar & Sweeteners",
      greek_name: "Ζάχαρη & Γλυκαντικές Ύλες",
      id: "sugar_and_sweeteners",
      img_url: "",
    },
    {
      name: "Spices & Salt",
      greek_name: "Μπαχαρικά & Αλάτι",
      id: "spices_and_salt",
      img_url: "",
    },
    {
      name: "Sauces & Dressings",
      greek_name: "Σάλτσες & Σάλτσες Σαλάτας",
      id: "sauces_and_dressings",
      img_url: "",
    },
    {
      name: "Vinegar & Lemon Juice",
      greek_name: "Ξίδι & Χυμός Λεμονιού",
      id: "vinegar_and_lemon_juice",
      img_url: "",
    },
    {
      name: "Broths & Purees",
      greek_name: "Ζωμοί & Πουρέδες",
      id: "broths_and_purees",
      img_url: "",
    },
    {
      name: "Confectionary Items",
      greek_name: "Γλυκά Είδη",
      id: "confectionary_items",
      img_url: "",
    },
  ],
  bread_and_pastry: [
    {
      name: "Bread & Wrappers",
      greek_name: "Ψωμί & Πίτες",
      id: "bread_and_wrappers",
      img_url: "",
    },
    { name: "Toasts", greek_name: "Τοστ", id: "toasts", img_url: "" },
    { name: "Bagels", greek_name: "Μπέγκελ", id: "bagels", img_url: "" },
  ],
  personal_hygiene: [
    { name: "Shaving", greek_name: "Ξύρισμα", id: "shaving", img_url: "" },
    {
      name: "Face Cleaning",
      greek_name: "Καθαρισμός Προσώπου",
      id: "face_cleaning",
      img_url: "",
    },
    {
      name: "Personal Hygiene",
      greek_name: "Προσωπική Υγιεινή",
      id: "personal_hygiene",
      img_url: "",
    },
    { name: "Body", greek_name: "Σώμα", id: "body", img_url: "" },
    { name: "Hair", greek_name: "Μαλλιά", id: "hair", img_url: "" },
    {
      name: "Oral Hygiene",
      greek_name: "Στοματική Υγιεινή",
      id: "oral_hygiene",
      img_url: "",
    },
    {
      name: "Sunscreen",
      greek_name: "Αντιηλιακά",
      id: "sunscreen",
      img_url: "",
    },
    {
      name: "Parapharmaceuticals",
      greek_name: "Παραφαρμακευτικά",
      id: "parapharmaceuticals",
      img_url: "",
    },
  ],
  home_care: [
    { name: "Papers", greek_name: "Χαρτικά", id: "papers", img_url: "" },
    { name: "Laundry", greek_name: "Πλυντήριο", id: "laundry", img_url: "" },
    {
      name: "Dish Washing",
      greek_name: "Πλυντήριο Πιάτων",
      id: "dish_washing",
      img_url: "",
    },
    {
      name: "Bug Repellants",
      greek_name: "Απωθητικά Εντόμων",
      id: "bug_repellants",
      img_url: "",
    },
    {
      name: "Cleaning Supplies",
      greek_name: "Καθαριστικά",
      id: "cleaning_supplies",
      img_url: "",
    },
    {
      name: "Stationery",
      greek_name: "Χαρτικά Γραφείου",
      id: "stationery",
      img_url: "",
    },
  ],
};
