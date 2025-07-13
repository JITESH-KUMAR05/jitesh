/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Jitesh Kumar",
  title: "Hi all, I'm Jitesh",
  subTitle: emoji(
    "Aspiring AI/ML Engineer 🚀 currently learning Machine Learning, Deep Learning, and Generative AI. Building intelligent solutions and gaining hands-on experience in data science applications."
  ),
  resumeLink:
    "https://drive.google.com/file/d/1Y86W6N22A205FUbUsT15dC42c6sOWzwm/view?usp=sharing",
  displayGreeting: true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/JITESH-KUMAR05",
  linkedin: "https://www.linkedin.com/in/jiteshkumar05/",
  gmail: "jitesh.kumar05official@gmail.com",
  // gitlab: "https://gitlab.com/jitesh-kumar05",
  stackoverflow: "https://stackoverflow.com/users/23510505/jitesh-kumar",
  // Instagram, Twitter and Kaggle are also supported in the links!
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true
};

// Skills Section

const skillsSection = {
  title: "What I do",
  subTitle: "ASPIRING AI/ML ENGINEER WITH PASSION FOR INTELLIGENT SYSTEMS",
  skills: [
    emoji("🤖 Learning Machine Learning algorithms and model development"),
    emoji("🧠 Exploring Deep Learning networks using TensorFlow and PyTorch"),
    emoji("🎯 Building projects with Generative AI and Large Language Models"),
    emoji(
      "📊 Developing skills in data preprocessing and statistical analysis"
    ),
    emoji("🚀 Creating AI-powered applications and intelligent systems"),
    emoji("🔍 Working on Computer Vision projects using OpenCV")
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {
      skillName: "Python",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "TensorFlow",
      fontAwesomeClassname: "fas fa-brain"
    },
    {
      skillName: "PyTorch",
      fontAwesomeClassname: "fas fa-fire"
    },
    {
      skillName: "Scikit-learn",
      fontAwesomeClassname: "fas fa-cogs"
    },
    {
      skillName: "Jupyter",
      fontAwesomeClassname: "fas fa-book"
    },
    {
      skillName: "Pandas",
      fontAwesomeClassname: "fas fa-table"
    },
    {
      skillName: "NumPy",
      fontAwesomeClassname: "fas fa-calculator"
    },
    {
      skillName: "OpenCV",
      fontAwesomeClassname: "fas fa-eye"
    },
    {
      skillName: "JavaScript",
      fontAwesomeClassname: "fab fa-js"
    },
    {
      skillName: "React",
      fontAwesomeClassname: "fab fa-react"
    },
    {
      skillName: "Node.js",
      fontAwesomeClassname: "fab fa-node"
    },
    {
      skillName: "MongoDB",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "Git",
      fontAwesomeClassname: "fab fa-git-alt"
    }
  ],
  display: true 
};


const educationInfo = {
  display: true, 
  schools: [
    {
      schoolName: "Anurag University",
      logo: require("./assets/images/Anurag.png"),
      subHeader: "Bachelor of Technology in Information Technology",
      duration: "August 2023 - June 2027",
      desc: "Currently pursuing my degree with focus on web development and AI/ML. Active participant in university's technical community.",
      descBullets: [
        "Selected for GeeksforGeeks Anurag Student Chapter Technical Team",
        "Vice President of IEEE SSIT (Society on Social Implications of Technology) Chapter",
        "Regular participant in hackathons and technical competitions",
        "Balancing academics with hands-on project development and community leadership"
      ]
    }
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "DSA", //Insert stack or technology you have experience in
      progressPercentage: "90%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Python",
      progressPercentage: "90%"
    },
    {
      Stack: "Machine Learning",
      progressPercentage: "75%"
    },
    {
      Stack: "Deep Learning",
      progressPercentage: "25%"
    },
    {
      Stack: "Gen AI",
      progressPercentage: "15%"
    }
  ],
  displayCodersrank: false 
};

// Work experience section

