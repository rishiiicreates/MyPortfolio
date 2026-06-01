import { motion } from "framer-motion";
import { useState } from "react";
import { Certificate, certificates } from "@/data/portfolioData";
import PaperCard from "@/components/ui/PaperCard";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Award, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { staggerContainer, cardVariants, fadeInUpVariants } from "@/lib/animations";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function Certificates() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [containerRef, controls] = useScrollAnimation();

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const newIds = new Set(prev);
      if (newIds.has(id)) {
        newIds.delete(id);
      } else {
        newIds.add(id);
      }
      return newIds;
    });
  };

  const isExpanded = (id: string) => expandedIds.has(id);

  return (
    <section id="certificates" className="py-20 px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-56 h-56 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto max-w-5xl">
        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="space-y-12"
        >
          {/* Section header */}
          <motion.div 
            variants={fadeInUpVariants}
            className="text-center space-y-2"
          >
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Achievements</span>
            <h2 className="text-4xl font-semibold font-doodle">My Certificates</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Professional certifications I've earned to validate my expertise and continuous learning in various technologies.
            </p>
          </motion.div>
          
          {/* Certificates grid */}
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {certificates.map((certificate, index) => (
              <CertificateCard 
                key={`${certificate.title}-${index}`}
                certificate={certificate}
                index={index}
                isExpanded={isExpanded(`${certificate.title}-${index}`)}
                toggleExpand={() => toggleExpand(`${certificate.title}-${index}`)}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
  isExpanded: boolean;
  toggleExpand: () => void;
}

function CertificateCard({ certificate, index, isExpanded, toggleExpand }: CertificateCardProps) {
  const delay = index * 0.1;
  
  return (
    <motion.div
      variants={cardVariants}
      custom={delay}
      className="group"
    >
      <PaperCard customClass={`relative overflow-hidden h-full transition-all duration-300 ${isExpanded ? 'shadow-lg' : ''}`}>
        <div className="flex flex-col h-full">
          {/* Certificate header with image */}
          <div className={`flex relative mb-4 ${certificate.image ? 'flex-row' : 'flex-col'}`}>
            {certificate.image && (
              <div className="relative w-28 h-28 mr-4 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <img 
                  src={certificate.image} 
                  alt={certificate.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}
            <div className="flex-1">
              {/* Certificate title and issuer */}
              <h3 className="text-xl font-semibold font-doodle line-clamp-2 mb-1">{certificate.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <Award className="w-4 h-4 mr-1" />
                <span>{certificate.issuer}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <CalendarDays className="w-4 h-4 mr-1" />
                <span>{certificate.date}</span>
              </div>
            </div>
          </div>
          
          {/* Certificate content */}
          <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-[500px]' : 'max-h-[80px]'}`}>
            <p className="text-muted-foreground mb-4 text-sm">
              {certificate.description}
            </p>
            
            {/* Skills section */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {certificate.skills.map((skill, i) => (
                  <Badge 
                    key={i} 
                    variant="outline" 
                    className="bg-primary/10 dark:bg-primary/5 text-primary border-primary/20"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Credential information */}
            {certificate.credentialId && (
              <div className="text-xs text-muted-foreground mb-2">
                <span className="font-semibold">Credential ID:</span> {certificate.credentialId}
              </div>
            )}
            
            {/* Verify link */}
            {certificate.credentialUrl && (
              <a 
                href={certificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-1"
              >
                <span>Verify Certificate</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          
          {/* Expand/collapse button */}
          <button 
            onClick={toggleExpand}
            className="mt-3 flex items-center justify-center w-full py-1 text-xs text-muted-foreground hover:text-primary transition-colors border-t border-gray-100 dark:border-gray-800"
          >
            <span>{isExpanded ? 'Show less' : 'Show more'}</span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 ml-1" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-1" />
            )}
          </button>
        </div>
      </PaperCard>
    </motion.div>
  );
}