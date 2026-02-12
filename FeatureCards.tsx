import { motion } from "framer-motion";
import { Brain, Shield, Zap, Cloud, Lock, Cpu } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Smart Detection",
    description: "Advanced vulnerability detection using language model analysis",
  },
  {
    icon: Shield,
    title: "Secure Generation",
    description: "Automatic generation of secure code with best practices",
  },
  {
    icon: Zap,
    title: "Fast Analysis",
    description: "Quick inference with optimized cloud-based processing",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "Scalable serverless architecture for reliable performance",
  },
  {
    icon: Cpu,
    title: "Multi-Language",
    description: "Support for Python, JavaScript, TypeScript, and more",
  },
  {
    icon: Lock,
    title: "Secure Pipeline",
    description: "End-to-end encryption with stateless processing",
  },
];

const FeatureCards = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="mt-10 sm:mt-14"
    >
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl sm:text-2xl font-semibold text-foreground"
        >
          Features
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.05 }}
            className="premium-card p-5 group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
              <feature.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-1 text-sm">{feature.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default FeatureCards;
