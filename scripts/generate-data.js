const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "../src/data");

const firstNames = [
  "James",
  "Mary",
  "Robert",
  "Patricia",
  "John",
  "Jennifer",
  "Michael",
  "Linda",
  "William",
  "Elizabeth",
  "David",
  "Barbara",
  "Richard",
  "Susan",
  "Joseph",
  "Jessica",
  "Thomas",
  "Sarah",
  "Charles",
  "Karen",
];
const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
];
const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
];
const states = [
  "New York",
  "California",
  "Illinois",
  "Texas",
  "Arizona",
  "Pennsylvania",
  "Texas",
  "California",
  "Texas",
  "California",
];
const universities = [
  "Harvard University",
  "Stanford University",
  "MIT",
  "UC Berkeley",
  "University of Oxford",
  "University of Cambridge",
  "Yale University",
  "Princeton University",
];
const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "Support",
  "Finance",
  "Legal",
  "Human Resources",
];
const titles = [
  "Software Engineer",
  "Product Manager",
  "Designer",
  "Analyst",
  "Manager",
  "Director",
  "Lead",
];

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomSample = (arr, n) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

function generateUsers(count) {
  const users = [];
  for (let i = 1; i <= count; i++) {
    const firstName = randomChoice(firstNames);
    const lastName = randomChoice(lastNames);
    users.push({
      id: i,
      firstName,
      lastName,
      maidenName: randomChoice(lastNames),
      age: randomInt(18, 65),
      gender: randomChoice(["male", "female"]),
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
      phone: `+1 ${randomInt(100, 999)}-${randomInt(100, 999)}-${randomInt(
        1000,
        9999
      )}`,
      username: `${firstName.toLowerCase()}${i}`,
      birthDate: `${randomInt(1960, 2005)}-${String(randomInt(1, 12)).padStart(
        2,
        "0"
      )}-${String(randomInt(1, 28)).padStart(2, "0")}`,
      image: `https://dummyjson.com/image/i/users/${i}.jpg`,
      address: {
        address: `${randomInt(100, 999)} Oak Street`,
        city: randomChoice(cities),
        state: randomChoice(states),
        postalCode: `${randomInt(10000, 99999)}`,
        country: "United States",
      },
      university: randomChoice(universities),
      company: {
        name: `${randomChoice(lastNames)} & ${randomChoice(lastNames)} Corp`,
        department: randomChoice(departments),
        title: randomChoice(titles),
      },
    });
  }
  return users;
}

function generatePosts(count, userCount) {
  const posts = [];
  const postTitles = [
    "Understanding React",
    "Mastering CSS",
    "JS Performance",
    "API Design",
    "Next.js Tips",
    "Database Management",
    "Frontend Trends",
    "Backend Scalability",
  ];
  const bodies = [
    "This is a deep dive into the topic.",
    "Learn how to build better software.",
    "Advanced techniques for developers.",
    "A comprehensive guide for beginners.",
  ];
  const tags = [
    "javascript",
    "web",
    "programming",
    "react",
    "css",
    "node",
    "database",
  ];

  for (let i = 1; i <= count; i++) {
    posts.push({
      id: i,
      title: `${randomChoice(postTitles)} ${i}`,
      body: randomChoice(bodies),
      tags: randomSample(tags, 3),
      reactions: {
        likes: randomInt(10, 500),
        dislikes: randomInt(0, 50),
      },
      views: randomInt(100, 5000),
      userId: randomInt(1, userCount),
    });
  }
  return posts;
}

function generateProducts(count) {
  const products = [];
  const categories = [
    "electronics",
    "clothing",
    "home",
    "outdoors",
    "beauty",
    "books",
  ];
  const brands = ["Apple", "Samsung", "Nike", "Adidas", "Sony", "Dell", "HP"];

  for (let i = 1; i <= count; i++) {
    const category = randomChoice(categories);
    products.push({
      id: i,
      title: `Product ${i}`,
      description: `This is a description for product ${i} in the ${category} category.`,
      category,
      price: parseFloat((Math.random() * 990 + 10).toFixed(2)),
      discountPercentage: parseFloat((Math.random() * 20).toFixed(2)),
      rating: parseFloat((Math.random() * 4 + 1).toFixed(1)),
      stock: randomInt(0, 500),
      brand: randomChoice(brands),
      tags: [category, "new", "top"],
      thumbnail: `https://dummyjson.com/image/i/products/${i}/thumbnail.jpg`,
      images: [`https://dummyjson.com/image/i/products/${i}/1.jpg`],
    });
  }
  return products;
}

function generateTodos(count, userCount) {
  const todos = [];
  const tasks = [
    "Study React",
    "Buy Groceries",
    "Exercise",
    "Call Mom",
    "Finish Project",
    "Read Book",
    "Cleaning",
  ];

  for (let i = 1; i <= count; i++) {
    todos.push({
      id: i,
      todo: `${randomChoice(tasks)} - Task ${i}`,
      completed: Math.random() > 0.5,
      userId: randomInt(1, userCount),
    });
  }
  return todos;
}

const userCount = 55;
const postCount = 55;
const productCount = 55;
const todoCount = 55;

const users = generateUsers(userCount);
const posts = generatePosts(postCount, userCount);
const products = generateProducts(productCount);
const todos = generateTodos(todoCount, userCount);

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

fs.writeFileSync(
  path.join(DATA_DIR, "users.json"),
  JSON.stringify(users, null, 2)
);
fs.writeFileSync(
  path.join(DATA_DIR, "posts.json"),
  JSON.stringify(posts, null, 2)
);
fs.writeFileSync(
  path.join(DATA_DIR, "products.json"),
  JSON.stringify(products, null, 2)
);
fs.writeFileSync(
  path.join(DATA_DIR, "todos.json"),
  JSON.stringify(todos, null, 2)
);

console.log("Data generation complete.");
