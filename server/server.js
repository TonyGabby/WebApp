const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Data
const products = [
  {
    id: 1,
    title: 'Engineering Textbooks Bundle',
    price: 15000,
    originalPrice: 25000,
    image: '/product-textbooks.jpg',
    seller: 'Chidi O.',
    rating: 4.8,
    reviews: 12,
    location: 'Bello Hostel',
    category: 'Textbooks',
    badge: 'Hot',
    description: 'Complete set of engineering textbooks for 300-500 level students. Includes materials for mechanical, electrical, and civil engineering courses. All books are in excellent condition with minimal highlighting.',
    condition: 'Like New',
    contact: 'chidi.okafor@unn.edu.ng',
    phone: '+234 801 234 5678',
    postedDate: '2024-03-01',
    views: 156
  },
  {
    id: 2,
    title: 'MacBook Pro 2020 - Used',
    price: 350000,
    originalPrice: 450000,
    image: '/product-laptop.jpg',
    seller: 'Amara N.',
    rating: 4.9,
    reviews: 8,
    location: 'Off-campus',
    category: 'Electronics',
    badge: 'Verified',
    description: 'MacBook Pro 13-inch 2020 model with M1 chip. 8GB RAM, 256GB SSD. Battery health at 92%. Comes with original charger and box. Perfect for coding, design work, and student projects.',
    condition: 'Good',
    contact: 'amara.nwosu@unn.edu.ng',
    phone: '+234 802 345 6789',
    postedDate: '2024-03-03',
    views: 234
  },
  {
    id: 3,
    title: 'iPhone 12 - Good Condition',
    price: 180000,
    originalPrice: 220000,
    image: '/product-phone.jpg',
    seller: 'Emeka I.',
    rating: 4.7,
    reviews: 15,
    location: 'Akpabio Hostel',
    category: 'Electronics',
    badge: null,
    description: 'iPhone 12 128GB in black. Screen has minor scratches but fully functional. Battery health at 85%. Face ID works perfectly. Comes with charger and case.',
    condition: 'Fair',
    contact: 'emeka.ibrahim@unn.edu.ng',
    phone: '+234 803 456 7890',
    postedDate: '2024-03-02',
    views: 189
  },
  {
    id: 4,
    title: 'Scientific Calculator + Notes',
    price: 8000,
    originalPrice: 12000,
    image: '/product-calculator.jpg',
    seller: 'Ngozi A.',
    rating: 5.0,
    reviews: 6,
    location: 'Library Area',
    category: 'Textbooks',
    badge: 'New',
    description: 'Casio fx-991ES PLUS scientific calculator with comprehensive study notes for MTH 101, 102, and 201. Notes include solved past questions and formula sheets.',
    condition: 'New',
    contact: 'ngozi.adeyemi@unn.edu.ng',
    phone: '+234 804 567 8901',
    postedDate: '2024-03-04',
    views: 98
  },
  {
    id: 5,
    title: 'Physics Lab Coat & Goggles',
    price: 3500,
    originalPrice: 5000,
    image: '/product-textbooks.jpg',
    seller: 'Oluwaseun T.',
    rating: 4.5,
    reviews: 4,
    location: 'Faculty of Science',
    category: 'Hostel Items',
    badge: null,
    description: 'White lab coat size L and safety goggles. Used for one semester only. Perfect for physics, chemistry, and biology practicals.',
    condition: 'Good',
    contact: 'oluwaseun.t@unn.edu.ng',
    phone: '+234 805 678 9012',
    postedDate: '2024-03-05',
    views: 45
  },
  {
    id: 6,
    title: 'Wireless Mouse & Keyboard',
    price: 12000,
    originalPrice: 18000,
    image: '/product-laptop.jpg',
    seller: 'Fatima K.',
    rating: 4.6,
    reviews: 9,
    location: 'Eni-Njoku Hostel',
    category: 'Electronics',
    badge: null,
    description: 'Logitech wireless mouse and keyboard combo. USB receiver included. Battery life is excellent. Perfect for hostel use and assignments.',
    condition: 'Like New',
    contact: 'fatima.k@unn.edu.ng',
    phone: '+234 806 789 0123',
    postedDate: '2024-03-04',
    views: 112
  }
];

