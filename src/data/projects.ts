export type ProjectType = {
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies?: string[];
  githubUrl?: string;
  pdfLink?: string;
  liveUrl?: string;
};
export const projects = [
    //3D
    {
      slug: '3d-reconstruction',
      title: '3D Reconstruction from 2D Images',
      description: 'This project reconstructs high-fidelity 3D models from 2D images using deep learning. It employs PIFuHD for human modeling and PyTorch3D for mesh deformation, enabling applications in gaming, AR/VR, and animation',
      imageUrl: '/images/3D.png',
      pdfLink: '/3D.pdf',
      technologies: [
        'PyTorch',
        'TensorFlow',
        'PIFuHD',
        'PyTorch3D',
        'Open3D',
        'Blender',
        'CNN',
        'Computer Vision',
        'Machine Learning',
        'Python'
      ]
    },
    //Honeyword
    {
      slug: 'Honeyword',
      title: 'Honeywords based Password Management System',
      description: 'Developed a secure password management system leveraging the concept of honeywords (decoy passwords stored alongside real) ones—to enhance security through increased variability. Implemented an auxiliary server to monitor activity and raise alerts, boosting system credibility by 30%. Incorporated advanced techniques such as take-a-tail and chaffing for generating random passwords and enhancing anonymity, alongside standard hashing practices.',
      imageUrl: '/images/HoneywordPMS.png',
      githubUrl: 'https://github.com/nandhana31/Honeyword-Password-',
      technologies: [
        'Password Hashing',
        'Cybersecurity Tools'
      ]
    },
    //E-commerce
    {
      slug: 'E-commerce',
      title: 'E-commerce Product Review System based on Sentiment Analysis',
      description: 'Developed an E-commerce product review system using sentiment analysis to classify customer reviews as positive or negative through supervised binary classification and text mining techniques. Collected and pre-processed large datasets of customer feedback to extract meaningful insights, supporting E-commerce operators in improving business strategies and customer engagement.',
      imageUrl: '/images/e-commerce.jpg',
      pdfLink: '/e-commerce.pdf',
      technologies: [
        'Sentiment Analysis',
        'Text Mining',
        'Data Preprocessing',
        'Supervised Learning'
      ]
    },
    //SVCE BOT
    {
      slug: 'SVCE Bot',
      title: 'SVCE Bot',
      description: 'Collaborated with a team to develop a university chatbot using Dialogflow API for NLP and vooice recogniyion, handling class schedules, fees, and events-related queries.',
      imageUrl: '/images/svce chat bot.jpg',
      githubUrl: 'https://www.svce.ac.in/',
      technologies: [
        'Flutter',
        'Dialogflow API',
        'Voice Recognition',
        'Natural Language Processing'
      ]
    },
    //DavisBase
    {
      slug: 'DavisBase',
      title: 'DavisBase',
      description: 'This project involves the creation and management of a database system for storing and querying structured data. Built using SQL and Python, it provides a robust solution for handling large datasets efficiently.',
      imageUrl: '/images/davisbase.jpeg',
      githubUrl: 'https://github.com/AdiC03/DavisDatabase',
      technologies: [
        'SQL',
        'Python',
        'Database Management',
        'Data Analysis'
      ]
    },
    //FinCity
    {
      slug: 'FinCity',
      title: 'FinCity',
      description: 'Built FinCity Architect, a gamified personal finance app where users manage a virtual city based on financial choices. Integrated news sentiment analysis and a financial chatbot to promote smart spending.',
      imageUrl: '/images/FinCity.jpg',
      githubUrl: 'https://github.com/nandhana31/FinCity',
      pdfLink: '/FinCity_Presentation.pdf',
      liveUrl: 'https://fin-city-theta.vercel.app/',
      technologies: [
        'React.js',
        'CSS',
        'JavaScript',
        'Node.js',
        'Material UI',
        'Flask'
      ]
    },
    //Diabetes Prediction
    {
      slug: 'Diabetes Prediction',
      title: 'Diabetes Prediction',
      description: 'Developed a machine learning model to predict the likelihood of Type 2 Diabetes using diagnostic data. Applied data preprocessing, model selection, and evaluation techniques to achieve high prediction accuracy and support early risk identification.',
      imageUrl: '/images/DiabetesPrediction.png',
      githubUrl: 'https://github.com/nandhana31/DiabetesPrediction',
      technologies: [
        'Python',
        'Data Analysis',
        'Machine Learning'
      ]
    },
    {
      slug: 'Resume Analyzer',
      title: 'Resume Analyzer',
      description: 'Developed an intelligent Resume Analyzer using NLP to extract, match, and score skills between resumes and job descriptions. Utilized Python-based libraries for text extraction, analysis, and comparison.',
      imageUrl: '/images/ResumeAnalyzer.png',
      githubUrl: 'https://github.com/nandhana31/Resume-Analyzer.png',
      liveUrl: 'https://resume-analyser-frontend.vercel.app/',
      technologies: [
        'Python',
        'spaCy',
        'TF-IDF',
        'NLP',
      ]
    }
  // Add more projects similarly
  ];
  