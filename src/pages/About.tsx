import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const skills = [
  { name: "Brand Identity", level: 95 },
  { name: "UI/UX Design", level: 90 },
  { name: "Typography", level: 92 },
  { name: "Print Design", level: 88 },
  { name: "Motion Graphics", level: 75 },
];

const tools = [
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe InDesign",
  "Figma",
  "Sketch",
  "After Effects",
  "Premiere Pro",
  "Blender",
];

const experience = [
  {
    year: "2020 - Present",
    title: "Senior Graphic Designer",
    company: "Creative Agency NYC",
    description: "Leading design projects for Fortune 500 clients, mentoring junior designers.",
  },
  {
    year: "2018 - 2020",
    title: "Visual Designer",
    company: "Design Studio Berlin",
    description: "Created brand identities and digital experiences for startups and enterprises.",
  },
  {
    year: "2016 - 2018",
    title: "Junior Designer",
    company: "Brand House London",
    description: "Developed print materials and assisted in major branding campaigns.",
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-sm font-medium text-primary tracking-wider uppercase mb-4">
                About Me
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6">
                Hello, I'm
                <span className="text-gradient"> ZiyanZakariya</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                A graphic designer specializing in poster making, magazine design, and visual storytelling.
              </p>
              <p className="text-muted-foreground mb-8">
                I believe design is more than aesthetics—it's about solving problems and creating meaningful connections between brands and their audiences. Based in Poduvachery, I bring creative vision to every project I undertake.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="gold" asChild>
                  <Link to="/contact">
                    Work With Me
                    <ArrowRight size={18} />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <Card variant="glass" className="p-8 relative z-10">
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-8xl font-display font-bold text-gradient">Z</span>
                    <p className="text-muted-foreground mt-4">Creative Designer</p>
                  </div>
                </div>
              </Card>
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <SectionHeader
            label="Expertise"
            title="Skills & Tools"
            description="A blend of creative vision and technical proficiency."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
            {/* Skills */}
            <div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-8">Core Skills</h3>
              <div className="space-y-6">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-gold-light rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-8">Tools & Software</h3>
              <div className="flex flex-wrap gap-3">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-4 py-2 rounded-full bg-card/60 backdrop-blur-xl border border-border/50 text-foreground text-sm hover:border-primary/50 transition-colors"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <SectionHeader
            label="Journey"
            title="Experience"
            description="My professional path in the design industry."
          />

          <div className="max-w-3xl mx-auto mt-16">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2" />

              {experience.map((exp, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row gap-8 mb-12 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                >
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 md:-translate-x-1/2 shadow-glow" />

                  {/* Content */}
                  <div className={`md:w-1/2 pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <Card variant="glass" className="p-6">
                      <span className="text-sm text-primary font-medium">{exp.year}</span>
                      <h3 className="text-xl font-display font-bold text-foreground mt-2">{exp.title}</h3>
                      <p className="text-muted-foreground font-medium mt-1">{exp.company}</p>
                      <p className="text-muted-foreground mt-3 text-sm">{exp.description}</p>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
