import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Briefcase } from "lucide-react";

export function ExperienceSection() {
  const experiences = [
    {
      company: "University of Phoenix",
      position: "Software Engineering Intern",
      location: "Tempe, AZ",
      period: "May 2025 - Aug 2025",
      description: "Deployed a Kafka-based microservice to audit access keys, improving security and CI/CD efficiency. Built a pull request agent with a RAG pipeline to analyze code changes, suggest fixes, and detect cross-file impacts. Implemented async pipelines with Amazon SQS to resolve webhook timeouts.",
      technologies: ["Bitbucket API", "LangChain", "Qdrant", "RAG", "Amazon SQS", "Kafka", "Java", "AWS"],
      current: false
    },
    {
      company: "City of Phoenix",
      position: "Software Engineering Intern",
      location: "Phoenix, AZ",
      period: "Sep 2024 - Apr 2025",
      description: "Optimized SQL queries and restructured database schemas to reduce asset lookup times by over 99.9%. Consolidated 200+ documentation resources into a unified system, significantly improving data retrieval efficiency.",
      technologies: ["SQL", "Database Optimization", "Indexing", "Documentation Management"],
      current: false
    },
    {
      company: "Healthy",
      position: "AI Engineer & CTO",
      location: "Hermosillo, Mexico",
      period: "Jun 2023 - Present",
      description: "Co-founded and led the development of a unified healthcare platform with AI-powered diagnostics. Integrated computer vision (YOLOv8, MedSAM) and NLP (MedGemma) models to achieve 88.9% accuracy in tumor detection and multimodal analysis.",
      technologies: ["AI/ML", "YOLOv8", "MedSAM", "MONAI", "MedGemma", "AWS", "HIPAA"],
      current: true
    }
  ];

  // const achievements = [
  //   {
  //     metric: "5+",
  //     label: "Years of Experience"
  //   },
  //   {
  //     metric: "60%",
  //     label: "Lower Latency"
  //   },
  //   {
  //     metric: "88.9%",
  //     label: "AI Model Accuracy"
  //   },
  //   {
  //     metric: "10+",
  //     label: "Projects Deployed"
  //   }
  // ];

  return (
    <section id="experience" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4">Work Experience</h1>
          <p className="text-xl text-muted-foreground">
            My professional journey in software development
          </p>
        </div>

        {/* Achievement Stats */}
        {/*<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl md:text-3xl text-primary mb-2">
                  {achievement.metric}
                </div>
                <div className="text-sm text-muted-foreground">
                  {achievement.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>*/}

        {/* Experience Timeline */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card 
              key={index} 
              className={`hover:shadow-lg transition-shadow ${exp.current ? 'ring-2 ring-primary' : ''}`}
            >
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${exp.current ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        {exp.position}
                        {exp.current && (
                          <Badge variant="default" className="text-xs">
                            Current
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="text-lg">{exp.company}</CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-col lg:items-end gap-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarDays className="w-4 h-4 mr-2" />
                      {exp.period}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      {exp.location}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Career Summary */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Career Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Led development of a healthcare platform with AI-powered diagnostics from concept to pilot deployment.</li>
              <li>• Engineered high-impact solutions, including a PR agent that cuts code review time and a 7000x database optimization.</li>
              <li>• Designed and deployed scalable, secure systems on AWS using microservices, async pipelines, and IaC.</li>
              <li>• Proven ability to lead incident response, implement security measures, and ensure system reliability.</li>
              <li>• Co-authored a publication on XR for medical education, presented at an international conference.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}