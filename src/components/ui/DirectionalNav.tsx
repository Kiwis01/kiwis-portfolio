import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Section } from "@/App";

interface DirectionalNavProps {
  currentSection: Section;
  onNavigate: (section: Section) => void;
}

export function DirectionalNav({ currentSection, onNavigate }: DirectionalNavProps) {
  const navItems: { direction: string; icon: React.ElementType; section: Section; label: string; position: string; }[] = [
    {
      direction: "left",
      icon: ArrowLeft,
      section: "experience",
      label: "Experience",
      position: "left-4 top-1/2 -translate-y-1/2"
    },
    {
      direction: "right", 
      icon: ArrowRight,
      section: "projects",
      label: "Projects",
      position: "right-4 top-1/2 -translate-y-1/2"
    },
    {
      direction: "down",
      icon: ArrowDown,
      section: "contact",
      label: "Contact",
      position: "bottom-4 left-1/2 -translate-x-1/2"
    }
  ];

  // Get the return arrow for current section
  const getReturnArrow = () => {
    switch (currentSection) {
      case "experience":
        return {
          icon: ArrowRight,
          position: "right-4 top-1/2 -translate-y-1/2",
          label: "Back to Home"
        };
      case "projects":
        return {
          icon: ArrowLeft,
          position: "left-4 top-1/2 -translate-y-1/2",
          label: "Back to Home"
        };
      case "contact":
        return {
          icon: ArrowUp,
          position: "top-4 left-1/2 -translate-x-1/2",
          label: "Back to Home"
        };
      default:
        return null;
    }
  };

  const returnArrow = getReturnArrow();

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Return arrow */}
      {returnArrow && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`absolute ${returnArrow.position} pointer-events-auto`}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigate("main")}
            className="bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
            title={returnArrow.label}
          >
            <returnArrow.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </Button>
        </motion.div>
      )}

      {/* Directional arrows - only show on main section */}
      {currentSection === "main" && (
        <>
          {navItems.map((item) => (
            <motion.div
              key={item.section}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className={`absolute ${item.position} pointer-events-auto`}
            >
              <Button
                variant="outline"
                size="icon"
                onClick={() => onNavigate(item.section)}
                className="bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                title={item.label}
              >
                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </Button>
            </motion.div>
          ))}

          {/* Direction labels */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute left-20 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            <div className="text-sm text-muted-foreground bg-background/60 backdrop-blur-sm rounded px-2 py-1">
              Swipe left for Experience
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute right-20 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            <div className="text-sm text-muted-foreground bg-background/60 backdrop-blur-sm rounded px-2 py-1">
              Swipe right for Projects
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <div className="text-sm text-muted-foreground bg-background/60 backdrop-blur-sm rounded px-2 py-1">
              Swipe down for Contact
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}