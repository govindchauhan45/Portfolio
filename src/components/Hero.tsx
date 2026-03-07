import { motion } from 'framer-motion';
import { TerminalUI } from './TerminalUI';
import { GlitchText } from './GlitchText';
import TypingText from './TypingText';
import TerminalCommands from './TerminalCommands';
import TerminalConsole from './TerminalConsole';
import { ArrowRight, Download, Github, Linkedin, Database } from 'lucide-react';
import { personalInfo } from '../content';

export const Hero = () => {
    return (
        <section className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                <TerminalUI title="init_data_portfolio.sh">
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="font-mono"
                        >
                            <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-8 md:gap-12 text-center md:text-left">

                                <div className="flex-1">

                                    <div className="flex items-center justify-center md:justify-start gap-2 text-primary/70 mb-2">
                                        <span>{'>'}</span>
                                        <span>DATA_PIPELINE_READY...</span>
                                    </div>

                                    <div className="flex items-center justify-center md:justify-start gap-2 text-primary/70 mb-4">
                                        <span>{'>'}</span>
                                        <span>LOADING_DATA_SCIENTIST_PROFILE...</span>
                                    </div>

                                    <h1 className="text-4xl md:text-7xl font-bold mb-4 text-white whitespace-nowrap">
                                        <GlitchText text={personalInfo.name} />
                                    </h1>

                                    <h2 className="text-xl md:text-2xl text-secondary mb-8">
                                        <span className="text-primary">{'>'}</span>{' '}
                                        <TypingText text={'Data Scientist | AI Explorer | Problem Solver'} />
                                    </h2>

                                    <p className="max-w-xl text-gray-400 mb-8 leading-relaxed border-l-2 border-primary/30 pl-4 mx-auto md:mx-0">
                                        {personalInfo.bio}
                                    </p>

                                    <TerminalCommands />
                                    <TerminalConsole />

                                    <div className="flex flex-wrap justify-center md:justify-start gap-3">

                                        {/* Data Projects */}
                                        <button
                                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                            className="group relative px-6 py-3 bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300 flex items-center gap-2 text-sm"
                                        >
                                            <span className="relative z-10 font-bold">DATA PROJECTS</span>
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </button>

                                        {/* GitHub */}
                                        <a
                                            href={personalInfo.socials.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 border border-secondary/50 text-secondary hover:border-secondary hover:shadow-[0_0_15px_rgba(214,0,255,0.3)] transition-all duration-300 flex items-center gap-2 text-sm"
                                        >
                                            <Github size={16} />
                                            <span>GITHUB</span>
                                        </a>

                                        {/* LinkedIn */}
                                        <a
                                            href={personalInfo.socials.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 border border-blue-500/50 text-blue-400 hover:border-blue-400 transition-all duration-300 flex items-center gap-2 text-sm"
                                        >
                                            <Linkedin size={16} />
                                            <span>LINKEDIN</span>
                                        </a>

                                        {/* Kaggle */}
                                        <a
                                            href={personalInfo.socials.kaggle}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 border border-yellow-500/50 text-yellow-400 hover:border-yellow-400 transition-all duration-300 flex items-center gap-2 text-sm"
                                        >
                                            <Database size={16} />
                                            <span>KAGGLE</span>
                                        </a>

                                        {/* Resume */}
                                        <a
                                            href="/resume.pdf"
                                            download
                                            className="px-6 py-3 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-all duration-300 flex items-center gap-2 text-sm"
                                        >
                                            <Download size={16} />
                                            <span>RESUME</span>
                                        </a>

                                    </div>
                                </div>

                                {/* Avatar */}
                                <div className="flex-shrink-0 flex flex-col items-center gap-6">
                                    <div className="relative w-32 h-32 md:w-48 md:h-48">
                                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>

                                        <img
                                            src={personalInfo.avatar}
                                            alt={personalInfo.name}
                                            className="relative z-10 w-full h-full object-cover rounded-full border-2 border-primary shadow-[0_0_15px_rgba(0,255,65,0.3)]"
                                        />

                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    </div>
                </TerminalUI>
            </div>
        </section>
    );
};