import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Briefcase, HeartPulse, Zap, Cloud, ShieldCheck, BookOpen } from "lucide-react";

export function ExperienceSection() {
  const experiences = [
    {
      company: "University of Phoenix",
      position: "Software Engineering Intern",
      location: "Tempe, AZ",
      period: "May 2025 - Aug 2025",
      description: `Built a pull request agent with <strong>Python, AWS Lambda, LangChain, and Qdrant</strong> to analyze code changes and suggest inline fixes in seconds. Added a <strong>FastAPI RAG pipeline</strong> to detect cross-file impacts and boost accuracy. Implemented <strong>Amazon SQS async pipelines</strong> to eliminate webhook timeouts and <strong>speed up CI/CD by ~30s</strong>. Deployed a Kafka-based auditing microservice in Java on AWS, uncovering <strong>62 orphaned access policies</strong> and improving security compliance. Led incident response during Cognito credential changes, preventing downtime.`,
      technologies: [
        "Python",
        "Java",
        "AWS",
        "Lambda",
        "Bitbucket API",
        "LangChain",
        "Qdrant",
        "RAG",
        "FastAPI",
        "Amazon SQS",
        "Kafka"
      ],
      current: false,
    },
    {
      company: "City of Phoenix",
      position: "Software Engineering Intern",
      location: "Phoenix, AZ",
      period: "Sep 2024 - Apr 2025",
      description: `Optimized SQL queries and redesigned schemas with <strong>Python, SQLAlchemy, and Alembic</strong>, cutting asset lookup times from minutes to <strong>under five seconds</strong> during a citywide migration. Improved indexing and workflows to <strong>triple asset identification output</strong>. Unified 200+ documentation resources into a single linked system, reducing retrieval from hours to <strong>under a minute</strong>.`,
      technologies: [
        "Python",
        "SQL",
        "SQLAlchemy",
        "Alembic",
        "Database Optimization",
        "Indexing",
        "Documentation Management"
      ],
      current: false,
    },
    {
      company: "Healthy",
      position: "Full-stack AI Engineer",
      location: "Hermosillo, Mexico",
      period: "Jun 2023 - Present",
      description: `Built a unified healthcare platform used across public hospitals in Hermosillo, centralizing patient records, labs, and imaging through a <strong>Python backend and React + TS frontend</strong>. Integrated AI models (U-Net + OpenAI API) for tumor detection and segmentation, reaching <strong>88.9% accuracy</strong>. Combined imaging data with LLM reports for multimodal diagnostics. Deployed on AWS with <strong>HIPAA-aligned architecture</strong> and CI/CD pipelines. Completed <strong>42,000+ pilot tests</strong> with physicians to refine workflows and accuracy.`,
      technologies: [
        "Python",
        "React",
        "TypeScript",
        "U-Net",
        "OpenAI API",
        "AI/ML",
        "AWS",
        "HIPAA",
        "Medical Imaging"
      ],
      current: true,
    },
  ];

  return (
    <section id="experience" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4">Work Experience</h1>
          <p className="text-xl text-muted-foreground">
            My professional journey in software development
          </p>
        </div>

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
                <div className="text-muted-foreground mb-4 leading-relaxed [&_strong]:bg-gradient-to-r [&_strong]:from-[#4285F4] [&_strong]:via-[#9B72CB] [&_strong]:to-[#D96570] [&_strong]:bg-clip-text [&_strong]:text-transparent [&_strong]:font-bold" dangerouslySetInnerHTML={{ __html: exp.description }} />
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
        <Card className="mt-12 border-none bg-transparent shadow-none">
          <CardHeader className="px-0">
            <CardTitle className="text-3xl mb-4">Career Highlights</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  icon: <HeartPulse className="w-6 h-6 text-red-400" />,
                  text: "Led development of a <strong>healthcare platform</strong> with <strong>AI-powered diagnostics</strong> from concept to pilot deployment."
                },
                {
                  icon: <Zap className="w-6 h-6 text-yellow-400" />,
                  text: "Engineered high-impact solutions: a <strong>PR agent</strong> cutting review time & <strong>7000x database optimization</strong>."
                },
                {
                  icon: <Cloud className="w-6 h-6 text-blue-400" />,
                  text: "Designed <strong>scalable AWS systems</strong> using microservices, async pipelines, and IaC."
                },
                {
                  icon: <ShieldCheck className="w-6 h-6 text-green-400" />,
                  text: "Led <strong>incident response</strong>, implemented security measures, and ensured <strong>system reliability</strong>."
                },
                {
                  icon: <BookOpen className="w-6 h-6 text-purple-400" />,
                  text: "Co-authored a <strong>publication on XR</strong> for medical education, presented at an international conference."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-card border hover:border-primary/50 transition-colors group">
                  <div className="p-2 rounded-lg bg-secondary group-hover:bg-secondary/80 transition-colors">
                    {item.icon}
                  </div>
                  <p
                    className="text-muted-foreground leading-relaxed [&_strong]:text-foreground [&_strong]:font-semibold"
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}