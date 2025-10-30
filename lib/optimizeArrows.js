/**
 * Optimize Excalidraw arrow coordinates by aligning them to the center of bound element edges
 */

/**
 * Calculate the distance between two points
 */
function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * Determine which edge of an element a point is closest to and return the center of that edge
 */
function getEdgeCenter(element, pointX, pointY) {
  const x = element.x || 0;
  const y = element.y || 0;
  const width = element.width || 100;
  const height = element.height || 100;

  // Calculate centers of all four edges
  const edges = {
    top: { x: x + width / 2, y: y },
    bottom: { x: x + width / 2, y: y + height },
    left: { x: x, y: y + height / 2 },
    right: { x: x + width, y: y + height / 2 }
  };

  // Find the closest edge
  let closestEdge = 'top';
  let minDistance = distance(pointX, pointY, edges.top.x, edges.top.y);

  for (const [edgeName, edgePoint] of Object.entries(edges)) {
    const dist = distance(pointX, pointY, edgePoint.x, edgePoint.y);
    if (dist < minDistance) {
      minDistance = dist;
      closestEdge = edgeName;
    }
  }

  return edges[closestEdge];
}

/**
 * Optimize arrow/line coordinates to align with bound element edge centers
 */
export function optimizeExcalidrawCode(codeString) {
  if (!codeString || typeof codeString !== 'string') {
    return codeString;
  }

  try {
    // Step 1: Parse JSON string to array
    const cleanedCode = codeString.trim();
    const arrayMatch = cleanedCode.match(/\[[\s\S]*\]/);
    if (!arrayMatch) {
      console.error('No array found in code');
      return codeString;
    }

    const elements = JSON.parse(arrayMatch[0]);
    if (!Array.isArray(elements)) {
      console.error('Parsed code is not an array');
      return codeString;
    }

    // Create a map of elements by ID for quick lookup
    const elementMap = new Map();
    elements.forEach(el => {
      if (el.id) {
        elementMap.set(el.id, el);
      }
    });

    // Step 2 & 3: Find and optimize arrows/lines with bound elements
    const optimizedElements = elements.map(element => {
      // Only process arrow and line elements
      if (element.type !== 'arrow' && element.type !== 'line') {
        return element;
      }

      const optimized = { ...element };
      let needsOptimization = false;

      

      // Check if arrow has start binding
      if (element.start && element.start.id) {
        const boundElement = elementMap.get(element.start.id);
        if (boundElement) {
          // Calculate optimal start point
          const startX = element.x || 0;
          const startY = element.y || 0;
          const edgeCenter = getEdgeCenter(boundElement, startX, startY);
          
          // Update arrow coordinates
          optimized.x = edgeCenter.x;
          optimized.y = edgeCenter.y;
          needsOptimization = true;
        }
      }

      // Check if arrow has end binding
      if (element.end && element.end.id) {
        const boundElement = elementMap.get(element.end.id);
        if (boundElement) {
          // Calculate optimal end point
          const endX = (element.x || 0) + (element.width || 0);
          const endY = (element.y || 0) + (element.height || 0);
          const edgeCenter = getEdgeCenter(boundElement, endX, endY);
          
          // Update arrow width and height to maintain end point at edge center
          const startX = optimized.x || 0;
          const startY = optimized.y || 0;
          optimized.width = edgeCenter.x - startX;
          optimized.height = edgeCenter.y - startY;
          needsOptimization = true;
        }
      }

      // Fix Excalidraw rendering bug: line-type elements with width 0 should be 1
      if ((element.type === 'arrow' || element.type === 'line') && element.width === 0) {
        optimized.width = 1;
        needsOptimization = true;
      }

      return needsOptimization ? optimized : element;

    });

    // Step 4: Convert back to JSON string
    return JSON.stringify(optimizedElements, null, 2);
  } catch (error) {
    console.error('Failed to optimize arrows:', error);
    return codeString; // Return original code if optimization fails
  }
}

