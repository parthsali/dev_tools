const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "../src/data");

// ---------- India-centric expanded lists ----------

// 50+ Indian first names (male + female, modern & traditional)
const firstNames = [
  "Aarav",
  "Vivaan",
  "Aditya",
  "Arjun",
  "Sai",
  "Krishna",
  "Rohan",
  "Rahul",
  "Karan",
  "Ritesh",
  "Ramesh",
  "Arnav",
  "Ishan",
  "Viraj",
  "Manav",
  "Amit",
  "Raj",
  "Dev",
  "Kabir",
  "Aryan",
  "Yash",
  "Tejas",
  "Siddharth",
  "Anil",
  "Vivek",
  "Samarth",
  "Mihir",
  "Krish",
  "Tarun",
  "Nikhil",
  "Neha",
  "Priya",
  "Ananya",
  "Saanvi",
  "Aditi",
  "Ishita",
  "Sneha",
  "Shreya",
  "Meera",
  "Divya",
  "Diya",
  "Kavya",
  "Tanvi",
  "Riya",
  "Prachi",
  "Nikita",
  "Shalini",
  "Pooja",
  "Anika",
  "Shruti",
  "Swara",
  "Bhavya",
  "Tara",
  "Ayesha",
  "Maya",
  "Suhana",
  "Ira",
  "Navya",
  "Eesha",
  "Zara",
];

// 50+ Indian last names (surnames / family names) :contentReference[oaicite:0]{index=0}
const lastNames = [
  "Singh",
  "Kumar",
  "Sharma",
  "Patel",
  "Verma",
  "Reddy",
  "Gupta",
  "Mehta",
  "Das",
  "Mukherjee",
  "Chowdhury",
  "Nair",
  "Iyer",
  "Rao",
  "Chopra",
  "Joshi",
  "Menon",
  "Bose",
  "Ghosh",
  "Kapoor",
  "Rai",
  "Malhotra",
  "Saxena",
  "Trivedi",
  "Bhandari",
  "Tripathi",
  "Chatterjee",
  "Mishra",
  "Shukla",
  "Shah",
  "Tiwari",
  "Balakrishnan",
  "Nambiar",
  "Shetty",
  "Bhatt",
  "Pandey",
  "Sethi",
  "Kaushik",
  "Mann",
  "Singhal",
  "Dalal",
  "Basu",
  "Dutta",
  "Varma",
  "Raj",
  "Bhattacharya",
  "Ganguly",
  "Nayak",
  "Naidu",
  "Khan",
  "Ansari",
  "Qureshi",
  "Syed",
  "Hussain",
  "Shaikh",
  "Pathak",
];

// 50+ major Indian cities
const cities = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Visakhapatnam",
  "Vadodara",
  "Coimbatore",
  "Kochi",
  "Thiruvananthapuram",
  "Bhubaneswar",
  "Chandigarh",
  "Patna",
  "Bhopal",
  "Ludhiana",
  "Agra",
  "Madurai",
  "Rajkot",
  "Jodhpur",
  "Amritsar",
  "Nashik",
  "Faridabad",
  "Meerut",
  "Ghaziabad",
  "Noida",
  "Gurgaon",
  "Dehradun",
  "Jabalpur",
  "Udaipur",
  "Shimla",
  "Trichy",
  "Tirupati",
  "Mysuru",
  "Vijayawada",
  "Ranchi",
  "Kolhapur",
  "Allahabad",
  "Moradabad",
  "Gwalior",
  "Siliguri",
  "Durgapur",
];

// 50+ Indian states & union territories
const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Puducherry",
  "Jammu & Kashmir",
  "Ladakh",
  "Andaman & Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Lakshadweep",
];

