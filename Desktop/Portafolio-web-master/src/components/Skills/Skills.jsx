import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCode, 
  faServer, 
  faTools,
  faChartLine,
  faSearch,
  faFlask,
  faTerminal,
  faBug,
  faGlobe,
  faDatabase as faDatabaseSolid,
  faLaptopCode,
  faShieldVirus,
  faCodeBranch,
  faNetworkWired,
  faShieldHalved,
  faDatabase,
  faChartPie
} from '@fortawesome/free-solid-svg-icons';
import { 
  faReact, 
  faVuejs,
  faNodeJs, 
  faPython,
  faDocker,
  faLinux,
  faGithub,
  faRProject,
  faMicrosoft,
  faJs
} from '@fortawesome/free-brands-svg-icons';
import { motion, useInView } from 'framer-motion';
import './Skills.css';

// Particle component for the background effect
const Particle = ({ size, left, animationDuration, delay }) => {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animationDuration: `${animationDuration}s`,
    animationDelay: `${delay}s`,
  };

  return <div className="particle" style={style}></div>;
};

const Skills = () => {

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
const [controls] = useState({ start: () => {} });
  const [particles, setParticles] = useState([]);

  // Initialize particles
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      
      // Create particles
      const newParticles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        size: Math.random() * 10 + 5,
        left: Math.random() * 100,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      }));
      
      setParticles(newParticles);
    }
  }, [controls, isInView]);

  // Datos de habilidades actualizados
  const skillsData = [
    {
      title: 'Análisis de Datos',
      icon: faChartLine,
      color: '#4DABF7',
      skills: [
        { name: 'R', level: 75, icon: faRProject },
        { name: 'Matplotlib', level: 80, icon: faChartPie },
        { name: 'Pandas', level: 82, icon: faDatabase },
        { name: 'SQL', level: 78, icon: faDatabaseSolid },
        { name: 'Visualización', level: 80, icon: faChartLine },
      ]
    },
    {
      title: 'Desarrollo',
      icon: faLaptopCode,
      color: '#37B24D',
      skills: [
        { name: 'Node.js', level: 85, icon: faNodeJs },
        { name: 'Express', level: 82, icon: faServer },
        { name: 'Flask', level: 78, icon: faFlask },
        { name: 'Vue.js', level: 80, icon: faVuejs },
        { name: 'React', level: 85, icon: faReact },
      ]
    },
    {
      title: 'Scripting',
      icon: faTerminal,
      color: '#2B8A3E',
      skills: [
        { name: 'Python', level: 85, icon: faPython },
        { name: 'JavaScript', level: 90, icon: faJs },
        { name: 'Bash/Shell', level: 80, icon: faTerminal },
        { name: 'Web Scraping', level: 75, icon: faCodeBranch },
      ]
    },
    {
      title: 'Ciberseguridad',
      icon: faShieldVirus,
      color: '#F59F00',
      skills: [
        { name: 'Pentesting', level: 80, icon: faShieldHalved },
        { name: 'Análisis de Vulnerabilidades', level: 85, icon: faSearch },
        { name: 'OSINT', level: 80, icon: faGlobe },
        { name: 'Burp Suite', level: 78, icon: faBug },
        { name: 'SQLMap', level: 75, icon: faNetworkWired },
      ]
    },
    {
      title: 'Herramientas',
      icon: faTools,
      color: '#E64980',
      skills: [
        { name: 'Git & GitHub', level: 90, icon: faGithub },
        { name: 'Linux', level: 85, icon: faLinux },
        { name: 'Docker', level: 80, icon: faDocker },
        { name: 'VSCode', level: 90, icon: faCode },
        { name: 'Windows', level: 85, icon: faMicrosoft },
      ]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  

  return (
    <section id="skills" className="skills-section">
      <div className="bg-gradient"></div>
      <div className="particles">
        {particles.map((particle) => (
          <Particle
            key={particle.id}
            size={particle.size}
            left={particle.left}
            animationDuration={particle.duration}
            delay={particle.delay}
          />
        ))}
      </div>
      
      <div className="skills-container">
        <motion.div 
          className="section-title w-full text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-2">Habilidades</h2>
          <div className="w-20 h-1 bg-accent rounded-full"></div>
        </motion.div>
        
        <motion.div 
          className="skills-grid" 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skillsData.map((category, index) => (
            <motion.div
              key={category.title}
              id={`category-${index}`}
              className="skill-card-wrapper relative"
              variants={itemVariants}
            >
              <div className="skill-card">
                <div className="skill-header">
                  <div className="skill-icon">
                    <FontAwesomeIcon icon={category.icon} />
                  </div>
                  <h3 className="skill-title">{category.title}</h3>
                </div>
                <div className="skill-body">
                  <div className="grid grid-cols-2 gap-4 p-2">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <div className="w-8 h-8 flex items-center justify-center rounded-md bg-accent/10 text-accent mr-3">
                          <FontAwesomeIcon icon={skill.icon} className="text-lg" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 notranslate">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent/5 rounded-full filter blur-3xl opacity-70"></div>
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/5 rounded-full filter blur-3xl opacity-70"></div>
      
      {/* Animated background grid */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]"></div>
      </div>
    </section>
  );
};

export default Skills;
