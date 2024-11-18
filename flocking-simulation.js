/*
  Educational Flocking Simulation
  This code demonstrates how simple rules can create complex, natural-looking behavior.
  It simulates how birds (or other creatures) might flock together using three main rules:
  1. Separation: Avoid crowding neighbors
  2. Alignment: Try to move in the same direction as neighbors
  3. Cohesion: Try to stay close to neighbors
  
  LEARNING GOALS:
  - Understand how simple rules create complex behavior
  - Learn about vectors and basic physics
  - Practice modifying code to see cause and effect
  - Explore mathematical concepts in a visual way

  This code is based on Reynolds work on Steering Behaviors For Autonomous Characters https://www.red3d.com/cwr/steer/gdc99/
  As you get more proficient with code it is suggested you start read things like this paper to learn how you might create
  more complex programs
*/

// Canvas setup and configuration
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Make canvas fill the window
function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
}

/* 
  SIMULATION SETTINGS
  These values control how the simulation behaves.
  SAFE EXPERIMENTING RANGES for students:
  - flockSize: 2 to 100 (more birds = slower simulation)
  - maxSpeed: 1 to 10 (higher = faster movement)
  - alignmentForce: 0 to 5 (higher = birds match direction more strongly)
  - cohesionForce: 0 to 1 (higher = tighter flocks)
  - separationForce: 0 to 5 (higher = birds avoid each other more strongly)
*/
const SETTINGS = {
    // Population Settings
    flockSize: 50,        // Try changing this! More birds = more complex interactions
    
    // Movement Settings
    maxSpeed: 5,         // Maximum movement speed
    minSpeed: 1,         // Minimum movement speed
    
    /* Behavior Weights - These control how strongly each rule affects the birds
       Think of these like personality traits for the flock: */
    alignmentForce: 3,    // How much they want to fly in the same direction
    cohesionForce: .05,   // How much they want to stay together
    separationForce: 1,   // How much they want personal space
    
    /* Vision Settings - These control what each bird can "see"
       Just like real animals, our birds need to sense their environment */
    visionRadius: 50,      // How far they can see their neighbors
    separationRadius: 100, // Their personal space bubble
    
    // Visualization Helpers - These help you see what's happening
    showVisionRadius: true,     // Shows what each bird can see
    showSeparationRadius: true, // Shows each bird's personal space
    visionColor: 'rgba(255, 255, 255, 0.1)',     
    separationColor: 'rgba(255, 0, 0, 0.1)',      

    /* Random Movement Settings - Adds some unpredictability
       This makes the simulation more natural and interesting */
    randomForce: 0.9,              // Strength of random movements
    randomMovementInterval: 6,      // How often they change direction randomly
    randomMovementChance: 0.1       // Probability of random movement
};

/* Bird (Boid) Class
   Each bird is an independent agent making its own decisions
   based on what it can see around it. This is called an
   "agent-based simulation" */
class Bird {
    constructor() {
        // Start at random position on screen
        this.position = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        };
        
        // Start moving in a random direction
        this.velocity = {
            x: (Math.random() * 2 - 1) * SETTINGS.maxSpeed,
            y: (Math.random() * 2 - 1) * SETTINGS.maxSpeed
        };
        
