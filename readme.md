# Integrating Cultural Knowledge in Programming Education: An Indigenous Approach

This repository contains supporting materials for the academic paper "Integrating Cultural Knowledge in Programming Education: An Indigenous Approach". The materials demonstrate practical implementations of inquiry-based programming education that integrates cultural perspectives.

## Repository Contents

### 1. Flocking Simulation Files
#### `flocking-simulation.js`
- An interactive simulation demonstrating emergent behavior through simple rules
- Designed as an introductory programming artifact for secondary/high school students
- Features:
  - Visual representation of "flocking" behavior similar to birds
  - Configurable parameters for experimentation
  - Detailed comments explaining each concept
  - Built-in visualization of bird vision and interaction ranges
  - Suggested experiments and learning challenges

#### `index.html`
- Main HTML file to run the simulation
- Includes:
  - Information overlay explaining the simulation
  - Basic instructions for students
  - Clean, distraction-free interface
  - Responsive design for different screen sizes

#### Testing Files
- `test.html`: A diagnostic tool to verify proper setup
- Features:
  - Tests JavaScript file loading
  - Verifies canvas creation
  - Checks animation functionality
  - Provides clear error messages if issues occur

### 2. 18-Week Course Framework
- Complete course framework for computer programming instruction
- Designed as a project-based model that builds up skill and knowledge starting from the initial html and javascript files
- Emphasizes student-driven exploration and discovery

## Setup Instructions

1. Basic Setup:
   ```
   - Create a new folder for the project
   - Download all files into this folder
   - Open index.html in a web browser to run the simulation
   ```

2. Testing Setup:
   ```
   - Ensure all files are in the same directory
   - Open test.html first to verify everything works
   - Check browser console (F12) for any error messages
   ```

3. For Development:
   ```
   - Recommended: Use Visual Studio Code or other integrated development environment (IDE)
   - Install Live Server extension for best results
   - Use browser developer tools to monitor performance
   ```

## Educational Philosophy

This course material represents a departure from conventional educational approaches that rely on rote learning, students are encouraged to:

- Explore code actively
- Make modifications to existing programs
- Learn through inquiry and experimentation
- Set personal learning goals
- Connect programming concepts with cultural knowledge and the world around them
- Develop understanding through hands-on exploration

## Usage Guidelines for the Simulation

### For Students
1. Start with the basic simulation
2. Experiment with settings in the SETTINGS object
3. Observe how changes affect bird behavior
4. Use the visualization tools (vision and separation circles) to understand interactions
5. Try the suggested experiments in the code comments

### For Teachers
1. Use the simulation to demonstrate:
   - Complex systems emerging from simple rules
   - Basic physics and vector mathematics
   - Programming concepts like classes and objects
   - The scientific method (that is both Indigenous and Eurocentric - see Greg Cajete for more on this) through observation and experimentation
2. Encourage students to:
   - Make hypotheses about parameter changes
   - Document their observations
   - Share discoveries with classmates
   - Connect behaviors to real-world examples

## Course Design Principles

1. **Early Exploration**: Students begin modifying and experimenting with code from the first day
2. **Inquiry-Based Learning**: Emphasis on discovery rather than prescribed solutions
3. **Personal Agency**: Students develop their own goals and learning pathways
4. **Cultural Integration**: Programming concepts are connected to cultural knowledge and perspectives
5. **Progressive Development**: Gradual building of skills through experimentation and modification

## Technical Requirements

- Modern web browser (Chrome, Firefox, Safari, or Edge recommended)
- No additional software required for basic usage
- Text editor (VS Code recommended) for code modification
- Basic understanding of HTML and JavaScript for modifications

## Related Paper

For more detailed information about the theoretical framework and research behind this approach, please refer to the paper "Integrating Cultural Knowledge in Programming Education: An Indigenous Approach".

## Troubleshooting

Common Issues and Solutions:
1. Blank screen:
   - Verify all files are in the same directory
   - Check console for JavaScript errors
   - Ensure filename cases match exactly

2. Performance issues:
   - Reduce flockSize in SETTINGS
   - Close other browser tabs
   - Check CPU usage

3. File loading errors:
   - Verify filenames match exactly
   - Check file permissions
   - Try using a local server (like VS Code's Live Server)