// 50+ Indian universities / higher-ed institutes :contentReference[oaicite:1]{index=1}
const universities = [
  "Indian Institute of Technology Bombay",
  "Indian Institute of Technology Delhi",
  "Indian Institute of Technology Madras",
  "Indian Institute of Science Bangalore",
  "University of Delhi",
  "Jawaharlal Nehru University",
  "Banaras Hindu University",
  "Aligarh Muslim University",
  "Anna University",
  "Jamia Millia Islamia",
  "Vellore Institute of Technology",
  "Amrita Vishwa Vidyapeetham",
  "IIT Kanpur",
  "IIT Kharagpur",
  "IIT Roorkee",
  "IIT Guwahati",
  "IIT Hyderabad",
  "IIT BHU",
  "IIM Ahmedabad",
  "IIM Bangalore",
  "IIM Calcutta",
  "Pune University",
  "Osmania University",
  "Mumbai University",
  "Bangalore University",
  "Punjab University",
  "Calcutta University",
  "Manipal Academy of Higher Education",
  "Symbiosis International",
  "TISS Mumbai",
  "BITS Pilani",
  "Christ University",
  "NIT Trichy",
  "NIT Warangal",
  "Jadavpur University",
  "GITAM",
  "UPES",
  "BITS Hyderabad",
  "Lovely Professional University",
  "SRM University",
  "KIIT University",
  "Amity University",
  "Ahmedabad University",
  "Mysore University",
  "Gujarat University",
  "Andhra University",
  "Mahatma Gandhi University",
];

// 50+ departments
const departments = [
  "Engineering",
  "Sales",
  "Marketing",
  "Human Resources",
  "Support",
  "Finance",
  "Research",
  "Operations",
  "Administration",
  "Product Development",
  "Legal",
  "Quality Assurance",
  "IT",
  "Customer Success",
  "Procurement",
  "Logistics",
  "Strategy",
  "Training",
  "Analytics",
  "Risk Management",
  "Compliance",
  "Corporate Affairs",
  "R&D",
  "Public Relations",
  "Technical Support",
  "Design",
  "Business Development",
  "Security",
  "Content",
  "Data Science",
  "Manufacturing",
  "Regulatory",
  "Maintenance",
  "Innovation",
  "Brand Management",
  "Supply Chain",
  "Health & Safety",
  "Customer Care",
  "Investor Relations",
  "Network Operations",
  "Business Intelligence",
  "System Integration",
  "Project Management",
  "User Experience",
  "DevOps",
  "Field Services",
  "Performance",
];

// 50+ job titles
const titles = [
  "Software Developer",
  "Senior Software Engineer",
  "Full Stack Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Product Manager",
  "Project Manager",
  "Data Analyst",
  "Data Scientist",
  "UX/UI Designer",
  "DevOps Engineer",
  "QA Engineer",
  "Technical Support Engineer",
  "Business Analyst",
  "Sales Executive",
  "Finance Manager",
  "HR Specialist",
  "Legal Advisor",
  "Operations Manager",
  "Marketing Specialist",
  "Customer Success Manager",
  "Network Engineer",
  "Cloud Architect",
  "Database Administrator",
  "Cybersecurity Analyst",
  "Mobile App Developer",
  "Technical Lead",
  "CTO",
  "COO",
  "Software Architect",
  "SEO Specialist",
  "Content Strategist",
  "Graphic Designer",
  "AI/ML Engineer",
  "Blockchain Developer",
  "IT Consultant",
  "Systems Analyst",
  "Product Owner",
  "CRM Specialist",
  "Helpdesk Technician",
  "Data Engineer",
  "Compliance Officer",
  "Security Specialist",
  "Research Scientist",
  "Logistics Coordinator",
  "Brand Manager",
  "Training Coordinator",
  "Performance Engineer",
  "Innovation Lead",
];

// Helper functions
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomSample = (arr, n) =>
  [...arr].sort(() => 0.5 - Math.random()).slice(0, n);

// ---------- Generators ----------

