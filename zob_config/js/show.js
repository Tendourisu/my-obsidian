// Utility function to collect sections from a file's content
function collectSections(content, level, targetName) {
  const sections = [];
  const lines = content.split('\n');
  let currentSection = null;
  let sectionContent = [];
  
  for (let line of lines) {
    // Check for heading that matches our target level and name
    const headingMatch = line.match(new RegExp(`^#{${level}} (.+)`));
    if (headingMatch) {
      // If we were collecting a section, save it
      if (currentSection === targetName && sectionContent.length > 0) {
        sections.push(sectionContent.join('\n'));
      }
      
      // Start new section if heading matches target
      if (headingMatch[1].trim() === targetName) {
        currentSection = targetName;
        sectionContent = [];
      } else {
        currentSection = null;
      }
      continue;
    }
    
    // If we're in target section, collect content
    if (currentSection === targetName) {
      sectionContent.push(line);
    }
  }
  
  // Don't forget last section
  if (currentSection === targetName && sectionContent.length > 0) {
    sections.push(sectionContent.join('\n'));
  }
  
  return sections;
}

// Main view function
module.exports = async function(dv, input) {
  const {
    files,      // Array of files to process
    kwd,        // Keywords to filter by (optional)
    showHead,   // Whether to show headers
    tars,       // Target sections configuration object
    scale,      // Scale factor for output
    li          // Function to format list items
  } = input;
  
  let output = [];
  
  // Process each file
  for (let page of files) {
    const content = await dv.io.load(page.file.path);
    
    // Process each target section type
    for (let [targetName, level] of Object.entries(tars)) {
      const sections = collectSections(content, level, targetName);
      
      // Filter sections by keywords if specified
      const filteredSections = kwd 
        ? sections.filter(section => kwd.some(k => section.toLowerCase().includes(k.toLowerCase())))
        : sections;
        
      // Format and add each section
      for (let section of filteredSections) {
        if (section.trim()) {
          output.push(li([page, section]));
        }
      }
    }
  }
  
  // Apply scaling if specified
  if (scale && scale !== 1) {
    return dv.paragraph(`<div style="font-size: ${scale * 100}%">${output.join('\n\n')}</div>`);
  }
  
  return output.join('\n\n');
}