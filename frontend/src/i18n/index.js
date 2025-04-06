import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      about: 'About',
      podcast: 'Podcast',
      books: 'Books',
      news: 'News',
      researches: 'Researches',
      publications: 'Publications',
      reports: 'Reports',
      contact: 'Contact Us',
      
      // Books page
      loading: 'Loading more books...',
      noMoreBooks: 'No more books to load',
      noBooksFound: 'No books found matching your search',
      searchBooks: 'Search books by title, author, or category...',
      author: 'Author',
      category: 'Category',
      publishYear: 'Publication Year',
      pages: 'Number of Pages',
      description: 'Description',
      readBook: 'Read Book',
      downloadBook: 'Download Book',
      downloadingBook: 'Downloading book...',
      readOnline: 'Read Online',
      
      // Organization Info
      organizationName: 'Sindokht Human Rights Center',
      vision: 'Vision',
      visionText: 'Sindokht is an independent, non-governmental research and advocacy center dedicated to promoting critical thinking, affirming the dignity of victims, challenging impunity, and fostering responsive institutions in Afghanistan.',
      orgName: 'Sindokht',
      orgDescription: 'Empowering women through education and advocacy',
      
      // Objectives
      objectives: 'Objectives',
      objective1: 'First Objective',
      objective2: 'Second Objective',
      objective1Text: 'Developing and implementing comprehensive educational and informational strategies aimed at increasing public and specialized awareness regarding human rights values to preserve and institutionalize these values in Afghan society and address the human rights situation of vulnerable groups of women and LGBTQ+ individuals for a society based on social justice.',
      objective2Text: 'Designing, implementing, and evaluating comprehensive support and advocacy programs aimed at protecting fundamental human rights principles and enhancing the protection of human rights for vulnerable groups, especially women and sexual and gender minorities in Afghanistan.',
      
      // Activities
      activities: 'Activities',
      research: 'Scientific and Interdisciplinary Research',
      awareness: 'Awareness and Critical Thinking',
      education: 'Educational Programs for Human Rights Culture',
      publication: 'Production and Publication of Scientific Resources',
      documentation: 'Documentation and Knowledge Development',
      
      // Work Areas
      workAreas: 'Work Areas',
      advocacy: 'Advocacy',
      training: 'Training and Workshops',
      justice: 'Justice and Accountability',
      communities: 'Working with Affected Communities',
      advocacyText: 'Centering the Voices of Those Most Affected: We actively engage with civil society, human rights defenders, and survivor and victim communities as essential partners in our collective advocacy efforts.',
      trainingText: 'We prioritize awareness-building and training through sessions, workshops, and formal briefings focused on Afghanistan\'s situation.',
      justiceText: 'Ending impunity for genocide, war crimes, crimes against humanity, and ethnic cleansing is a fundamental pillar of Sindokht\'s work.',
      communitiesText: 'In the current context of Afghanistan, the voices of those most affected by atrocities, particularly women, girls, and marginalized communities, are often silenced in key negotiations and international discussions.',
      
      // What We Do
      whatWeDo: 'What We Do',
      promoteHumanRights: 'Promote Human Rights Values in Afghanistan',
      combatImpunity: 'Combat the Culture of Impunity',
      supportVoices: 'Support Voices of Victims and Witnesses',
      preservingWomensVoices: 'Preserving Women\'s Voices and Narratives',
      
      // How We Work
      howWeWork: 'How We Work',
      advancingKnowledge: 'Advancing Knowledge on Grave Human Rights Violations',
      standingWithVictims: 'Standing with Victims in the Pursuit of Justice',
      engagingMechanisms: 'Engaging International Mechanisms for Protection',
      documentingAtrocities: 'Documenting Atrocities to Support Justice',
      upliftingWomensStories: 'Uplifting Women\'s Stories Amid Repression',
      buildingAwareness: 'Building Awareness Through Education',
      
      // Structure
      structure: 'Structure',
      boardOfAdvisors: 'Board of Advisors',
      executiveDirectors: 'Executive Directors',
      committees: 'Committees',
      financialCommittee: 'Financial and Administrative Committee',
      communicationsCommittee: 'Communications and Coordination Committee',
      specializedCommittees: 'Specialized Committees',
      womenStudiesCommittee: 'Women Studies Research Committee',
      persianCultureCommittee: 'Persian-Speaking Culture and History Research Committee',
      educationCommittee: 'Public Education and Awareness Committee',
      
      // Common
      readMore: 'Read More',
      learnMore: 'Learn More',
      contactUs: 'Contact Us'
    }
  },
  fa: {
    translation: {
      // Navigation
      home: 'صفحه اصلی',
      about: 'درباره ما',
      podcast: 'پادکست',
      books: 'کتاب‌ها',
      news: 'اخبار',
      researches: 'پژوهش‌ها',
      publications: 'نشریه‌ها',
      reports: 'گزارش‌ها',
      contact: 'ارتباط با ما',
      
      // Books page
      loading: 'در حال بارگذاری کتاب‌های بیشتر...',
      noMoreBooks: 'کتاب دیگری برای نمایش وجود ندارد',
      noBooksFound: 'کتابی مطابق با جستجوی شما یافت نشد',
      searchBooks: 'جستجوی کتاب بر اساس عنوان، نویسنده یا دسته‌بندی...',
      author: 'نویسنده',
      category: 'دسته‌بندی',
      publishYear: 'سال انتشار',
      pages: 'تعداد صفحات',
      description: 'توضیحات',
      readBook: 'خواندن کتاب',
      downloadBook: 'دانلود کتاب',
      downloadingBook: 'در حال دانلود کتاب...',
      readOnline: 'خواندن آنلاین',
      
      // Organization Info
      organizationName: 'کانون حقوق بشری سیندخت',
      vision: 'دورنما',
      visionText: 'کانون حقوق بشری سیندخت یک نهاد مستقل و پژوهش‌کده تخصصی است که با هدف ترویج تفکر انتقادی، آگاهی‌بخشی و ایجاد فضایی برای گفت‌وگو و فعالیت پژوهشی در حوزه‌های مختلف علوم حقوق بشری، اجتماعی، فرهنگی، سیاسی، اقتصادی، فلسفی و تاریخی با تمرکز ویژه بر مسائل زنان و هویت، تمدن و تاریخ فارسی‌زبانان فعالیت می‌کند.',
      orgName: 'سیندخت',
      orgDescription: 'توانمندسازی زنان از طریق آموزش و حمایت',
      
      // Objectives
      objectives: 'اهداف',
      objective1: 'هدف اول',
      objective2: 'هدف دوم',
      objective1Text: 'تدوین و اجرای راهبردهای جامع آموزشی و اطلاع‌رسانی با هدف افزایش آگاهی عمومی و تخصصی در رابطه به ارزش‌های حقوق بشری به منظور حفظ و نهادینه شدن این ارزش‌ها در جامعه افغانستان و رسیدگی به وضعیت حقوق بشری گروهای آسیب‌پذیر زنان و دگرباشان برای داشتن جامعه مبتنی بر عدالت اجتماعی.',
      objective2Text: 'طراحی، اجرا، و ارزیابی برنامه‌های جامع حمایتی و دادخواهانه با هدف پاسداری از اصول اساسی حقوق بشر و ارتقای حمایت از حقوق انسانی گروه‌های در معرض آسیب، به‌ویژه زنان و اقلیت‌های جنسی و جنسیتی در افغانستان.',
      
      // Activities
      activities: 'فعالیت‌ها',
      research: 'پژوهش‌های علمی و میان‌رشته‌ای',
      awareness: 'آگاهی‌بخشی و تقویت تفکر انتقادی',
      education: 'برنامه‌های آموزشی برای نهادینه‌سازی فرهنگ حقوق بشری',
      publication: 'تولید و انتشار منابع علمی',
      documentation: 'مستندسازی و رشد دانش',
      
      // Work Areas
      workAreas: 'حوزه‌های کاری',
      advocacy: 'دادخواهی',
      training: 'آموزش و کارگاه‌ها',
      justice: 'عدالت و پاسخگویی',
      communities: 'کار با جوامع متاثر',
      advocacyText: 'تمرکز بر صدای افراد متاثر: ما فعالانه با جامعه مدنی، مدافعان حقوق بشر و جوامع بازماندگان و قربانیان به عنوان شرکای اصلی در تلاش‌های جمعی دادخواهی همکاری می‌کنیم.',
      trainingText: 'ما اولویت را به آگاهی‌سازی و آموزش از طریق جلسات، کارگاه‌ها و جلسات رسمی با تمرکز بر وضعیت افغانستان می‌دهیم.',
      justiceText: 'پایان دادن به مصونیت از مجازات برای نسل‌کشی، جنایات جنگی، جنایات علیه بشریت و پاکسازی قومی یکی از ارکان اساسی کار سیندخت است.',
      communitiesText: 'در شرایط کنونی افغانستان، صدای افرادی که بیشترین تأثیر را از جنایات می‌پذیرند، به‌ویژه زنان، دختران و جوامع به حاشیه رانده شده، اغلب در مذاکرات کلیدی و گفتگوهای بین‌المللی خاموش می‌شود.',
      
      // What We Do
      whatWeDo: 'فعالیت‌های ما',
      promoteHumanRights: 'ترویج ارزش‌های حقوق بشری در افغانستان',
      combatImpunity: 'مبارزه با فرهنگ معافیت',
      supportVoices: 'حمایت از صدای قربانیان و شاهدان',
      preservingWomensVoices: 'حفظ و ثبت روایت‌های زنان',
      
      // How We Work
      howWeWork: 'روش کار ما',
      advancingKnowledge: 'پیشبرد دانش در مورد نقض حقوق بشر',
      standingWithVictims: 'ایستادگی با قربانیان در مسیر عدالت',
      engagingMechanisms: 'تعامل با مکانیزم‌های بین‌المللی حمایتی',
      documentingAtrocities: 'مستندسازی جنایات برای حمایت از عدالت',
      upliftingWomensStories: 'برجسته‌سازی داستان‌های زنان در میان سرکوب',
      buildingAwareness: 'ایجاد آگاهی از طریق آموزش',
      
      // Structure
      structure: 'ساختار و تشکیلات',
      boardOfAdvisors: 'هیئت مشاورین',
      executiveDirectors: 'هیئت اجرایی',
      committees: 'کمیته‌ها',
      financialCommittee: 'کمیته مالی و اداری',
      communicationsCommittee: 'کمیته ارتباطات و هماهنگی',
      specializedCommittees: 'کمیته‌های تخصصی',
      womenStudiesCommittee: 'کمیته پژوهش و مطالعات حوزه زنان',
      persianCultureCommittee: 'کمیته پژوهش و مطالعات تاریخ و تمدن فارسی‌زبانان',
      educationCommittee: 'کمیته آموزش و ارتقای آگاهی عمومی',
      
      // Common
      readMore: 'بیشتر بخوانید',
      learnMore: 'اطلاعات بیشتر',
      contactUs: 'تماس با ما'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fa', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 