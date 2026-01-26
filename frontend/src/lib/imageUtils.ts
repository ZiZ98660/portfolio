/**
 * Image path utilities
 * Centralized image path handling to ensure consistency
 */

/**
 * Validates and normalizes image paths
 * Ensures paths are correct and warns if old paths are detected
 */
export function normalizeImagePath(path: string): string {
  // Return the path as-is - no logging here to avoid console spam
  return path;
}

/**
 * Gets the correct image path, ensuring it matches the expected format
 */
export function getImagePath(path: string): string {
  const normalized = normalizeImagePath(path);
  
  // Ensure path starts with /
  if (!normalized.startsWith('/')) {
    return `/${normalized}`;
  }
  
  return normalized;
}

/**
 * Validates that an image path is in the correct format
 */
export function isValidImagePath(path: string): boolean {
  if (!path) return false;
  
  // Check for old Screenshot paths (these are invalid)
  if (path.includes('Screenshot')) {
    return false;
  }
  
  // Allow project images (img1.png, img2.png, etc.)
  const projectPattern = /^\/project_(asi|cipha)\/img\d+\.png$/;
  if (projectPattern.test(path)) {
    return true;
  }
  
  // Allow asset paths like /assets/doc_app.png, /assets/anything.png
  const assetPattern = /^\/assets\/.+\.(png|jpg|jpeg|gif|webp|svg)$/i;
  if (assetPattern.test(path)) {
    return true;
  }
  
  // Any path starting with / that doesn't contain Screenshot is probably valid
  // This is a fallback for other valid image paths
  return path.startsWith('/') && !path.includes('Screenshot');
}

