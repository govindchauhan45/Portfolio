import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { contactConfig } from '../content';

export const Contact = () => {
    const form = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'captcha_error'>('idle');
    const [captcha, setCaptcha] = useState({ code: '', userInput: '' });

    const generateCaptcha = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No confusing chars like I/1/O/0
        let result = '';
        for (let i = 0; i < 4; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };

    // Generate random code on mount
    useEffect(() => {
        setCaptcha(prev => ({ ...prev, code: generateCaptcha() }));
    }, []);

    const sendEmail = (e: FormEvent) => {
        e.preventDefault();

        if (captcha.userInput.toUpperCase() !== captcha.code) {
            setStatus('captcha_error');
            setTimeout(() => setStatus('idle'), 3000);
            return;
        }

        setStatus('sending');

        // NOTE: Replace these with your actual EmailJS credentials
        // Get them from https://dashboard.emailjs.com/
        const SERVICE_ID = 'service_srw80du';
        const TEMPLATE_ID = 'template_ewey438';
        const PUBLIC_KEY = 'nUzUYObCG3fGddjZb';

        if (form.current) {
            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
                publicKey: PUBLIC_KEY,
            })
                .then(
                    () => {
                        setStatus('success');
                        form.current?.reset();
                        // Reset captcha code and clear input
                        setCaptcha({ code: generateCaptcha(), userInput: '' });
                        setTimeout(() => setStatus('idle'), 5000);
                    },
                    (error) => {
                        console.error('FAILED...', error.text);
                        setStatus('error');
                        setTimeout(() => setStatus('idle'), 5000);
                    },
                );
        }
    };

    return (
        <section className="py-20 px-4 min-h-[50vh] flex items-center justify-center">
            <div className="max-w-2xl mx-auto w-full border border-gray-800 bg-black/80 p-4 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                    <span className="text-primary">{'>'}</span> INITIATE_COMMUNICATION
                </h2>

                <motion.form
                    ref={form}
                    onSubmit={sendEmail}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-400 font-mono text-sm mb-2">{contactConfig.nameRequestText}</label>
                            <input
                                type="text"
                                name="user_name"
                                required
                                disabled={status === 'sending'}
                                className="w-full bg-black border border-gray-700 p-3 text-white focus:border-primary focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="OPERATOR_NAME"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 font-mono text-sm mb-2">{contactConfig.emailRequestText}</label>
                            <input
                                type="email"
                                name="user_email"
                                required
                                disabled={status === 'sending'}
                                className="w-full bg-black border border-gray-700 p-3 text-white focus:border-primary focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="enter_your_email@domain.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-400 font-mono text-sm mb-2">{contactConfig.subjectRequestText}</label>
                        <input
                            type="text"
                            name="subject"
                            required
                            disabled={status === 'sending'}
                            className="w-full bg-black border border-gray-700 p-3 text-white focus:border-primary focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="PURPOSE_OF_CONTACT"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 font-mono text-sm mb-2">{contactConfig.messageRequestText}</label>
                        <textarea
                            rows={1}
                            name="message"
                            required
                            disabled={status === 'sending'}
                            className="w-full bg-black border border-gray-700 p-3 text-white focus:border-primary focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all font-mono disabled:opacity-50 disabled:cursor-not-allowed min-h-[150px] resize-none overflow-hidden"
                            placeholder="enter_message_content..."
                            onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = 'auto';
                                target.style.height = target.scrollHeight + 'px';
                            }}
                        />
                    </div>

                    <div className="border border-gray-800 p-4 bg-black/50">
                        <label className="block text-primary font-mono text-sm mb-2">SECURITY_CLEARANCE_REQUIRED</label>
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <div className="bg-gray-900 px-4 py-2 font-mono text-xl tracking-widest text-[#fa5c5c] border border-[#fa5c5c]/30 select-none flex items-center justify-center gap-4 w-full md:w-auto">
                                <span>{captcha.code}</span>
                                <button
                                    type="button"
                                    onClick={() => setCaptcha(prev => ({ ...prev, code: generateCaptcha() }))}
                                    className="text-gray-500 hover:text-[#fa5c5c] transition-colors"
                                    title="Regenerate Code"
                                >
                                    <RefreshCw size={14} />
                                </button>
                            </div>
                            <input
                                type="text"
                                value={captcha.userInput}
                                onChange={(e) => setCaptcha(prev => ({ ...prev, userInput: e.target.value }))}
                                required
                                disabled={status === 'sending'}
                                className={`w-full md:flex-1 bg-black border ${status === 'captcha_error' ? 'border-red-500 animate-pulse' : 'border-gray-700'} p-2 text-white focus:border-primary focus:outline-none transition-all font-mono uppercase`}
                                placeholder="ENTER_CODE_ABOVE"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'sending'}
                        className={`w-full ${status === 'captcha_error' ? 'bg-red-500/10 border-red-500 text-red-500' : 'bg-primary/10 border-primary text-primary hover:bg-primary hover:text-black'} border py-4 font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:hover:bg-primary/10 disabled:hover:text-primary disabled:cursor-not-allowed`}
                    >
                        {status === 'sending' ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                <span>TRANSMITTING...</span>
                            </>
                        ) : status === 'success' ? (
                            <>
                                <CheckCircle size={18} />
                                <span>TRANSMISSION_COMPLETE</span>
                            </>
                        ) : status === 'captcha_error' ? (
                            <>
                                <AlertCircle size={18} />
                                <span>SECURITY_BREACH: INVALID_CODE</span>
                            </>
                        ) : status === 'error' ? (
                            <>
                                <AlertCircle size={18} />
                                <span>TRANSMISSION_FAILED</span>
                            </>
                        ) : (
                            <>
                                <span>{contactConfig.buttonText}</span>
                                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    {status === 'success' && (
                        <p className="text-primary text-center text-sm font-mono mt-2 animate-pulse">
                            {'>'} MESSAGE_RECEIVED_BY_SYSTEM. STANDBY_FOR_RESPONSE...
                        </p>
                    )}
                    {status === 'error' && (
                        <p className="text-red-500 text-center text-sm font-mono mt-2">
                            {'>'} ERROR: CONNECTION_REFUSED. PLEASE_RETRY...
                        </p>
                    )}
                </motion.form>
            </div>
        </section>
    );
};
