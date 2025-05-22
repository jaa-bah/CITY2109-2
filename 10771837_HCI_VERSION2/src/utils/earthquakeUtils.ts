// Magnitude color thresholds and their corresponding colors
const MAGNITUDE_COLORS = {
  MINOR: { threshold: 2.5, color: '#007AFF' },    // Blue
  LIGHT: { threshold: 4.0, color: '#34C759' },    // Green
  MODERATE: { threshold: 5.0, color: '#FFFF00' }, // Yellow
  STRONG: { threshold: 6.0, color: '#FF9500' },   // Orange
  MAJOR: { threshold: 7.0, color: '#FF3B30' },    // Red
  GREAT: { threshold: Infinity, color: '#DC143C' } // Crimson
} as const;

/**
 * Get color based on earthquake magnitude
 * @param magnitude The earthquake magnitude
 * @returns Hex color code
 */
export const getMagnitudeColor = (magnitude: number): string => {
  for (const { threshold, color } of Object.values(MAGNITUDE_COLORS)) {
    if (magnitude < threshold) {
      return color;
    }
  }
  return MAGNITUDE_COLORS.GREAT.color;
};

/**
 * Get magnitude description based on value
 * @param magnitude The earthquake magnitude
 * @returns Description of the magnitude
 */
export const getMagnitudeDescription = (magnitude: number): string => {
  for (const [description, { threshold }] of Object.entries(MAGNITUDE_COLORS)) {
    if (magnitude < threshold) {
      return description.charAt(0) + description.slice(1).toLowerCase();
    }
  }
  return 'Great';
};

export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}; 