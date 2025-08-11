import React, { useRef, useEffect, useCallback } from "react";

const ClickSpark = ({
  sparkColor = "#fff",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1.0,
  children
}) => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  // This ref will track if the animation loop is currently active.
  const animationFrameIdRef = useRef(null);

  // This effect handles resizing the canvas to match its parent container.
  // No changes were needed here, it's already efficient.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout;

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(parent);

    resizeCanvas();

    return () => {
      ro.disconnect();
      clearTimeout(resizeTimeout);
      // Ensure we cancel any pending animation frame when the component unmounts.
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  // Memoized easing function. No changes needed.
  const easeFunc = useCallback(
    (t) => {
      switch (easing) {
        case "linear":
          return t;
        case "ease-in":
          return t * t;
        case "ease-in-out":
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default: // "ease-out"
          return t * (2 - t);
      }
    },
    [easing]
  );

  // The core animation logic, now significantly optimized.
  const draw = useCallback((timestamp) => {
    const canvas = canvasRef.current;
    if (!canvas || !sparksRef.current.length) {
      // If there are no sparks, stop the animation loop.
      animationFrameIdRef.current = null;
      return;
    }
    
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Filter out sparks that have completed their animation.
    sparksRef.current = sparksRef.current.filter((spark) => {
      const elapsed = timestamp - spark.startTime;
      if (elapsed >= duration) {
        return false; // Remove the spark.
      }

      const progress = elapsed / duration;
      const eased = easeFunc(progress);

      const distance = eased * sparkRadius * extraScale;
      // The line gets smaller as it moves outwards.
      const lineLength = sparkSize * (1 - eased);

      const x1 = spark.x + distance * Math.cos(spark.angle);
      const y1 = spark.y + distance * Math.sin(spark.angle);
      const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
      const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

      ctx.strokeStyle = sparkColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      return true; // Keep the spark for the next frame.
    });

    // If there are still sparks left, request the next frame.
    if (sparksRef.current.length > 0) {
      animationFrameIdRef.current = requestAnimationFrame(draw);
    } else {
      // If all sparks are gone, ensure the loop is marked as stopped.
      animationFrameIdRef.current = null;
      // Also clear the canvas one last time to remove any artifacts.
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [sparkColor, sparkSize, sparkRadius, duration, easeFunc, extraScale]);


  const handleClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const now = performance.now();
    const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now,
    }));

    sparksRef.current.push(...newSparks);

    // **KEY CHANGE**: Only start the animation loop if it's not already running.
    if (!animationFrameIdRef.current) {
      animationFrameIdRef.current = requestAnimationFrame(draw);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        zIndex: 1, // Added z-index to ensure it sits above content if needed.
      }}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none"
        }}
      />
      {children}
    </div>
  );
};

export default React.memo(ClickSpark);
