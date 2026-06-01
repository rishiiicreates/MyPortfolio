import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Loader2, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    YT: any;
  }
}

export interface Track {
    videoId: string;
    title: string;
    artist: string;
    startTime?: number;
}

interface MusicPlayerProps {
    tracks: Track[];
    isGlobal?: boolean;
}

const MusicPlayer = ({ tracks, isGlobal = false }: MusicPlayerProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const hasRestoredPosition = useRef(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [isBuffering, setIsBuffering] = useState(false);
    const [shouldLoadYT, setShouldLoadYT] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('music-player-collapsed');
            if (saved === '1') return true;
            if (saved === '0') return false;
            return true; // default to collapsed
        }
        return true;
    });
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const playerRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (isGlobal) console.log('Global MusicPlayer mounted');
        return () => {
            if (isGlobal) console.log('Global MusicPlayer unmounted');
        };
    }, [isGlobal]);

    // Persist collapsed state
    useEffect(() => {
        if (!isGlobal && typeof window !== 'undefined') {
            localStorage.setItem('music-player-collapsed', isCollapsed ? '1' : '0');
        }
    }, [isCollapsed, isGlobal]);

    // Initial load from localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedIndex = localStorage.getItem('music-current-index');
            const savedPlaying = localStorage.getItem('music-is-playing') === 'true';
            
            if (savedIndex !== null) {
                const idx = parseInt(savedIndex);
                if (idx >= 0 && idx < tracks.length) {
                    setCurrentIndex(idx);
                }
            }
            // We don't auto-play on new tab due to browser policies, 
            // but we sync the UI state
            setIsPlaying(savedPlaying);
        }
    }, [tracks.length]);

    // Cross-tab synchronization
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'music-current-index' && e.newValue !== null) {
                setCurrentIndex(parseInt(e.newValue));
            }
            if (e.key === 'music-is-playing') {
                setIsPlaying(e.newValue === 'true');
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Broadcast play state
    useEffect(() => {
        if (isGlobal && typeof window !== 'undefined') {
            localStorage.setItem('music-is-playing', isPlaying.toString());
        }
    }, [isPlaying, isGlobal]);

    // Intersection Observer to load YT when visible (only for global or if we want to load it early)
    useEffect(() => {
        if (!isGlobal && !shouldLoadYT) {
            observerRef.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setShouldLoadYT(true);
                    observerRef.current?.disconnect();
                }
            }, { threshold: 0.1 });

            if (containerRef.current) {
                observerRef.current.observe(containerRef.current);
            }
        } else if (isGlobal) {
            setShouldLoadYT(true);
        }

        return () => observerRef.current?.disconnect();
    }, [shouldLoadYT, isGlobal]);

    const currentTrack = tracks[currentIndex];

    // YT API Loading Logic (ONLY FOR GLOBAL)
    useEffect(() => {
        if (!isGlobal || !shouldLoadYT || !tracks || tracks.length === 0) return;

        const initializePlayer = () => {
            if (playerRef.current && playerRef.current.loadVideoById) {
                playerRef.current.loadVideoById({
                    videoId: currentTrack.videoId,
                    startSeconds: currentTrack.startTime || 0
                });
                if (!isPlaying) playerRef.current.pauseVideo();
                return;
            }

            playerRef.current = new window.YT.Player(`youtube-player-shared`, {
                host: 'https://www.youtube-nocookie.com',
                videoId: currentTrack.videoId,
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    disablekb: 1,
                    fs: 0,
                    iv_load_policy: 3,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                    start: currentTrack.startTime || 0,
                    enablejsapi: 1,
                    origin: typeof window !== 'undefined' ? window.location.origin : ''
                },
                events: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onReady: (event: any) => {
                        const iframe = event.target.getIframe();
                        if (iframe) {
                            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; compute-pressure');
                            iframe.setAttribute('title', 'YouTube Music Player');
                        }
                        setDuration(event.target.getDuration());
                        setIsPlayerReady(true);
                        // Signal ready to UI components
                        window.dispatchEvent(new CustomEvent('music-status-update', { 
                            detail: { isPlayerReady: true } 
                        }));
                    },
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onStateChange: (event: any) => {
                        setIsPlaying(event.data === 1);
                        setIsBuffering(event.data === 3);
                        if (event.data === 0) handleNext();
                    }
                }
            });
        };

        const loadYT = () => {
            if (!window.YT) {
                const tag = document.createElement('script');
                tag.src = 'https://www.youtube.com/iframe_api';
                const firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
                window.onYouTubeIframeAPIReady = initializePlayer;
            } else if (window.YT && window.YT.Player) {
                initializePlayer();
            }
        };

        // Defer YouTube loading to improve LCP
        const timer = setTimeout(loadYT, 2000);
        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldLoadYT, tracks, isGlobal]);

    // Handle track changes (ONLY FOR GLOBAL)
    const lastVideoId = useRef<string | null>(null);
    useEffect(() => {
        if (isGlobal && isPlayerReady && playerRef.current && playerRef.current.loadVideoById) {
            if (lastVideoId.current !== currentTrack.videoId) {
                const savedTime = localStorage.getItem('music-current-time');
                const savedIndex = localStorage.getItem('music-current-index');
                let startTime = currentTrack.startTime || 0;
                
                // If it's the same track index as saved, try to resume
                if (savedIndex !== null && parseInt(savedIndex) === currentIndex && savedTime) {
                    startTime = parseFloat(savedTime);
                }

                playerRef.current.loadVideoById({
                    videoId: currentTrack.videoId,
                    startSeconds: startTime
                });
                setIsPlaying(true);
                setProgress(0);
                setCurrentTime(startTime);
                lastVideoId.current = currentTrack.videoId;
            }
        }
    }, [currentIndex, isGlobal, isPlayerReady, currentTrack.videoId, currentTrack.startTime]);

    // Update progress bar and save state (ONLY FOR GLOBAL)
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isGlobal && isPlaying && playerRef.current && playerRef.current.getCurrentTime) {
            interval = setInterval(() => {
                const current = playerRef.current.getCurrentTime();
                const total = playerRef.current.getDuration();
                if (total > 0) {
                    setDuration(total);
                    setCurrentTime(current);
                    setProgress((current / total) * 100);
                    
                    // Persist state
                    localStorage.setItem('music-current-index', currentIndex.toString());
                    localStorage.setItem('music-current-time', current.toString());
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentIndex, isGlobal]);

    // Initial Seek once ready (ONLY FOR GLOBAL)
    useEffect(() => {
        if (isGlobal && isPlayerReady && !hasRestoredPosition.current && playerRef.current && playerRef.current.seekTo) {
            const savedTime = localStorage.getItem('music-current-time');
            if (savedTime) {
                const time = parseFloat(savedTime);
                playerRef.current.seekTo(time, true);
            }
            hasRestoredPosition.current = true;
        }
    }, [isPlayerReady, isGlobal]);

    const togglePlay = () => {
        if (isGlobal) {
            if (!isPlayerReady || !playerRef.current) return;
            if (isPlaying) playerRef.current.pauseVideo();
            else playerRef.current.playVideo();
        } else {
            const action = isPlaying ? 'pause' : 'play';
            window.dispatchEvent(new CustomEvent('music-command', { detail: { action } }));
        }
    };

    const handleNext = () => {
        if (isGlobal) {
            setCurrentIndex((prev) => (prev + 1) % tracks.length);
        } else {
            window.dispatchEvent(new CustomEvent('music-command', { detail: { action: 'next' } }));
        }
    };

    const handlePrev = () => {
        if (isGlobal) {
            setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
        } else {
            window.dispatchEvent(new CustomEvent('music-command', { detail: { action: 'prev' } }));
        }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isGlobal) {
            if (!isPlayerReady || !playerRef.current || !containerRef.current) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const clickedProgress = x / rect.width;
            const newTime = clickedProgress * duration;
            playerRef.current.seekTo(newTime, true);
            setCurrentTime(newTime);
            setProgress(clickedProgress * 100);
        }
    };

    const formatTime = (time: number) => {
        if (!time) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Listen for commands (GLOBAL) or status updates (UI)
    useEffect(() => {
        if (isGlobal) {
            const handleCommand = (e: Event) => {
                const { action } = (e as CustomEvent).detail;
                if (!isPlayerReady || !playerRef.current) return;
                switch (action) {
                    case 'play': playerRef.current.playVideo(); break;
                    case 'pause': playerRef.current.pauseVideo(); break;
                    case 'next': handleNext(); break;
                    case 'prev': handlePrev(); break;
                }
            };
            window.addEventListener('music-command', handleCommand);
            return () => window.removeEventListener('music-command', handleCommand);
        } else {
            const handleStatus = (e: Event) => {
                const detail = (e as CustomEvent).detail;
                const { isPlaying: playing, progress: prog, currentTime: ct, duration: dur, trackIndex, isPlayerReady: ready, isBuffering: buf } = detail;
                if (playing !== undefined) setIsPlaying(playing);
                if (prog !== undefined) setProgress(prog);
                if (ct !== undefined) setCurrentTime(ct);
                if (dur !== undefined) setDuration(dur);
                if (trackIndex !== undefined) setCurrentIndex(trackIndex - 1);
                if (ready !== undefined) setIsPlayerReady(ready);
                if (buf !== undefined) setIsBuffering(buf);
            };
            window.addEventListener('music-status-update', handleStatus);
            return () => window.removeEventListener('music-status-update', handleStatus);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGlobal, isPlayerReady, currentIndex]);

    // Broadcast status (GLOBAL)
    useEffect(() => {
        if (isGlobal && typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('music-status-update', { 
                detail: { 
                    title: currentTrack.title, 
                    artist: currentTrack.artist,
                    isPlaying,
                    progress,
                    currentTime,
                    duration,
                    trackIndex: currentIndex + 1,
                    totalTracks: tracks.length,
                    isPlayerReady,
                    isBuffering
                } 
            }));
        }
    }, [isGlobal, currentIndex, isPlaying, progress, currentTime, duration, currentTrack, tracks.length, isPlayerReady, isBuffering]);

    // If global, only render the hidden player on client
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (isGlobal) {
        if (!mounted) return null;
        return (
            <div className="hidden h-0 w-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div id="youtube-player-shared"></div>
            </div>
        );
    }

    const thumbnailUrl = `https://img.youtube.com/vi/${currentTrack.videoId}/maxresdefault.jpg`;

    // UI Widget
    return (
        <div ref={containerRef} className="fixed left-0 bottom-8 z-50">
            <AnimatePresence mode="wait">
                {isCollapsed ? (
                    <motion.div
                        key="collapsed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <button
                            onClick={() => setIsCollapsed(false)}
                            className="group flex flex-col items-center justify-between py-4 w-8 h-28 bg-background border-r border-t border-b border-border rounded-r-xl hover:border-accent/40 transition-colors duration-300 cursor-pointer"
                            aria-label="Expand music player"
                        >
                            {/* Animated Equalizer */}
                            <div className="flex items-end gap-[2px] h-5 px-2">
                                <div className={`w-0.5 bg-accent rounded-full ${isPlaying ? 'eq-bar-1' : 'h-2'}`} />
                                <div className={`w-0.5 bg-accent rounded-full ${isPlaying ? 'eq-bar-2' : 'h-2'}`} />
                                <div className={`w-0.5 bg-accent rounded-full ${isPlaying ? 'eq-bar-3' : 'h-2'}`} />
                            </div>

                            {/* Rotated Label */}
                            <span 
                                className="font-mono text-[8px] uppercase tracking-[0.15em] text-foreground/40 group-hover:text-foreground/60 transition-colors"
                                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                            >
                                MUSIC
                            </span>

                            {/* Indicator Dot */}
                            <div className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-accent' : 'bg-foreground/20'}`} />
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="expanded"
                        initial={{ x: '-100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '-100%', opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="w-72 bg-background/95 backdrop-blur-xl border-r border-t border-b border-border rounded-r-2xl p-4 flex flex-col gap-4 shadow-2xl"
                    >
                        {/* Header row */}
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/30">
                                Now Playing
                            </span>
                            <button
                                onClick={() => setIsCollapsed(true)}
                                className="w-6 h-6 flex items-center justify-center text-foreground/40 hover:text-foreground transition-colors rounded-full hover:bg-foreground/5"
                                aria-label="Collapse music player"
                            >
                                <ChevronLeft size={16} />
                            </button>
                        </div>

                        {/* Album Art */}
                        <div className="flex justify-center">
                            <div className={`relative w-16 h-16 rounded-full overflow-hidden border border-border ${isPlaying ? 'motion-safe:animate-spin-slow ring-2 ring-accent/20' : ''}`}>
                                <img
                                    src={thumbnailUrl}
                                    alt={currentTrack.title}
                                    className="object-cover w-full h-full"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${currentTrack.videoId}/0.jpg`;
                                    }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-3 h-3 bg-background rounded-full border border-border shadow-inner" />
                                </div>
                            </div>
                        </div>

                        {/* Track Info */}
                        <div className="text-center min-w-0">
                            <h3 className="font-display font-bold uppercase text-foreground text-sm tracking-tight truncate">
                                {currentTrack.title}
                            </h3>
                            <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 truncate mt-0.5">
                                {currentTrack.artist}
                            </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="flex flex-col gap-1.5">
                            <div
                                className="h-1 w-full bg-white/10 rounded-full cursor-pointer relative overflow-hidden group/bar"
                                onClick={handleProgressClick}
                            >
                                <div
                                    className="absolute top-0 left-0 h-full bg-accent transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <div className="flex justify-between font-mono text-[10px] text-foreground/40">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={handlePrev}
                                className="p-2 text-foreground/60 hover:text-foreground rounded-lg hover:bg-secondary/30 transition-all active:scale-95"
                                aria-label="Previous track"
                            >
                                <SkipBack size={16} fill={currentIndex > 0 ? "currentColor" : "none"} aria-hidden="true" />
                            </button>

                            <button
                                onClick={togglePlay}
                                className="p-3 bg-secondary/50 border border-border rounded-xl text-foreground hover:border-accent/50 transition-all active:scale-95 flex items-center justify-center"
                                aria-label={isPlaying ? "Pause music" : "Play music"}
                            >
                                {isBuffering ? (
                                    <Loader2 size={18} className="animate-spin" />
                                ) : isPlaying ? (
                                    <Pause size={18} fill="currentColor" aria-hidden="true" />
                                ) : (
                                    <Play size={18} fill="currentColor" className="ml-0.5" aria-hidden="true" />
                                )}
                            </button>

                            <button
                                onClick={handleNext}
                                className="p-2 text-foreground/60 hover:text-foreground rounded-lg hover:bg-secondary/30 transition-all active:scale-95"
                                aria-label="Next track"
                            >
                                <SkipForward size={16} fill={currentIndex < tracks.length - 1 ? "currentColor" : "none"} aria-hidden="true" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MusicPlayer;
