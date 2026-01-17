const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "../src/data");

// ---------- India-centric expanded lists ----------

// 100+ Indian first names (male + female, modern & traditional)
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
  "Vihaan",
  "Reyansh",
  "Advaith",
  "Dhruv",
  "Ayaan",
  "Shaurya",
  "Atharv",
  "Om",
  "Pranav",
  "Vedant",
  "Ansh",
  "Darsh",
  "Kiaan",
  "Laksh",
  "Aarush",
  "Rudra",
  "Varun",
  "Harsh",
  "Gaurav",
  "Kunal",
  "Deepak",
  "Vishal",
  "Sanjay",
  "Pravin",
  "Manoj",
  "Suresh",
  "Sandeep",
  "Yogesh",
  "Pankaj",
  "Ashish",
  "Rajesh",
  "Mahesh",
  "Anushka",
  "Aadhya",
  "Pari",
  "Myra",
  "Sara",
  "Kiara",
  "Aarya",
  "Nandini",
  "Roshni",
  "Sakshi",
];

// 100+ Indian last names (surnames / family names)
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
  "Agarwal",
  "Bansal",
  "Jain",
  "Arora",
  "Khanna",
  "Kohli",
  "Bajaj",
  "Chauhan",
  "Pillai",
  "Desai",
  "Kulkarni",
  "More",
  "Jadhav",
  "Kamble",
  "Yadav",
  "Thakur",
  "Rathore",
  "Rajput",
  "Banerjee",
  "Sen",
  "Mitra",
  "Sarkar",
  "Dutt",
  "Saha",
  "Barman",
  "Roy",
  "Dey",
  "Sengupta",
  "Paul",
  "Chakraborty",
  "Biswas",
  "Mazumdar",
  "Kundu",
  "Ghoshal",
  "Bhowmik",
  "Kar",
];

// 100+ major Indian cities
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
  "Prayagraj",
  "Moradabad",
  "Gwalior",
  "Siliguri",
  "Durgapur",
  "Surat",
  "Varanasi",
  "Raipur",
  "Kota",
  "Mangalore",
  "Jammu",
  "Srinagar",
  "Panaji",
  "Gangtok",
  "Imphal",
  "Shillong",
  "Aizawl",
  "Kohima",
  "Itanagar",
  "Cuttack",
  "Puri",
  "Guntur",
  "Warangal",
  "Nellore",
  "Kurnool",
  "Tirunelveli",
  "Salem",
  "Erode",
  "Vellore",
  "Thanjavur",
  "Dindigul",
  "Muzaffarpur",
  "Bikaner",
  "Ajmer",
  "Aligarh",
  "Gorakhpur",
  "Bareilly",
  "Jhansi",
  "Mathura",
  "Haridwar",
  "Rishikesh",
  "Nainital",
  "Mussoorie",
  "Darjeeling",
  "Asansol",
  "Kharagpur",
  "Haldia",
  "Rourkela",
  "Berhampur",
  "Sambalpur",
  "Aurangabad",
  "Solapur",
];

// All Indian states & union territories
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