const jobs = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    company: 'TechStart Nigeria',
    logo: '💻',
    location: 'Remote / Enugu',
    type: 'Internship',
    salary: '₦50,000 - ₦80,000/month',
    posted: '2 days ago',
    description: 'We are looking for a passionate frontend developer intern to join our growing team. You will work on real projects using React, TypeScript, and modern web technologies.',
    fullDescription: `TechStart Nigeria is a fast-growing tech company focused on building innovative solutions for the African market.

Responsibilities:
- Develop and maintain web applications using React
- Collaborate with designers to implement UI/UX designs
- Write clean, maintainable code
- Participate in code reviews
- Learn and adapt to new technologies

Requirements:
- Currently studying Computer Science or related field
- Basic knowledge of HTML, CSS, and JavaScript
- Familiarity with React is a plus
- Strong problem-solving skills
- Good communication skills

Benefits:
- Mentorship from senior developers
- Flexible working hours
- Opportunity for full-time employment
- Certificate of completion`,
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Git'],
    applicants: 24,
    featured: true,
    deadline: '2024-03-30',
    experience: 'Entry Level',
    applyLink: 'mailto:careers@techstart.ng'
  },
  {
    id: 2,
    title: 'Campus Brand Ambassador',
    company: 'Jumia Nigeria',
    logo: '🛒',
    location: 'UNN Campus',
    type: 'Part-time',
    salary: '₦30,000 - ₦50,000/month',
    posted: '1 week ago',
    description: 'Represent Jumia on campus and earn while you study. Great opportunity for marketing and business students.',
    fullDescription: `Jumia Nigeria is looking for enthusiastic students to represent our brand on the UNN campus.

Responsibilities:
- Promote Jumia products and services on campus
- Organize brand awareness events
- Refer students to use Jumia app
- Provide feedback on student preferences
- Create engaging social media content

Requirements:
- Must be a current UNN student
- Active on social media
- Good communication and networking skills
- Self-motivated and target-driven

Benefits:
- Monthly stipend plus commissions
- Free Jumia deliveries
- Networking opportunities
- Certificate of recognition`,
    skills: ['Marketing', 'Communication', 'Social Media', 'Sales'],
    applicants: 56,
    featured: false,
    deadline: '2024-03-25',
    experience: 'No Experience',
    applyLink: 'mailto:ambassadors@jumia.com.ng'
  },
  {
    id: 3,
    title: 'Graphic Designer (Freelance)',
    company: 'Creative Studio',
    logo: '🎨',
    location: 'Remote',
    type: 'Freelance',
    salary: '₦5,000 - ₦15,000/project',
    posted: '3 days ago',
    description: 'Create stunning designs for social media, flyers, and branding materials. Work on your own schedule.',
    fullDescription: `Creative Studio is seeking talented freelance graphic designers for various projects.

Projects Include:
- Social media graphics
- Event flyers and posters
- Logo designs
- Brand identity materials
- Presentation designs

Requirements:
- Proficiency in Adobe Photoshop and Illustrator
- Creative portfolio
- Ability to meet deadlines
- Good communication skills

Payment:
- Per project basis
- Fast payment upon completion
- Opportunity for long-term collaboration`,
    skills: ['Photoshop', 'Illustrator', 'Canva', 'Figma'],
    applicants: 18,
    featured: false,
    deadline: 'Rolling',
    experience: 'Intermediate',
    applyLink: 'mailto:jobs@creativestudio.ng'
  },
  {
    id: 4,
    title: 'Data Analyst Intern',
    company: 'UNN Research Center',
    logo: '📊',
    location: 'Nsukka Campus',
    type: 'Internship',
    salary: '₦40,000/month',
    posted: '5 days ago',
    description: 'Work with university researchers on data collection and analysis projects. Great for statistics and math students.',
    fullDescription: `The UNN Research Center is offering internship opportunities for data analysis.

Responsibilities:
- Collect and clean research data
- Perform statistical analysis
- Create data visualizations
- Assist in report writing
- Maintain research databases

Requirements:
- Background in Statistics, Mathematics, or related field
- Proficiency in Excel
- Knowledge of Python or R is a plus
- Attention to detail

Benefits:
- Hands-on research experience
- Publication opportunities
- Recommendation letters
- Stipend provided`,
    skills: ['Excel', 'Python', 'Statistics', 'Data Visualization'],
    applicants: 32,
    featured: true,
    deadline: '2024-03-28',
    experience: 'Entry Level',
    applyLink: 'mailto:research@unn.edu.ng'
  },
  {
    id: 5,
    title: 'Content Writer',
    company: 'Campus Blog NG',
    logo: '✍️',
    location: 'Remote',
    type: 'Part-time',
    salary: '₦500 - ₦1,000/article',
    posted: '1 day ago',
    description: 'Write engaging articles about campus life, student tips, and educational content.',
    fullDescription: `Campus Blog NG is looking for student writers to create engaging content.

Topics:
- Campus life and experiences
- Study tips and academic advice
- Career guidance
- Student entrepreneurship
- Technology for students

Requirements:
- Good writing skills
- Ability to research topics
- Original content only
- Meet submission deadlines

Payment:
- Per article basis
- Payment based on article length and quality
- Bonuses for viral content`,
    skills: ['Writing', 'Research', 'SEO', 'Creativity'],
    applicants: 12,
    featured: false,
    deadline: 'Rolling',
    experience: 'No Experience',
    applyLink: 'mailto:write@campusblog.ng'
  }
];