function generateUsers(count) {
  const users = [];
  for (let i = 1; i <= count; i++) {
    const fn = randomChoice(firstNames);
    const ln = randomChoice(lastNames);
    users.push({
      id: i,
      firstName: fn,
      lastName: ln,
      age: randomInt(18, 65),
      gender: randomChoice(["male", "female", "other"]),
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@example.in`,
      phone: `+91 ${randomInt(60000, 99999)}-${randomInt(1000, 9999)}`,
      username: `${fn.toLowerCase()}${i}`,
      birthDate: `${randomInt(1958, 2005)}-${String(randomInt(1, 12)).padStart(
        2,
        "0"
      )}-${String(randomInt(1, 28)).padStart(2, "0")}`,
      image: `https://dummyjson.com/image/i/users/${i}.jpg`,
      address: {
        address: `${randomInt(10, 999)} MG Road`,
        city: randomChoice(cities),
        state: randomChoice(states),
        postalCode: `${randomInt(110000, 799999)}`,
        country: "India",
      },
      university: randomChoice(universities),
      company: {
        name: `${randomChoice(lastNames)} ${randomChoice(departments)} Pvt Ltd`,
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
    "Understanding Angular",
    "React in India",
    "Node Performance Tips",
    "API Design Principles",
    "UI/UX Trends",
    "Cloud Adoption in 2026",
    "Frontend Dev Tips",
    "Backend Best Practices",
    "Tech Careers in India",
  ];
  const bodies = [
    "This is a comprehensive Indian context guide.",
    "Best practices from Indian developers.",
    "Advanced techniques explained clearly.",
    "A roadmap from beginner to expert.",
    "Real project examples included.",
  ];
  const tags = [
    "javascript",
    "web",
    "node",
    "react",
    "cloud",
    "dev",
    "india",
    "programming",
  ];
  for (let i = 1; i <= count; i++) {
    posts.push({
      id: i,
      title: `${randomChoice(postTitles)} #${i}`,
      body: randomChoice(bodies),
      tags: randomSample(tags, 3),
      reactions: { likes: randomInt(5, 2000), dislikes: randomInt(0, 200) },
      views: randomInt(50, 15000),
      userId: randomInt(1, userCount),
    });
  }
  return posts;
}

function generateProducts(count) {
  const products = [];
  const categories = [
    "electronics",
    "fashion",
    "home",
    "beauty",
    "books",
    "sports",
    "kitchen",
    "toys",
  ];
  const brands = [
    "Samsung",
    "Sony",
    "Mi",
    "Bajaj",
    "Tata",
    "Royal Enfield",
    "Ambrane",
    "Boat",
    "Fastrack",
  ];
  for (let i = 1; i <= count; i++) {
    const category = randomChoice(categories);
    products.push({
      id: i,
      title: `${
        category.charAt(0).toUpperCase() + category.slice(1)
      } Item ${i}`,
      description: `Indian market product ${i} — category: ${category}`,
      category,
      price: parseFloat((Math.random() * 900 + 100).toFixed(2)),
      discountPercentage: parseFloat((Math.random() * 25).toFixed(2)),
      rating: parseFloat((Math.random() * 4 + 1).toFixed(1)),
      stock: randomInt(0, 500),
      brand: randomChoice(brands),
      tags: [category, "india", "popular"],
      thumbnail: `https://dummyjson.com/image/i/products/${i}/thumbnail.jpg`,
      images: [`https://dummyjson.com/image/i/products/${i}/1.jpg`],
    });
  }
  return products;
}

function generateTodos(count, userCount) {
  const todos = [];
  const tasks = [
    "Pay Bills",
    "Attend Meeting",
    "Study for Exam",
    "Exercise",
    "Buy Groceries",
    "Call Family",
    "Cleaning",
    "Visit Doctor",
    "Plan Trip",
    "Read Book",
  ];
  for (let i = 1; i <= count; i++) {
    todos.push({
      id: i,
      todo: `${randomChoice(tasks)} - #${i}`,
      completed: Math.random() > 0.5,
      userId: randomInt(1, userCount),
    });
  }
  return todos;
}

// ---------- Create Files (500+ docs each) ----------

const userCount = 500;
const postCount = 500;
const productCount = 500;
const todoCount = 500;

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