        // Properties for random movement
        this.randomDirection = { x: 0, y: 0 };
        this.frameCount = Math.floor(Math.random() * SETTINGS.randomMovementInterval);
    }

    /* CORE BEHAVIOR 1: Separation
       This prevents crowding and collision
       Think of it like a personal space bubble - birds will try to
       maintain some distance from each other */
    separate(neighbors) {
        let steer = { x: 0, y: 0 };
        
        neighbors.forEach(other => {
            let distance = this.distanceTo(other);
            if (distance < SETTINGS.separationRadius && distance > 0) {
                // Create a vector pointing away from the neighbor
                let diff = {
                    x: (this.position.x - other.position.x) / distance,
                    y: (this.position.y - other.position.y) / distance
                };
                steer.x += diff.x;
                steer.y += diff.y;
            }
        });
        
        return steer;
    }

    /* CORE BEHAVIOR 2: Alignment
       Birds try to match velocity with their neighbors
       This creates the smooth, coordinated movement you see in real flocks */
    align(neighbors) {
        let averageVelocity = { x: 0, y: 0 };
        
        if (neighbors.length > 0) {
            neighbors.forEach(bird => {
                averageVelocity.x += bird.velocity.x;
                averageVelocity.y += bird.velocity.y;
            });
            
            // Calculate the average by dividing by number of neighbors
            averageVelocity.x /= neighbors.length;
            averageVelocity.y /= neighbors.length;
        }
        
        return averageVelocity;
    }

    /* CORE BEHAVIOR 3: Cohesion
       Birds try to move toward the center of their local group
       This is what keeps the flock together instead of spreading out */
    cohere(neighbors) {
        let center = { x: 0, y: 0 };
        
        if (neighbors.length > 0) {
            // Find the center point of all neighbors
            neighbors.forEach(bird => {
                center.x += bird.position.x;
                center.y += bird.position.y;
            });
            
            // Calculate vector toward center
            center.x = center.x / neighbors.length - this.position.x;
            center.y = center.y / neighbors.length - this.position.y;
        }
        
        return center;
    }

    // Helper function to calculate distance between birds
    distanceTo(other) {
        let dx = other.position.x - this.position.x;
        let dy = other.position.y - this.position.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Find all neighbors within vision radius
    getNeighbors(flock) {
        return flock.filter(other => {
            return other !== this && 
                   this.distanceTo(other) < SETTINGS.visionRadius;
        });
    }

    /* Random Movement
       This adds natural-looking variation to movement
       Without this, the simulation looks too mechanical */
    randomMove() {
        this.frameCount++;
        
        if (this.frameCount >= SETTINGS.randomMovementInterval) {
            this.frameCount = 0;
            
            if (Math.random() < SETTINGS.randomMovementChance) {
                const angle = Math.random() * Math.PI * 2;
                this.randomDirection = {
                    x: Math.cos(angle),
                    y: Math.sin(angle)
                };
            }
        }
        
        return {
            x: this.randomDirection.x * SETTINGS.randomForce,
            y: this.randomDirection.y * SETTINGS.randomForce
        };
    }

    /* Main Update Function
       This combines all the behaviors to create the final movement
       Think of it like a decision-making process that happens every frame */
    update(flock) {
        let neighbors = this.getNeighbors(flock);
        
        // Calculate all behavioral forces
        let separation = this.separate(neighbors);
        let alignment = this.align(neighbors);
        let cohesion = this.cohere(neighbors);
        let random = this.randomMove();
        
        // Apply the force weights from settings
        separation.x *= SETTINGS.separationForce;
        separation.y *= SETTINGS.separationForce;
        alignment.x *= SETTINGS.alignmentForce;
        alignment.y *= SETTINGS.alignmentForce;
        cohesion.x *= SETTINGS.cohesionForce;
        cohesion.y *= SETTINGS.cohesionForce;
        
        // Combine all forces to update velocity
        this.velocity.x += separation.x + alignment.x + cohesion.x + random.x;
        this.velocity.y += separation.y + alignment.y + cohesion.y + random.y;
        
        // Limit speed to make movement more realistic
        let speed = Math.sqrt(
            this.velocity.x * this.velocity.x + 
            this.velocity.y * this.velocity.y
        );
        
        if (speed > SETTINGS.maxSpeed) {
            this.velocity.x = (this.velocity.x / speed) * SETTINGS.maxSpeed;
            this.velocity.y = (this.velocity.y / speed) * SETTINGS.maxSpeed;
        }
        
        // Update position based on velocity
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        
        // Wrap around screen edges
        this.position.x = (this.position.x + canvas.width) % canvas.width;
        this.position.y = (this.position.y + canvas.height) % canvas.height;
    }

    // Visualization of the bird and its perception ranges
    draw() {
        // Draw vision and separation radius circles
        if (SETTINGS.showVisionRadius) {
            ctx.beginPath();
            ctx.arc(
                this.position.x, 
                this.position.y, 
                SETTINGS.visionRadius, 
                0, 
                Math.PI * 2
            );
            ctx.strokeStyle = SETTINGS.visionColor;
            ctx.stroke();
        }
        
        if (SETTINGS.showSeparationRadius) {
            ctx.beginPath();
            ctx.arc(
                this.position.x, 
                this.position.y, 
                SETTINGS.separationRadius, 
                0, 
                Math.PI * 2
            );
            ctx.strokeStyle = SETTINGS.separationColor;
            ctx.stroke();
        }
        
        // Draw the bird as a triangle pointing in its direction of movement
        let angle = Math.atan2(this.velocity.y, this.velocity.x);
        
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(angle);
        
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(-5, 5);
        ctx.lineTo(-5, -5);
        ctx.closePath();
        
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.restore();
    }
}

/* Flock Management Class
   This class manages the entire simulation, updating and
   drawing all birds each frame */
class FlockSimulation {
    constructor() {
        this.birds = [];
        for (let i = 0; i < SETTINGS.flockSize; i++) {
            this.birds.push(new Bird());
        }
    }

    update() {
        this.birds.forEach(bird => bird.update(this.birds));
    }

    draw() {
        // Clear and fill background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.birds.forEach(bird => bird.draw());
    }
}

// Main animation loop
function gameLoop(simulation) {
    simulation.update();
    simulation.draw();
    requestAnimationFrame(() => gameLoop(simulation));
}

// Initialize everything
function init() {
    setupCanvas();
    const simulation = new FlockSimulation();
    gameLoop(simulation);
}

// Start the simulation when the page loads
window.onload = init;

/* SUGGESTED EXPERIMENTS FOR STUDENTS:
   1. Try changing flockSize to see how more or fewer birds affect the simulation
   2. Adjust the force settings to create different flock behaviors:
      - High cohesion + low separation = tight, dense flocks
      - Low cohesion + high separation = scattered, independent birds
   3. Change the vision radius to see how it affects group awareness
   4. Modify the random movement settings to make behavior more or less chaotic
   5. Try changing the colors or sizes of the birds and their vision circles
   
   ADVANCED CHALLENGES:
   1. Add a new behavior (like avoiding mouse cursor)
   2. Create different "species" with different rules
   3. Add obstacles that birds must avoid
   4. Implement "predator" birds that others flee from
*/