// 50+ Indian universities
const universities = [
  "IIT Bombay",
  "IIT Delhi",
  "IIT Madras",
  "IISc Bangalore",
  "University of Delhi",
  "JNU",
  "BHU",
  "AMU",
  "Anna University",
  "Jamia Millia Islamia",
  "VIT",
  "Amrita",
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
  "Manipal University",
  "Symbiosis",
  "TISS Mumbai",
  "BITS Pilani",
  "Christ University",
  "NIT Trichy",
  "NIT Warangal",
  "Jadavpur University",
  "GITAM",
  "UPES",
  "LPU",
  "SRM University",
  "KIIT",
  "Amity University",
  "Mysore University",
  "Gujarat University",
  "Andhra University",
  "MGU Kerala",
  "JNTU Hyderabad",
  "DTU Delhi",
  "NSUT Delhi",
  "Shiv Nadar University",
  "Ashoka University",
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
  "UX",
  "DevOps",
  "Field Services",
  "Performance",
  "Audit",
  "Planning",
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

// Product categories & brands
const productCategories = [
  "electronics",
  "fashion",
  "home",
  "beauty",
  "books",
  "sports",
  "kitchen",
  "toys",
  "automotive",
  "health",
  "jewelry",
  "furniture",
  "groceries",
];

const indianBrands = [
  "Samsung",
  "Sony",
  "Mi",
  "Bajaj",
  "Tata",
  "Royal Enfield",
  "Ambrane",
  "Boat",
  "Fastrack",
  "Titan",
  "Tanishq",
  "Godrej",
  "Havells",
  "Prestige",
  "Zebronics",
  "boAt",
  "Noise",
  "Croma",
  "Videocon",
  "Micromax",
  "Lava",
  "Intex",
  "iBall",
  "Amul",
  "Parle",
  "Britannia",
  "Haldiram's",
  "ITC",
  "Dabur",
  "Patanjali",
  "Himalaya",
  "Emami",
  "Marico",
  "Asian Paints",
  "Berger",
  "Mahindra",
  "Hero",
  "TVS",
  "Maruti",
  "Hyundai",
  "Reliance",
  "Jio",
  "Airtel",
];

// Street names
const streetNames = [
  "MG Road",
  "Brigade Road",
  "Commercial Street",
  "Park Street",
  "Residency Road",
  "Linking Road",
  "Main Road",
  "Station Road",
  "Church Road",
  "Market Road",
  "Ring Road",
  "Outer Ring Road",
  "Inner Ring Road",
  "Gandhi Road",
  "Nehru Road",
  "Ambedkar Road",
  "Patel Road",
  "Anna Salai",
  "Mount Road",
  "Rajpath",
  "Marine Drive",
  "Bandra Kurla Complex",
  "Connaught Place",
  "Sector",
];

// Industries
const industries = [
  "Information Technology",
  "E-commerce",
  "Finance",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Retail",
  "Hospitality",
  "Real Estate",
  "Automotive",
  "Telecommunications",
  "Energy",
  "Agriculture",
  "Pharmaceuticals",
  "Textiles",
  "Construction",
  "Media",
  "Entertainment",
  "Logistics",
  "Consulting",
];

// Order statuses
const orderStatuses = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

// Comment sentiments
const commentBodies = [
  "Great article! Very informative and well-written.",
  "Thanks for sharing this knowledge.",
  "This helped me solve my problem. Appreciate it!",
  "Could you elaborate more on this topic?",
  "Interesting perspective, but I have a different view.",
  "Excellent explanation. Looking forward to more content.",
  "Not entirely convinced, but good effort.",
  "This is exactly what I was looking for!",
  "Well researched and presented.",
  "Some points could be improved, but overall good.",
];

// Quote categories
const quoteCategories = [
  "motivation",
  "wisdom",
  "life",
  "success",
  "education",
  "peace",
];

// Indian personalities for quotes
const personalities = [
  "Mahatma Gandhi",
  "Swami Vivekananda",
  "APJ Abdul Kalam",
  "Rabindranath Tagore",
  "Chanakya",
  "Aryabhata",
  "Mother Teresa",
  "Sardar Patel",
  "Bhagat Singh",
  "Subhash Chandra Bose",
  "JRD Tata",
  "Ratan Tata",
  "Narayana Murthy",
  "Kiran Mazumdar-Shaw",
  "CV Raman",
  "Homi Bhabha",
  "Vikram Sarabhai",
];

const inspirationalQuotes = [
  "Be the change you wish to see in the world.",
  "The best way to find yourself is to lose yourself in the service of others.",
  "Live as if you were to die tomorrow. Learn as if you were to live forever.",
  "Arise, awake, and stop not until the goal is reached.",
  "You have to dream before your dreams can come true.",
  "Excellence is a continuous process and not an accident.",
  "The roots of education are bitter, but the fruit is sweet.",
  "In a gentle way, you can shake the world.",
  "Strength does not come from physical capacity. It comes from an indomitable will.",
  "Do not wait for leaders; do it alone, person to person.",
];

// Helper functions
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomSample = (arr, n) =>
  [...arr].sort(() => 0.5 - Math.random()).slice(0, n);
const randomBoolean = () => Math.random() > 0.5;
const randomDate = (start, end) => {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString().split("T")[0];
};

// ---------- Generators ----------

function generateUsers(count) {
  const users = [];
  for (let i = 1; i <= count; i++) {
    const fn = randomChoice(firstNames);
    const ln = randomChoice(lastNames);
    const gender = randomChoice(["male", "female", "other"]);
    users.push({
      id: i,
      firstName: fn,
      lastName: ln,
      age: randomInt(18, 65),
      gender,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@example.in`,
      phone: `+91 ${randomInt(60000, 99999)}-${randomInt(1000, 9999)}`,
      username: `${fn.toLowerCase()}${i}`,
      birthDate: randomDate(new Date(1958, 0, 1), new Date(2005, 11, 31)),
      image: `https://randomuser.me/api/portraits/${
        gender === "male" ? "men" : "women"
      }/${(i % 99) + 1}.jpg`,
      address: {
        address: `${randomInt(10, 999)} ${randomChoice(streetNames)}`,
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
  const topics = [
    "React",
    "Angular",
    "Vue",
    "Node.js",
    "Python",
    "Java",
    "Go",
    "Rust",
    "TypeScript",
    "JavaScript",
    "Cloud",
    "DevOps",
    "AI",
    "ML",
    "Blockchain",
    "Cybersecurity",
    "Mobile Dev",
    "Web Dev",
    "Data Science",
    "Design",
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
    "tutorial",
    "guide",
    "tips",
    "best-practices",
    "architecture",
    "performance",
  ];

  for (let i = 1; i <= count; i++) {
    const topic = randomChoice(topics);
    posts.push({
      id: i,
      title: `${topic} Tutorial ${i}: ${randomChoice([
        "Basics",
        "Advanced",
        "Tips",
        "Guide",
        "Best Practices",
      ])}`,
      body: `Comprehensive guide on ${topic.toLowerCase()} covering ${randomChoice(
        [
          "fundamentals",
          "advanced concepts",
          "real-world examples",
          "industry practices",
          "optimization techniques",
        ]
      )}. Written for Indian developers.`,
      tags: randomSample(tags, randomInt(2, 5)),
      reactions: {
        likes: randomInt(5, 5000),
        dislikes: randomInt(0, 500),
      },
      views: randomInt(100, 50000),
      userId: randomInt(1, userCount),
      createdAt: randomDate(new Date(2020, 0, 1), new Date()),
    });
  }
  return posts;
}

function generateProducts(count) {
  const products = [];

  for (let i = 1; i <= count; i++) {
    const category = randomChoice(productCategories);
    const brand = randomChoice(indianBrands);
    const price = parseFloat((Math.random() * 9000 + 100).toFixed(2));
    const discount = parseFloat((Math.random() * 40).toFixed(2));

    products.push({
      id: i,
      title: `${brand} ${
        category.charAt(0).toUpperCase() + category.slice(1)
      } Item ${i}`,
      description: `High-quality ${category} product from ${brand}. Perfect for Indian market. Item #${i}.`,
      category,
      price,
      discountPercentage: discount,
      rating: parseFloat((Math.random() * 4 + 1).toFixed(1)),
      stock: randomInt(0, 1000),
      brand,
      tags: [
        category,
        "india",
        brand.toLowerCase(),
        randomChoice(["new", "popular", "trending", "bestseller"]),
      ],
      thumbnail: `https://placehold.co/400x300/png?text=${category}-${i}`,
      images: [
        `https://placehold.co/600x400/png?text=${category}-${i}-1`,
        `https://placehold.co/600x400/png?text=${category}-${i}-2`,
      ],
      warranty: randomChoice(["1 year", "2 years", "6 months", "No warranty"]),
      returnPolicy: randomChoice([
        "7 days",
        "15 days",
        "30 days",
        "No returns",
      ]),
    });
  }
  return products;
}