const workExperiences = {
  display: true, 
  experience: [
    {
      role: "Full Stack Developer (Freelance)",
      company: "Travel Together",
      companylogo: require("./assets/images/travelTogetherLogo.png"),
      date: "2024",
      desc: "Developed an AI-driven travel application offering personalized itineraries based on user preferences and travel styles.",
      descBullets: [
        "Built secure authentication and data management using Firebase",
        "Designed and implemented an interactive admin dashboard for content management",
        "Collaborated with client to implement iterative improvements based on feedback",
        "GitHub: https://github.com/BhanuPrakashChintal/TravelTogether"
      ]
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: false // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Projects",
  subtitle: "SOME STARTUPS AND COMPANIES THAT I HELPED TO CREATE THEIR TECH",
  projects: [
    {
      image: require("./assets/images/studentperformance.png"),
      projectName: "Student Performance Prediction Web App",
      projectDesc:
        "Built a full-stack ML web app to predict student math scores (88%+ accuracy) using Flask and scikit-learn with a modern responsive UI Explored both Azure and AWS to deploy containerized ML workflows, gaining experience with scalable MLOps deployment and cloud DevOps fundamentals.",
      footerLink: [
        {
          name: "Visit Github",
          url: "https://github.com/JITESH-KUMAR05/studentperformance"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: require("./assets/images/heritage-hues.png"),
      projectName: "Heritage Hues",
      projectDesc:
        "Cross-platform tourism app showcasing Indian heritage, built using FlutterFlow and Supabase. Aggregated geolocation-based heritage data and integrated a searchable market module.",
      footerLink: [
        {
          name: "Visit Github",
          url: "https://github.com/JITESH-KUMAR05/Heritage-Hues"
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Achievements And Certifications 🏆 "),
  subtitle:
    "Achievements, Certifications, Award Letters and Some Cool Stuff that I have done !",

  achievementsCards: [
    {
      title: "AI Builders Lab Participant",
      subtitle:
        "AI Builders Lab ( Bootcamp ) by Google for Developers and Hack2skill",
      image: require("./assets/images/AI-builders-Hack2skill-Certificate.png"),
      imageAlt: "AI Builders Lab Logo",
      footerLink: [
        {
          name: "Certification",
          url: "https://drive.google.com/file/d/1jUMldmdfMkEkVWUv2Sxu8iyk0N86dHMn/view"
        }
      ]
    },
    {
      title: "Google AI Essentials",
      subtitle: "Google AI Essentials Certificate by Google on Coursera",
      image: require("./assets/images/google-ai-essentials.png"),
      imageAlt: "Google AI Essentials Logo",
      footerLink: [
        {
          name: "Verify Here",
          url: "https://www.coursera.org/account/accomplishments/verify/WQC7KJL8DXM8"
        }
      ]
    },

    {
      title: "Infosys Springboard : Data Structures",
      subtitle: "Completed Data Structures and Algorithms Course by Infosys",
      image: require("./assets/images/infosysDS.jpg"),
      imageAlt: "Infosys Springboard Logo",
      footerLink: [
        {
          name: "Certification",
          url: "https://drive.google.com/file/d/1B2bH7xngFKmZZFfbkDaEkzRCanXWgLh4/view"
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: emoji(
    "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅"
  ),

  talks: [
    {
      title: "AI builders Lab",
      subtitle: "AI Builders Lab by Google for Developers and Hack2skill",
      slides_url: "https://bit.ly/jitesh",
      event_url: "https://www.facebook.com/"
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",

  // Please Provide with Your Podcast embeded Link
  podcast: [""],
  display: false // Set false to hide this section, defaults to true
};

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume",

  // Please Provide with Your Podcast embeded Link
  display: true // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Discuss a project or just want to say hi? My Inbox is open for all.",
  email_address: "jitesh.kumar05official@gmail.com"
};

// Twitter Section

const twitterDetails = {
  userName: "twitter", //Replace "twitter" with your twitter username without @
  display: false // Set true to display this section, defaults to false
};

const isHireable = true; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};
