import { motion } from 'framer-motion';
import { Youtube, Play } from 'lucide-react';
import { videos } from '../content';

export const Videos = () => {
    return (
        <section id="videos" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3">
                        <Youtube className="text-primary" size={32} />
                        <span className="text-primary">{'>'}</span> MEDIA_LOGS
                    </h2>
                    <div className="h-1 w-20 bg-primary"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-black/50 border border-gray-800 hover:border-primary transition-colors duration-300 overflow-hidden"
                        >
                            <div className="aspect-video w-full overflow-hidden relative">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube-nocookie.com/embed/${video.videoId}`}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0 z-10"
                                ></iframe>
                                {/* Overlay while loading or interaction barrier if needed - keeping simple for now */}
                                <div className="absolute inset-0 pointer-events-none border border-primary/20 z-20 group-hover:border-primary/50 transition-colors"></div>
                            </div>

                            <div className="p-6 relative">
                                <div className="absolute top-0 right-0 p-2 opacity-50">
                                    <Play size={16} className="text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                    {video.title}
                                </h3>
                                <p className="text-gray-400 text-sm font-mono line-clamp-2">
                                    {video.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};