function generateTodos(count, userCount) {
  const todos = [];
  const tasks = [
    "Pay electricity bill",
    "Attend team meeting",
    "Study for exam",
    "Do yoga",
    "Buy groceries",
    "Call family",
    "Clean house",
    "Visit doctor",
    "Plan vacation",
    "Read book",
    "Prepare presentation",
    "Review code",
    "Update resume",
    "Book flight tickets",
    "Pay rent",
    "Service vehicle",
    "Attend webinar",
    "Complete assignment",
    "Buy gifts",
    "Schedule dentist appointment",
  ];

  for (let i = 1; i <= count; i++) {
    todos.push({
      id: i,
      todo: `${randomChoice(tasks)} - #${i}`,
      completed: randomBoolean(),
      userId: randomInt(1, userCount),
      priority: randomChoice(["low", "medium", "high"]),
      dueDate: randomDate(new Date(), new Date(2026, 11, 31)),
    });
  }
  return todos;
}

function generateComments(count, postCount, userCount) {
  const comments = [];

  for (let i = 1; i <= count; i++) {
    comments.push({
      id: i,
      body: randomChoice(commentBodies),
      postId: randomInt(1, postCount),
      userId: randomInt(1, userCount),
      likes: randomInt(0, 1000),
      createdAt: randomDate(new Date(2020, 0, 1), new Date()),
    });
  }
  return comments;
}

function generateOrders(count, userCount, productCount) {
  const orders = [];

  for (let i = 1; i <= count; i++) {
    const numItems = randomInt(1, 5);
    const items = [];
    let total = 0;

    for (let j = 0; j < numItems; j++) {
      const productId = randomInt(1, productCount);
      const quantity = randomInt(1, 3);
      const price = parseFloat((Math.random() * 5000 + 100).toFixed(2));
      items.push({
        productId,
        quantity,
        price,
      });
      total += price * quantity;
    }

    orders.push({
      id: i,
      userId: randomInt(1, userCount),
      items,
      total: parseFloat(total.toFixed(2)),
      status: randomChoice(orderStatuses),
      paymentMethod: randomChoice([
        "UPI",
        "Credit Card",
        "Debit Card",
        "COD",
        "Net Banking",
      ]),
      shippingAddress: {
        address: `${randomInt(10, 999)} ${randomChoice(streetNames)}`,
        city: randomChoice(cities),
        state: randomChoice(states),
        postalCode: `${randomInt(110000, 799999)}`,
      },
      orderDate: randomDate(new Date(2023, 0, 1), new Date()),
      deliveryDate: randomDate(new Date(), new Date(2026, 11, 31)),
    });
  }
  return orders;
}

