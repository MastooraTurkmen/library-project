require('dotenv').config();
const mongoose = require('mongoose');
const News = require('../models/News');

const newsData = [
  {
    title: "New Persian Literature Festival Announced",
    content: [
      "In an exciting development for literature enthusiasts, the International Persian Literature Festival has been announced for the upcoming fall season. This groundbreaking event will bring together authors, poets, and scholars from around the world to celebrate the rich tradition of Persian literature.",
      "The festival, scheduled to take place in multiple cities, will feature readings from contemporary Persian authors, workshops on traditional poetry forms, and panel discussions on the future of Persian literature in the digital age. Special attention will be given to emerging voices who are bridging traditional and modern storytelling techniques.",
      "\"We're witnessing a renaissance in Persian literature,\" says festival organizer Dr. Sara Ahmadi. \"Young writers are finding innovative ways to honor our literary heritage while addressing contemporary themes and global issues.\"",
      "The event will also showcase rare manuscripts and first editions from private collections, offering attendees a unique glimpse into the evolution of Persian literary arts over the centuries. Interactive workshops will provide hands-on experience with traditional calligraphy and bookbinding techniques.",
      "Registration for the festival will open next month, with early bird discounts available for students and educators. The organizers expect over 5,000 attendees from more than 30 countries, making it one of the largest celebrations of Persian literature ever organized."
    ],
    imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3",
    author: "Maryam Hosseini",
    summary: "The International Persian Literature Festival announces its inaugural event, bringing together global literary figures to celebrate Persian literature."
  },
  {
    title: "Digital Archive of Ancient Persian Manuscripts Launches",
    content: [
      "A groundbreaking digital initiative has made thousands of ancient Persian manuscripts accessible to the public for the first time. The Digital Persian Library Project, a collaboration between major universities and cultural institutions, has successfully digitized over 10,000 manuscripts dating from the 9th to the 19th centuries.",
      "This massive undertaking represents a significant step forward in preserving and sharing Persian cultural heritage. The digital archive includes rare copies of classic works of poetry, scientific treatises, historical chronicles, and illuminated manuscripts, many of which have never been widely available to the public before.",
      "The project utilizes cutting-edge imaging technology to capture even the finest details of these ancient texts, including margin notes and illustrations. Advanced search capabilities allow researchers and enthusiasts to explore the collection by topic, time period, author, or keyword.",
      "\"This is a game-changer for Persian studies,\" explains Dr. Mohammad Karimi, the project's technical director. \"Scholars from anywhere in the world can now access these precious documents without the need for travel or special permissions. It democratizes access to our literary heritage.\"",
      "The digital archive also includes interactive features such as transcriptions, translations, and expert commentaries, making these historical texts more accessible to modern readers. Future phases of the project will incorporate machine learning to assist in translation and analysis of the texts."
    ],
    imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3",
    author: "Ali Tehrani",
    summary: "A new digital archive makes thousands of ancient Persian manuscripts freely accessible online, revolutionizing access to Persian literary heritage."
  },
  {
    title: "Contemporary Persian Poetry Gains Global Recognition",
    content: [
      "Persian poetry is experiencing a remarkable surge in international recognition, with several contemporary Persian poets receiving prestigious literary awards and their works being translated into multiple languages. This renaissance in Persian poetry is bridging cultural gaps and bringing new perspectives to global literature.",
      "Leading this wave is poet Fariba Naderi, whose collection 'Echoes of Tomorrow' has been shortlisted for the International Poetry Prize. Her work, which combines traditional Persian poetic forms with modern themes, has been praised for its innovative approach to addressing contemporary social issues.",
      "\"Poetry has always been central to Persian culture,\" Naderi explains. \"What we're seeing now is a beautiful dialogue between our rich poetic tradition and the modern global experience. Our voices are reaching audiences who might never have encountered Persian poetry before.\"",
      "The rise in popularity has led to increased demand for translation workshops and cultural exchange programs. Several major universities have expanded their Persian literature departments to include contemporary poetry studies.",
      "Digital platforms and social media have played a crucial role in this renaissance, with young poets using Instagram and Twitter to share their work. This digital presence has helped create a vibrant online community of poetry enthusiasts and has made Persian poetry more accessible to younger generations worldwide."
    ],
    imageUrl: "https://images.unsplash.com/photo-1533669955142-6a73332af4db?ixlib=rb-4.0.3",
    author: "Reza Karimi",
    summary: "Contemporary Persian poets are gaining international recognition as their works reach global audiences through translations and digital platforms."
  }
];

const seedNews = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sindokht', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await News.deleteMany({}); // Clear existing news
    await News.insertMany(newsData);

    console.log('News data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding news data:', error);
    process.exit(1);
  }
};

seedNews(); 