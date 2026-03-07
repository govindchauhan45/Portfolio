import { motion } from 'framer-motion';
import { skills } from '../content';

export const Skills = () => {
    return (
        <section className="py-20 px-4 min-h-[50vh] flex flex-col justify-center bg-black/40">
            <div className="max-w-4xl mx-auto w-full">
                <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
                    <span className="text-secondary">{'>'}</span>
                    SYSTEM_RESOURCES
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    {skills.map((skill, index) => (
                        <div key={index} className="p-4 bg-black/40 border border-primary/10 rounded-lg card-neon">
                            <div className="flex justify-between mb-2 font-mono text-sm">
                                <span className="text-gray-300">{skill.name}</span>
                                <span className="text-primary">{skill.level}%</span>
                            </div>
                            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: index * 0.1 }}
                                    className="h-full bg-gradient-to-r from-primary to-cyan-400 relative"
                                >
                                    <div className="absolute top-0 right-0 h-full w-1 bg-white animate-pulse"></div>
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
