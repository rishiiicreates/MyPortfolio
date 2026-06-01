import React, { useEffect, useState, useRef } from 'react';

const OnekoFollower = () => {
    const [isMounted, setIsMounted] = useState(false);
    const nekoEl = useRef<HTMLDivElement>(null);
    
    // Core state refs
    const pos = useRef({ x: 32, y: 32 });
    const mouse = useRef({ x: 0, y: 0 });
    const frameCount = useRef(0);
    const idleTime = useRef(0);
    const idleAnimation = useRef<string | null>(null);
    const idleAnimationFrame = useRef(0);
    
    const NEKO_SPEED = 10;
    const spriteSets: Record<string, number[][]> = {
        idle: [[-3, -3]],
        alert: [[-7, -3]],
        scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
        scratchWallN: [[0, 0], [0, -1]],
        scratchWallS: [[-7, -1], [-6, -2]],
        scratchWallE: [[-2, -2], [-2, -3]],
        scratchWallW: [[-4, 0], [-4, -1]],
        tired: [[-3, -2]],
        sleeping: [[-2, 0], [-2, -1]],
        N: [[-1, -2], [-1, -3]],
        NE: [[0, -2], [0, -3]],
        E: [[-3, 0], [-3, -1]],
        SE: [[-5, -1], [-5, -2]],
        S: [[-6, -3], [-7, -2]],
        SW: [[-5, -3], [-6, -1]],
        W: [[-4, -2], [-4, -3]],
        NW: [[-1, 0], [-1, -1]],
    };

    useEffect(() => {
        setIsMounted(true);
        const handleMouseMove = (event: MouseEvent) => {
            mouse.current = { x: event.clientX, y: event.clientY };
        };

        window.addEventListener("mousemove", handleMouseMove);
        
        let lastFrameTimestamp = 0;
        let animationFrameId: number;

        const setSprite = (name: string, frame: number) => {
            if (!nekoEl.current) return;
            const set = spriteSets[name] || spriteSets.idle;
            const sprite = set[frame % set.length];
            nekoEl.current.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
        };

        const resetIdle = () => {
            idleAnimation.current = null;
            idleAnimationFrame.current = 0;
        };

        const idleLogic = () => {
            idleTime.current += 1;
            if (idleTime.current > 10 && Math.floor(Math.random() * 200) === 0 && idleAnimation.current === null) {
                const available = ["sleeping", "scratchSelf"];
                if (pos.current.x < 32) available.push("scratchWallW");
                if (pos.current.y < 32) available.push("scratchWallN");
                if (pos.current.x > window.innerWidth - 32) available.push("scratchWallE");
                if (pos.current.y > window.innerHeight - 32) available.push("scratchWallS");
                idleAnimation.current = available[Math.floor(Math.random() * available.length)];
            }

            switch (idleAnimation.current) {
                case "sleeping":
                    if (idleAnimationFrame.current < 8) {
                        setSprite("tired", 0);
                    } else {
                        setSprite("sleeping", Math.floor(idleAnimationFrame.current / 4));
                    }
                    if (idleAnimationFrame.current > 192) resetIdle();
                    break;
                case "scratchWallN":
                case "scratchWallS":
                case "scratchWallE":
                case "scratchWallW":
                case "scratchSelf":
                    setSprite(idleAnimation.current, idleAnimationFrame.current);
                    if (idleAnimationFrame.current > 9) resetIdle();
                    break;
                default:
                    setSprite("idle", 0);
                    return;
            }
            idleAnimationFrame.current += 1;
        };

        const updateFrame = () => {
            if (!nekoEl.current) return;
            frameCount.current += 1;
            const diffX = pos.current.x - mouse.current.x;
            const diffY = pos.current.y - mouse.current.y;
            const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

            if (distance < NEKO_SPEED || distance < 48) {
                idleLogic();
            } else {
                idleAnimation.current = null;
                idleAnimationFrame.current = 0;

                if (idleTime.current > 1) {
                    setSprite("alert", 0);
                    idleTime.current = Math.min(idleTime.current, 7);
                    idleTime.current -= 1;
                    return;
                }

                let direction = "";
                direction += diffY / distance > 0.5 ? "N" : "";
                direction += diffY / distance < -0.5 ? "S" : "";
                direction += diffX / distance > 0.5 ? "W" : "";
                direction += diffX / distance < -0.5 ? "E" : "";
                setSprite(direction, frameCount.current);

                pos.current.x -= (diffX / distance) * NEKO_SPEED;
                pos.current.y -= (diffY / distance) * NEKO_SPEED;

                pos.current.x = Math.min(Math.max(16, pos.current.x), window.innerWidth - 16);
                pos.current.y = Math.min(Math.max(16, pos.current.y), window.innerHeight - 16);

                idleTime.current = 0;
            }

            nekoEl.current.style.left = `${pos.current.x - 16}px`;
            nekoEl.current.style.top = `${pos.current.y - 16}px`;
        };

        const loop = (timestamp: number) => {
            if (timestamp - lastFrameTimestamp > 100) {
                lastFrameTimestamp = timestamp;
                updateFrame();
            }
            animationFrameId = window.requestAnimationFrame(loop);
        };

        animationFrameId = window.requestAnimationFrame(loop);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.cancelAnimationFrame(animationFrameId);
        };
    }, []);

    if (!isMounted) return null;

    return (
        <div
            ref={nekoEl}
            id="oneko"
            aria-hidden="true"
            style={{
                width: "32px",
                height: "32px",
                position: "fixed",
                pointerEvents: "none",
                imageRendering: "pixelated",
                left: `${pos.current.x - 16}px`,
                top: `${pos.current.y - 16}px`,
                zIndex: 2147483647,
                backgroundImage: "url(/oneko.gif)",
            }}
        />
    );
};

export default OnekoFollower;
