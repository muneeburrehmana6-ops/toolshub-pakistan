import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

// Logs one "tool opened" event to Firestore's toolUsage collection.
// Fails silently (console warning only) so a Firestore hiccup never breaks a tool for the user.
export async function logToolUsage(toolSlug, toolName, user) {
  try {
    await addDoc(collection(db, 'toolUsage'), {
      toolSlug,
      toolName,
      userId: user ? user.uid : null,
      userEmail: user ? user.email : 'anonymous',
      timestamp: serverTimestamp(),
    });
  } catch (err) {
    console.warn('Usage log failed (check Firebase setup):', err.message);
  }
}
