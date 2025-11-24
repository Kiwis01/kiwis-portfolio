import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Code, Database, Zap, Terminal, Layout, Brain, Cpu, BookOpen } from "lucide-react";
import irisVideo from '@/assets/iris.mp4';
import medAI from '@/assets/medAi.mp4';

export function ProjectsSkillsSection() {
  const projects = [
    {
      title: "Healthy",
      description: "Co-founded a unified healthcare platform for public hospitals in Mexico, featuring AI-powered diagnostics (U-Net) and multimodal insights from medical imaging and reports.",
      media: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaHxlbnwxfHx8fDE3NTc3NDAwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      mediaType: "image",
      tags: ["AI/ML", "YOLOv8", "MedSAM", "MedGemma", "AWS", "HIPAA"],
      demoUrl: "https://heathy.org",
      githubUrl: "#"
    },
    {
      title: "Iris",
      description: "Immersive Anatomy Atlas (XR4Health25, UNESCO & Université de Paris) – Co-developed a 3D immersive human atlas that integrates anatomical slices from the Visible Korean Human dataset into a VR/AR environment. Built interactive exploration tools and an AI-powered multilingual chatbot to enhance anatomy education.",
      media: irisVideo,
      mediaType: "video",
      tags: ["Mixture-of-Agents", "PyTorch", "Roboflow", "React", "Multimodal AI"],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Medical Assistant for Pre-diagnoses",
      description: "Designed a mixture-of-agents architecture and a multimodal pipeline combining MRI imaging with patient records to provide AI-powered pre-diagnostic support for doctors.",
      media: medAI,
      mediaType: "video",
      tags: ["Mixture-of-Agents", "PyTorch", "Roboflow", "React", "Multimodal AI"],
      demoUrl: "#",
      githubUrl: "https://github.com/vnguyee/ChmlTech-MedAssist-AI.git"
    },
    {
      title: "Pull Request Agent",
      description: "Built a PR agent with LangChain and a RAG pipeline to analyze code changes, suggest inline fixes, and detect cross-file impacts, reducing code review time for tech leads.",
      media: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwY29kZXxlbnwxfHx8fDE3NTc3NDAwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      mediaType: "image",
      tags: ["LangChain", "Qdrant", "RAG", "Bitbucket API", "Amazon SQS"],
      demoUrl: "#",
      githubUrl: "#"
    }
  ];

  const skillCategories = [
    {
      title: "Languages",
      icon: Code,
      color: "text-blue-400",
      skills: ["Python", "Java", "C/C++", "Assembly", "JavaScript", "TypeScript", "SQL", "Bash"]
    },
    {
      title: "AI & Data Science",
      icon: Brain,
      color: "text-purple-400",
      skills: ["PyTorch", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Pydicom", "OpenCV", "YOLOv8"]
    },
    {
      title: "Frameworks & Web",
      icon: Layout,
      color: "text-pink-400",
      skills: ["React", "Angular", "Flask", "FastAPI", ".NET", "Tailwind CSS", "REST APIs"]
    },
    {
      title: "Databases",
      icon: Database,
      color: "text-green-400",
      skills: ["PostgreSQL", "MySQL", "MongoDB", "Qdrant", "Chroma", "AWS Aurora"]
    },
    {
      title: "DevOps & Tools",
      icon: Terminal,
      color: "text-yellow-400",
      skills: ["Git", "Docker", "Kubernetes", "AWS", "Linux/Unix", "Bitbucket", "Spacelift", "Postman", "Kafka", "Unity", "CI/CD"]
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4 font-bold text-white">
            Projects & Skills
          </h1>
          <p className="text-xl text-muted-foreground">
            A showcase of my recent work and technical expertise
          </p>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl mb-8 text-center font-semibold">Technical Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {skillCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-secondary/50 flex items-center justify-center">
                    <category.icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap justify-center gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
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
          <h2 className="text-2xl md:text-3xl mb-8 text-center font-semibold">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-muted/50">
                <div className="aspect-video overflow-hidden relative">
                  {project.mediaType === 'video' ? (
                    <video
                      src={project.media}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={project.media}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="flex gap-3">
                      {project.demoUrl && project.demoUrl !== '#' && (
                        <Button size="sm" variant="secondary" asChild>
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && project.githubUrl !== '#' && (
                        <Button size="sm" variant="secondary" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            Source Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{project.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Publications Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl mb-8 text-center font-semibold">Publications</h2>
          <Card className="relative overflow-hidden border-2 border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 group">
            {/* Decorative background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-50" />

            <CardHeader className="relative">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl h-fit group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">XR for Educational Anatomy: an Immersive human atlas with chatbot</CardTitle>
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-muted-foreground">
                      <Badge variant="outline" className="border-primary/30 text-primary">Paper</Badge>
                      <span>University of Paris & UNESCO</span>
                      <span>•</span>
                      <span>XR4Health25 (2025)</span>
                    </div>
                  </div>
                </div>
                <Button className="shrink-0 shadow-lg shadow-primary/20" asChild>
                  <a href="https://www.researchgate.net/publication/391125680_XR_for_educational_anatomy_an_Immersive_human_atlas_with_chatbot" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Read Paper
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="relative md:pl-20">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Presented a VR/AR system for medical imaging education and surgical planning. This project was a collaboration with top researchers from the University of Paris and the anatomy department at UNESCO, bridging traditional cross-sectional imaging with immersive virtual anatomy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}