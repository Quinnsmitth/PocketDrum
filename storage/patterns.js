
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@pocket_drum_patterns';

// Get all saved patterns
export async function getPatterns() {
  try {
    const storedPatterns = await AsyncStorage.getItem(STORAGE_KEY);

    return storedPatterns ? JSON.parse(storedPatterns) : [];
  } catch (error) {
    console.error('Error loading patterns:', error);
    return [];
  }
}

// Save a new pattern or update an existing one
export async function savePattern(pattern) {
  try {
    const patterns = await getPatterns();
    const now = new Date().toISOString();

    const existingPattern = patterns.find(
      (item) => item.id === pattern.id
    );

    const updatedPattern = {
      ...pattern,
      id: pattern.id || Date.now().toString(),
      createdAt: existingPattern?.createdAt || now,
      updatedAt: now,
    };

    const updatedPatterns = existingPattern
      ? patterns.map((item) =>
          item.id === updatedPattern.id ? updatedPattern : item
        )
      : [...patterns, updatedPattern];

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedPatterns)
    );

    return updatedPattern;
  } catch (error) {
    console.error('Error saving pattern:', error);
    throw error;
  }
}

// Delete a saved pattern
export async function deletePattern(id) {
  try {
    const patterns = await getPatterns();

    const updatedPatterns = patterns.filter(
      (pattern) => pattern.id !== id
    );

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedPatterns)
    );
  } catch (error) {
    console.error('Error deleting pattern:', error);
    throw error;
  }
}

// Get one pattern by its ID
export async function getPatternById(id) {
  try {
    const patterns = await getPatterns();

    return patterns.find((pattern) => pattern.id === id) || null;
  } catch (error) {
    console.error('Error finding pattern:', error);
    return null;
  }
}
