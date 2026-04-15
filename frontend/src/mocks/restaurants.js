export const mockRestaurants = [
  {
    id: 1,
    name: "Spicy Haven",
    description: "Authentic Indian cuisine with bold flavors",
    image: "🌶️",
    rating: 4.8,
    deliveryTime: "25-35 min",
  },
  {
    id: 2,
    name: "Pizza Palace",
    description: "Fresh dough, premium toppings, wood-fired perfection",
    image: "🍕",
    rating: 4.6,
    deliveryTime: "20-30 min",
  },
  {
    id: 3,
    name: "Burger Bonanza",
    description: "Juicy burgers and crispy fries made fresh daily",
    image: "🍔",
    rating: 4.7,
    deliveryTime: "15-25 min",
  },
  {
    id: 4,
    name: "Sushi Supreme",
    description: "Fresh sushi rolls and sashimi from top chefs",
    image: "🍣",
    rating: 4.9,
    deliveryTime: "30-40 min",
  },
  {
    id: 5,
    name: "Taco Fiesta",
    description: "Mexican street food with authentic spices",
    image: "🌮",
    rating: 4.5,
    deliveryTime: "20-30 min",
  },
  {
    id: 6,
    name: "Salad Garden",
    description: "Healthy bowls and fresh salads for every diet",
    image: "🥗",
    rating: 4.4,
    deliveryTime: "15-25 min",
  },
];

export const mockMenus = {
  1: [
    { id: 1, name: "Butter Chicken", price: 18.99, image: "🍛" },
    { id: 2, name: "Naan Bread", price: 4.99, image: "🥙" },
    { id: 3, name: "Biryani Rice", price: 16.99, image: "🍚" },
  ],
  2: [
    { id: 4, name: "Margherita Pizza", price: 14.99, image: "🍕" },
    { id: 5, name: "Pepperoni Pizza", price: 16.99, image: "🍕" },
    { id: 6, name: "Garlic Bread", price: 7.99, image: "🍞" },
  ],
  // Add more as needed
};

export default { mockRestaurants, mockMenus };