function generateCompanies(count) {
  const companies = [];

  for (let i = 1; i <= count; i++) {
    const name = `${randomChoice(lastNames)} ${randomChoice(departments)}`;
    const industry = randomChoice(industries);

    companies.push({
      id: i,
      name: `${name} Pvt Ltd`,
      industry,
      gstNumber: `${randomInt(10, 35)}${String.fromCharCode(
        65 + randomInt(0, 25)
      )}${randomChoice(lastNames).substring(0, 5).toUpperCase()}${randomInt(
        1000,
        9999
      )}${String.fromCharCode(65 + randomInt(0, 25))}${randomInt(
        1,
        9
      )}Z${randomInt(1, 9)}`,
      pan: `${String.fromCharCode(65 + randomInt(0, 25))}${String.fromCharCode(
        65 + randomInt(0, 25)
      )}${String.fromCharCode(65 + randomInt(0, 25))}${String.fromCharCode(
        65 + randomInt(0, 25)
      )}${String.fromCharCode(65 + randomInt(0, 25))}${randomInt(
        1000,
        9999
      )}${String.fromCharCode(65 + randomInt(0, 25))}`,
      email: `contact@${name.toLowerCase().replace(/\s+/g, "")}.in`,
      phone: `+91 ${randomInt(60000, 99999)}-${randomInt(1000, 9999)}`,
      address: {
        address: `${randomInt(10, 999)} ${randomChoice(streetNames)}`,
        city: randomChoice(cities),
        state: randomChoice(states),
        postalCode: `${randomInt(110000, 799999)}`,
      },
      founded: randomInt(1950, 2023),
      employees: randomInt(10, 50000),
      revenue: `₹${randomInt(1, 1000)} Cr`,
      website: `https://${name.toLowerCase().replace(/\s+/g, "")}.in`,
    });
  }
  return companies;
}

function generateQuotes(count) {
  const quotes = [];

  for (let i = 1; i <= count; i++) {
    quotes.push({
      id: i,
      quote:
        i <= inspirationalQuotes.length
          ? inspirationalQuotes[i - 1]
          : `${randomChoice(inspirationalQuotes)} - Variation ${i}`,
      author: randomChoice(personalities),
      category: randomChoice(quoteCategories),
      likes: randomInt(10, 10000),
      shares: randomInt(5, 5000),
    });
  }
  return quotes;
}

// ---------- Create Files (1000+ docs each) ----------

const COUNT = 1000; // Generate 1000 documents for each category

console.log("🚀 Generating data for DevTools Mock API...\n");

const users = generateUsers(COUNT);
console.log(`✅ Generated ${users.length} users`);

const posts = generatePosts(COUNT, COUNT);
console.log(`✅ Generated ${posts.length} posts`);

const products = generateProducts(COUNT);
console.log(`✅ Generated ${products.length} products`);

const todos = generateTodos(COUNT, COUNT);
console.log(`✅ Generated ${todos.length} todos`);

const comments = generateComments(COUNT, COUNT, COUNT);
console.log(`✅ Generated ${comments.length} comments`);

const orders = generateOrders(COUNT, COUNT, COUNT);
console.log(`✅ Generated ${orders.length} orders`);

const companies = generateCompanies(COUNT);
console.log(`✅ Generated ${companies.length} companies`);

const quotes = generateQuotes(COUNT);
console.log(`✅ Generated ${quotes.length} quotes`);

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Write all data files
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
fs.writeFileSync(
  path.join(DATA_DIR, "comments.json"),
  JSON.stringify(comments, null, 2)
);
fs.writeFileSync(
  path.join(DATA_DIR, "orders.json"),
  JSON.stringify(orders, null, 2)
);
fs.writeFileSync(
  path.join(DATA_DIR, "companies.json"),
  JSON.stringify(companies, null, 2)
);
fs.writeFileSync(
  path.join(DATA_DIR, "quotes.json"),
  JSON.stringify(quotes, null, 2)
);

console.log("\n✨ Data generation complete! All files written to src/data/");
console.log(`📊 Total documents generated: ${COUNT * 8}`);
