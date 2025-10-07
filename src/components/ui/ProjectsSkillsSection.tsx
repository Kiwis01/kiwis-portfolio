import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Code, Palette, Database, Zap } from "lucide-react";
import irisVideo from '@/assets/iris.mp4';
import medAI from '@/assets/medAi.mp4';

export function ProjectsSkillsSection() {
  const projects = [
    {
      title: "Healthy",
      description: "Co-founded a unified healthcare platform for public hospitals in Mexico, featuring AI-powered diagnostics (U-Net) and multimodal insights from medical imaging and reports.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaHxlbnwxfHx8fDE3NTc3NDAwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["AI/ML", "YOLOv8", "MedSAM", "MedGemma", "AWS", "HIPAA"],
      demoUrl: "https://heathy.org",
      githubUrl: "#"
    },
    {
        title: "Iris",
        description: "Immersive Anatomy Atlas (XR4Health25, UNESCO & Université de Paris) – Co-developed a 3D immersive human atlas that integrates anatomical slices from the Visible Korean Human dataset into a VR/AR environment. Built interactive exploration tools and an AI-powered multilingual chatbot to enhance anatomy education, bridging traditional cross-sectional imaging with immersive virtual anatomy.",
        image: irisVideo,
        tags: ["Mixture-of-Agents", "PyTorch", "Roboflow", "React", "Multimodal AI"],
        demoUrl: "#",
        githubUrl: "#"
    },
    {
      title: "Medical Assistant for Pre-diagnoses",
      description: "Designed a mixture-of-agents architecture and a multimodal pipeline combining MRI imaging with patient records to provide AI-powered pre-diagnostic support for doctors.",
      image: medAI,
      tags: ["Mixture-of-Agents", "PyTorch", "Roboflow", "React", "Multimodal AI"],
      demoUrl: "#",
      githubUrl: "https://github.com/vnguyee/ChmlTech-MedAssist-AI.git"
    },
    {
      title: "Pull Request Agent",
      description: "Built a PR agent with LangChain and a RAG pipeline to analyze code changes, suggest inline fixes, and detect cross-file impacts, reducing code review time for tech leads.",
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwY29kZXxlbnwxfHx8fDE3NTc3NDAwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["LangChain", "Qdrant", "RAG", "Bitbucket API", "Amazon SQS"],
      demoUrl: "#",
      githubUrl: "#"
    }
  ];

  const skillCategories = [
    {
      title: "Programming",
      icon: Code,
      skills: ["Python", "Java", "C/C++", "SQL"]
    },
    {
      title: "AI/ML",
      icon: Palette,
      skills: ["PyTorch", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Pydicom"]
    },
    {
      title: "Databases",
      icon: Database,
      skills: ["PostgreSQL", "MySQL", "MongoDB", "Qdrant", "Chroma"]
    },
    {
      title: "Tools & DevOps",
      icon: Zap,
      skills: ["Git", "Docker", "Linux/Unix", "Bitbucket", "AWS", "Spacelift", "Postman", "Apache Kafka", "Unity"]
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4">Projects & Skills</h1>
          <p className="text-xl text-muted-foreground">
            A showcase of my recent work and technical expertise
          </p>
        </div>

 
        {/* Skills Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl mb-8 text-center">Technical Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center pb-4">
                  <category.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge 
                        key={skillIndex} 
                        variant="secondary" 
                        className="text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
    
        {/* Projects Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl mb-8 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <video
                    src={project.image}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-2xl"
                    autoPlay
                    loop
                    muted
                  />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="text-sm">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.demoUrl && project.demoUrl !== '#' && (
                      <Button size="sm" asChild>
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && project.githubUrl !== '#' && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Publications Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl mb-8 text-center">Publications</h2>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">XR for Educational Anatomy: an Immersive human atlas with chatbot</CardTitle>
              <CardDescription className="text-sm">Co-author | University of Paris & UNESCO, XR4Health25 (2025)</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Presented a VR/AR system for medical imaging education and surgical planning. This project was a collaboration with top researchers from the University of Paris and the anatomy department at UNESCO.</p>
              <div className="mt-4">
                <Button size="sm" asChild>
                  <a href="https://www.researchgate.net/publication/391125680_XR_for_educational_anatomy_an_Immersive_human_atlas_with_chatbot" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View Publication
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
    
    
      </div>
    </div>
  );
}