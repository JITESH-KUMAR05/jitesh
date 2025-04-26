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
    "A passionate Full Stack Software Developer 🚀 having an experience of building Web and Mobile applications with JavaScript / Reactjs / Nodejs  and some other cool libraries and frameworks."
  ),
  resumeLink:
    "https://drive.google.com/file/d/1nDWHL-f22mXHv2fQ3VbZXcOLOkM0CZR5/view?usp=sharing", // Set to empty to hide the button
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/JITESH-KUMAR05",
  linkedin: "https://www.linkedin.com/in/jiteshkumar05/",
  gmail: "jitesh.kumar05official@gmail.com",
  // gitlab: "https://gitlab.com/jitesh-kumar05",
  // facebook: "https://www.facebook.com/saad.pasta7",
  stackoverflow: "https://stackoverflow.com/users/23510505/jitesh-kumar",
  // Instagram, Twitter and Kaggle are also supported in the links!
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "What I do",
  subTitle: "FULL STACK DEVELOPER WITH PASSION FOR AI/ML AND DATA SCIENCE",
  skills: [
    emoji(
      "⚡ Develop highly interactive Front end / User Interfaces for your web and mobile applications"
    ),
    emoji("⚡ Building robust backend systems with Node.js and Express"),
    emoji(
      "⚡ Integration of third party services such as Firebase and payment gateways"
    ),
    emoji(
      "⚡ Machine Learning models and Data Analysis using Python and its libraries"
    )
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {
      skillName: "html-5",
      fontAwesomeClassname: "fab fa-html5"
    },
    {
      skillName: "css3",
      fontAwesomeClassname: "fab fa-css3-alt"
    },
    {
      skillName: "JavaScript",
      fontAwesomeClassname: "fab fa-js"
    },
    {
      skillName: "reactjs",
      fontAwesomeClassname: "fab fa-react"
    },
    {
      skillName: "nodejs",
      fontAwesomeClassname: "fab fa-node"
    },
    {
      skillName: "npm",
      fontAwesomeClassname: "fab fa-npm"
    },
    {
      skillName: "sql-database",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "mongodb",
      fontAwesomeClassname: "fas fa-leaf"
    },
    {
      skillName: "firebase",
      fontAwesomeClassname: "fas fa-fire"
    },
    {
      skillName: "python",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "tensorflow",
      fontAwesomeClassname: "fas fa-brain"
    },
    {
      skillName: "machine-learning",
      fontAwesomeClassname: "fas fa-cogs"
    },
    {
      skillName: "git",
      fontAwesomeClassname: "fab fa-git-alt"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    // {
    //   schoolName: "Anurag University",
    //   logo: require("./assets/images/harvardLogo.png"),
    //   subHeader: "Master of Science in Computer Science",
    //   duration: "September 2017 - April 2019",
    //   desc: "Participated in the research of XXX and published 3 papers.",
    //   descBullets: [
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    //   ]
    // },
    {
      schoolName: "Anurag University",
      logo: require("./assets/images/Anurag.png"),
      subHeader: "Bachelor of Technology in Information Technology",
      duration: "August 2023 - May 2027",
      desc: "Currently pursuing my degree with focus on web development and AI/ML. Active participant in university's technical community.",
      descBullets: [
        "First-year student selected for GeeksforGeeks Anurag Student Chapter Technical Team",
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
      Stack: "Frontend/Design", //Insert stack or technology you have experience in
      progressPercentage: "80%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Backend",
      progressPercentage: "60%"
    },
    {
      Stack: "Programming",
      progressPercentage: "90%"
    }
  ],
  displayCodersrank: false // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
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
  title: "Big Projects",
  subtitle: "SOME STARTUPS AND COMPANIES THAT I HELPED TO CREATE THEIR TECH",
  projects: [
    {
      image: require("./assets/images/saayaHealthLogo.webp"),
      projectName: "Saayahealth",
      projectDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      footerLink: [
        {
          name: "Visit Website",
          url: "http://saayahealth.com/"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: require("./assets/images/nextuLogo.webp"),
      projectName: "Nextu",
      projectDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      footerLink: [
        {
          name: "Visit Website",
          url: "http://nextu.se/"
        }
      ]
    }
  ],
  display: false // Set false to hide this section, defaults to true
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
      title: "Postman API Fundamentals Student Expert",
      subtitle: "Postman API Fundamentals Student Expert by Postman",
      image: require("./assets/images/postmanStudent.png"),
      imageAlt: "Postman Student Expert Logo",
      footerLink: [
        {
          name: "Verified Badge",
          url: "https://badgr.com/public/assertions/ft-hbYhHTT2QNgqADYxrZw"
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
  podcast: [
    "https://anchor.fm/codevcast/embed/episodes/DevStory---Saad-Pasta-from-Karachi--Pakistan-e9givv/a-a15itvo"
  ],
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
