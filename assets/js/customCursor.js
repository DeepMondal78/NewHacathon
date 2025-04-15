document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const cursorDot = cursor.querySelector('.cursor-dot');
    const trailSegments = document.querySelector('.trail-segments');
    const trailLength = 10;
    let isMoving = false;
    let isMouseDown = false;
    let mousePosition = { x: -100, y: -100 };
    let movementTimeout = null;
    let animationFrameId = null;

    // Create trail segments
    for (let i = 0; i < trailLength; i++) {
        const segment = document.createElement('div');
        segment.className = 'trail-segment';
        trailSegments.appendChild(segment);
    }

    const segments = document.querySelectorAll('.trail-segment');

    // Handle mouse movement
    const handleMouseMove = (e) => {
        const { clientX: x, clientY: y } = e;
        mousePosition = { x, y };

        // Update cursor position
        gsap.to(cursor, {
            x,
            y,
            duration: 0.8,
            ease: "power2.out"
        });

        isMoving = true;
        if (movementTimeout) {
            clearTimeout(movementTimeout);
        }

        movementTimeout = setTimeout(() => {
            isMoving = false;
        }, 500);
    };

    // Handle mouse down
    const handleMouseDown = () => {
        isMouseDown = true;
        gsap.to(cursor, {
            width: 50,
            height: 50,
            borderColor: "var(--green)",
            boxShadow: "0 0 25px rgba(255, 255, 255, 0.5)",
            duration: 0.2,
            ease: "power2.out"
        });
    };

    // Handle mouse up
    const handleMouseUp = () => {
        isMouseDown = false;
        gsap.to(cursor, {
            width: 25,
            height: 25,
            borderColor: "var(--white)",
            boxShadow: "none",
            duration: 0.2,
            ease: "power2.out"
        });
    };

    // Animation loop for trail segments
    function animateTrail() {
        segments.forEach((segment, index) => {
            const delay = (index + 1) * 0.05;

            gsap.to(segment, {
                x: mousePosition.x,
                y: mousePosition.y,
                duration: 0.3,
                delay,
                opacity: isMoving || isMouseDown ? 1 - index / trailLength : 0,
                ease: "power2.out",
                scale: 1 + index / trailLength,
                boxShadow: isMoving || isMouseDown
                    ? `0 0 10px rgba(255, 255, 255, ${0.2 + index / trailLength})`
                    : "none"
            });
        });

        if (isMoving || isMouseDown) {
            animationFrameId = requestAnimationFrame(animateTrail);
        }
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Start animation
    animateTrail();

    // Cleanup
    return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        if (movementTimeout) {
            clearTimeout(movementTimeout);
        }
    };
});