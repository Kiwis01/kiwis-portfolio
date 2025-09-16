import { Button } from "@/components/ui/button"
import { Download, Github, Linkedin, Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import resumePdf from '@/assets/Carlos_Quihuis_SWE.pdf';

function MainSection() {
  return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto pb-20">
        
        <Badge variant="secondary" className="mb-6" style={{ backgroundColor: "#34eb77"}}>
            Available for Work
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6">
            Full-Stack Engineer
            <span className="bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent block">
              & AI Developer
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            I build intelligent web applications by merging high-performance backends with intuitive UIs and cutting-edge AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a href={resumePdf} download="Carlos_Quihuis_SWE.pdf">
              <Button variant="outline" size="lg" className="cursor-pointer">
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
            </a>
          </div>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a 
              href="https://github.com/Kiwis01" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href="https://www.linkedin.com/in/carlos-quihuis-190b431aa/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="mailto:carlos.quihuis.dev@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>

          {/* About section integrated */}
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-muted-foreground">
              With 5+ years of experience at the intersection of full-stack development and AI, I am passionate about building scalable, high-impact solutions that solve real-world problems. I thrive on complex challenges and am driven to use technology to make a meaningful difference.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainSection