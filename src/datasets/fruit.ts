export const fruits = [
  {
    id: 1,
    value: "apple",
    label: "🍎 Apple",
    color: "red",
    taste: "sweet",
    season: "fall",
    type: "pome",
  },
  {
    id: 2,
    value: "banana",
    label: "🍌 Banana",
    color: "yellow",
    taste: "sweet",
    season: "year-round",
    type: "berry",
  },
  {
    id: 3,
    value: "orange",
    label: "🍊 Orange",
    color: "orange",
    taste: "citrus",
    season: "winter",
    type: "citrus",
  },
  {
    id: 4,
    value: "strawberry",
    label: "🍓 Strawberry",
    color: "red",
    taste: "sweet",
    season: "spring",
    type: "berry",
  },
  {
    id: 5,
    value: "grape",
    label: "🍇 Grape",
    color: "purple",
    taste: "sweet",
    season: "fall",
    type: "berry",
  },
  {
    id: 6,
    value: "watermelon",
    label: "🍉 Watermelon",
    color: "green",
    taste: "sweet",
    season: "summer",
    type: "melon",
  },
  {
    id: 7,
    value: "pineapple",
    label: "🍍 Pineapple",
    color: "yellow",
    taste: "sweet-tart",
    season: "summer",
    type: "tropical",
  },
  {
    id: 8,
    value: "kiwi",
    label: "🥝 Kiwi",
    color: "green",
    taste: "tart",
    season: "winter",
    type: "berry",
  },
  {
    id: 9,
    value: "mango",
    label: "🥭 Mango",
    color: "yellow",
    taste: "sweet",
    season: "summer",
    type: "tropical",
  },
  {
    id: 10,
    value: "cherry",
    label: "🍒 Cherry",
    color: "red",
    taste: "sweet",
    season: "summer",
    type: "stone",
  },
  {
    id: 11,
    value: "pear",
    label: "🍐 Pear",
    color: "green",
    taste: "sweet",
    season: "fall",
    type: "pome",
  },
  {
    id: 12,
    value: "peach",
    label: "🍑 Peach",
    color: "orange",
    taste: "sweet",
    season: "summer",
    type: "stone",
  },
  {
    id: 13,
    value: "lemon",
    label: "🍋 Lemon",
    color: "yellow",
    taste: "sour",
    season: "year-round",
    type: "citrus",
  },
];
type GroupedFruits = {
  [key: string]: Fruit[];
};

export const getGroupedByColor = (): GroupedFruits => {
  const grouped: GroupedFruits = {};
  fruits.forEach((fruit) => {
    if (!grouped[fruit.color]) {
      grouped[fruit.color] = [];
    }
    grouped[fruit.color].push(fruit);
  });
  return grouped;
};

export const getGroupedByTaste = (): GroupedFruits => {
  const grouped: GroupedFruits = {};
  fruits.forEach((fruit) => {
    if (!grouped[fruit.taste]) {
      grouped[fruit.taste] = [];
    }
    grouped[fruit.taste].push(fruit);
  });
  return grouped;
};

export const getGroupedBySeason = (): GroupedFruits => {
  const grouped: GroupedFruits = {};
  fruits.forEach((fruit) => {
    if (!grouped[fruit.season]) {
      grouped[fruit.season] = [];
    }
    grouped[fruit.season].push(fruit);
  });
  return grouped;
};

export const getGroupedByType = (): GroupedFruits => {
  const grouped: GroupedFruits = {};
  fruits.forEach((fruit) => {
    if (!grouped[fruit.type]) {
      grouped[fruit.type] = [];
    }
    grouped[fruit.type].push(fruit);
  });
  return grouped;
};

export type Fruit = (typeof fruits)[number];