const events = [
  {
    id: 1,
    title: 'UNN DevFest 2024',
    description: 'The biggest student developer conference featuring workshops, hackathons, and networking.',
    fullDescription: `UNN DevFest 2024 is the premier tech event for students at the University of Nigeria, Nsukka.

Event Schedule:
Day 1 (March 15):
- 9:00 AM: Opening Ceremony
- 10:30 AM: Keynote: "The Future of Tech in Africa"
- 1:00 PM: Lunch & Networking
- 2:30 PM: Workshop: Building with React
- 5:00 PM: Hackathon Kickoff

Day 2 (March 16):
- 9:00 AM: Workshop: Introduction to AI/ML
- 11:00 AM: Panel: Career Paths in Tech
- 2:00 PM: Hackathon Continues
- 6:00 PM: Project Submissions

Day 3 (March 17):
- 10:00 AM: Project Presentations
- 1:00 PM: Awards Ceremony
- 3:00 PM: Closing & Networking

Prizes:
- 1st Place: ₦500,000 + Internship opportunities
- 2nd Place: ₦300,000
- 3rd Place: ₦150,000

What to Bring:
- Laptop and charger
- Student ID
- Notebook and pen
- Enthusiasm to learn!`,
    image: '/event-hackathon.jpg',
    date: 'March 15-17, 2024',
    time: '9:00 AM - 6:00 PM',
    location: 'ICT Centre, UNN',
    category: 'Hackathons',
    attendees: 500,
    price: 'Free',
    featured: true,
    organizer: 'Google DSC UNN',
    organizerContact: 'dsc@unn.edu.ng',
    registrationLink: 'https://devfest.unn.edu.ng',
    speakers: ['Dr. Adaobi Nwosu', 'Chinedu Eze', 'Fatima Bello']
  },
  {
    id: 2,
    title: 'Lion\'s Night Concert',
    description: 'Annual music festival featuring top Nigerian artists and campus talents.',
    fullDescription: `Get ready for the biggest night on campus! Lion's Night Concert brings together the best of Nigerian music and UNN talent.

Performing Artists:
- Burna Boy (Headliner)
- Rema
- Tems
- Campus Artist Showcase

Event Details:
- Red Carpet: 5:00 PM
- Concert Start: 6:00 PM
- After Party: 11:00 PM

Ticket Categories:
- Regular: ₦1,000
- VIP: ₦3,000 (Includes front row seats and refreshment)
- VVIP: ₦5,000 (Backstage access + meet & greet)

What to Expect:
- Live performances
- Dance competitions
- Food and drinks
- Photo booths
- Merchandise sales

Note: Student ID required at entry.`,
    image: '/event-concert.jpg',
    date: 'March 25, 2024',
    time: '6:00 PM - 11:00 PM',
    location: 'Freedom Square',
    category: 'Concerts',
    attendees: 2000,
    price: '₦1,000',
    featured: true,
    organizer: 'SUG Entertainment',
    organizerContact: 'entertainment@sug.unn.edu.ng',
    registrationLink: 'https://tickets.unn.edu.ng/lionsnight',
    speakers: []
  },
  {
    id: 3,
    title: 'Career Development Workshop',
    description: 'Learn resume building, interview skills, and career planning from industry experts.',
    fullDescription: `Prepare for your future career with our comprehensive workshop series.

Workshop Modules:
1. Resume Building (10:00 AM - 11:30 AM)
   - Crafting the perfect CV
   - LinkedIn optimization
   - Portfolio development

2. Interview Skills (11:45 AM - 1:00 PM)
   - Common interview questions
   - Behavioral interviews
   - Technical interview prep

3. Career Planning (2:00 PM - 3:30 PM)
   - Setting career goals
   - Industry insights
   - Networking strategies

Facilitators:
- HR Manager, Access Bank
- Tech Lead, Andela Nigeria
- Career Counselor, UNN

Materials Provided:
- Resume templates
- Interview prep guide
- Career planning workbook

Refreshments will be served.`,
    image: '/event-workshop.jpg',
    date: 'March 10, 2024',
    time: '10:00 AM - 2:00 PM',
    location: 'Business School Auditorium',
    category: 'Workshops',
    attendees: 150,
    price: 'Free',
    featured: false,
    organizer: 'Career Services',
    organizerContact: 'career@unn.edu.ng',
    registrationLink: 'https://career.unn.edu.ng/workshop',
    speakers: ['Mrs. Nkechi Okafor', 'Mr. James Adeyemi']
  },
  {
    id: 4,
    title: 'Inter-Faculty Sports Festival',
    description: 'Compete in various sports and represent your faculty.',
    fullDescription: `The annual Inter-Faculty Sports Festival is here! Represent your faculty and compete for glory.

Sports Categories:
- Football (Male & Female)
- Basketball
- Volleyball
- Athletics (100m, 200m, 400m, relay)
- Table Tennis
- Chess

Schedule:
- Opening Ceremony: April 5, 8:00 AM
- Group Stage: April 5-7
- Quarter Finals: April 8
- Semi Finals: April 9
- Finals & Closing: April 10

Prizes:
- Overall Champions Trophy
- Individual medals
- Cash prizes for winners

Registration:
- Register through your faculty sports representative
- Deadline: March 30, 2024
- Registration fee: ₦500 per participant`,
    image: '/event-hackathon.jpg',
    date: 'April 5-10, 2024',
    time: '8:00 AM - 6:00 PM',
    location: 'UNN Sports Complex',
    category: 'Sports',
    attendees: 800,
    price: '₦500',
    featured: false,
    organizer: 'Sports Council',
    organizerContact: 'sports@unn.edu.ng',
    registrationLink: 'https://sports.unn.edu.ng/register',
    speakers: []
  }
];

// API Routes

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// Get all jobs
app.get('/api/jobs', (req, res) => {
  res.json(jobs);
});

// Get single job
app.get('/api/jobs/:id', (req, res) => {
  const job = jobs.find(j => j.id === parseInt(req.params.id));
  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }
  res.json(job);
});

// Get all events
app.get('/api/events', (req, res) => {
  res.json(events);
});

// Get single event
app.get('/api/events/:id', (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }
  res.json(event);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CampusConnect API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
