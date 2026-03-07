import { Terminal, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { projects } from '../content';

export const Projects = () => {
    return (
        <section id="projects" className="py-20 px-4 min-h-screen flex flex-col justify-center">
            <div className="max-w-6xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-12"
                >
                    <Terminal className="text-primary" />
                    <h2 className="text-3xl font-bold text-white">
                        <span className="text-primary">./</span>
                        PROJECTS
                    </h2>
                    <div className="h-[1px] bg-primary/30 flex-grow ml-4"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-black/40 border border-primary/20 p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,255,65,0.08)] rounded-lg"
                        >
                            <div className="absolute -inset-px rounded-lg pointer-events-none" style={{background: 'linear-gradient(90deg, rgba(0,255,65,0.06), rgba(0,234,255,0.03))', maskImage: 'linear-gradient(#000, transparent)'}} />

                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                {project.title}
                            </h3>

                            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tech.map((t, i) => (
                                    <span key={i} className="text-xs font-mono text-primary px-2 py-1 bg-black/30 border border-primary/10 rounded">{t}</span>
                                ))}
                            </div>

                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-white hover:text-secondary transition-colors hover:scale-105"
                            >
                                <Github size={16} />
                                <span>SOURCE</span>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
