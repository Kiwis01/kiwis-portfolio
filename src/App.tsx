import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SwipeHandler } from "@/components/ui/SwipeHandler";
import { DirectionalNav } from "@/components/ui/DirectionalNav";
import  MainSection  from "@/components/ui/MainSection";
import { ExperienceSection } from "@/components/ui/ExperienceSection";
import { ProjectsSkillsSection } from "@/components/ui/ProjectsSkillsSection";
import { ContactSection } from "@/components/ui/ContactSection";

type Section = "main" | "experience" | "projects" | "contact";

export default function App() {
  const [currentSection, setCurrentSection] = useState<Section>("main");

  const handleSwipe = (direction: "left" | "right" | "up" | "down") => {
    switch (direction) {
      case "left":
        if (currentSection === "main") {
          setCurrentSection("experience");
        } else if (currentSection === "projects") {
          // Swipe left from projects goes back to main
          setCurrentSection("main");
        }
        break;
      case "right":
        if (currentSection === "main") {
          setCurrentSection("projects");
        } else if (currentSection === "experience") {
          // Swipe right from experience goes back to main
          setCurrentSection("main");
        }
        break;
      case "down":
        if (currentSection === "main") {
          setCurrentSection("contact");
        }
        break;
      case "up":
        if (currentSection === "contact") {
          // Swipe up from contact goes back to main
          setCurrentSection("main");
        } else if (currentSection !== "main") {
          // Any other section can swipe up to go to main
          setCurrentSection("main");
        }
        break;
    }
  };

  const handleNavigate = (section: Section) => {
    setCurrentSection(section);
  };

  const getSlideVariants = (section: Section) => {
    const variants = {
      main: {
        initial: { x: 0, y: 0, opacity: 0 },
        animate: { x: 0, y: 0, opacity: 1 },
        exit: { 
          opacity: 0 
        }
      },
      experience: {
        initial: { x: "-100%", y: 0, opacity: 0 },
        animate: { x: 0, y: 0, opacity: 1 },
        exit: { x: "-100%", y: 0, opacity: 0 }
      },
      projects: {
        initial: { x: "100%", y: 0, opacity: 0 },
        animate: { x: 0, y: 0, opacity: 1 },
        exit: { x: "100%", y: 0, opacity: 0 }
      },
      contact: {
        initial: { x: 0, y: "100%", opacity: 0 },
        animate: { x: 0, y: 0, opacity: 1 },
        exit: { x: 0, y: "100%", opacity: 0 }
      }
    };
    return variants[section];
  };

  const renderSection = (section: Section) => {
    switch (section) {
      case "main":
        return <MainSection />;
      case "experience":
        return <ExperienceSection />;
      case "projects":
        return <ProjectsSkillsSection />;
      case "contact":
        return <ContactSection />;
      default:
        return <MainSection />;
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-background">
      <SwipeHandler onSwipe={handleSwipe}>
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              variants={getSlideVariants(currentSection)}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              className="absolute inset-0 w-full h-full overflow-auto"
            >
              {renderSection(currentSection)}
            </motion.div>
          </AnimatePresence>
          
          <DirectionalNav 
            currentSection={currentSection} 
            onNavigate={handleNavigate}
          />
        </div>
      </SwipeHandler>
    </div>
  );
}