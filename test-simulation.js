// First few lines of your simulation file
try {
    // Canvas setup and configuration
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Test canvas creation
    if (canvas && ctx) {
        window.testCanvas(true);
    } else {
        window.testCanvas(false);
    }

    // Make canvas fill the window
    function setupCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
    }

    // Rest of your original SETTINGS and Bird class code here
    // [Previous code remains exactly the same until the init function]

    // Modified init function with testing
    function init() {
        setupCanvas();
        const simulation = new FlockSimulation();
        // Test if animation starts
        let frames = 0;
        function testLoop() {
            frames++;
            simulation.update();
            simulation.draw();
            if (frames < 10) {
                requestAnimationFrame(testLoop);
            } else {
                window.testAnimation(true);
                // Continue with normal animation
                gameLoop(simulation);
            }
        }
        testLoop();
    }

    // Start everything when the window loads
    window.onload = init;

    // Signal that JavaScript loaded successfully
    updateStatus('jsStatus', true);

} catch (error) {
    // Log any errors
    console.error('Simulation Error:', error);
    updateStatus('jsStatus', false, 'Error in simulation code: ' + error.message);
}
