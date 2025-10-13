export class HelperFunction {
  // Helper to generate unique email each time
  static generateUniqueEmail() {
    const timestamp = Date.now();
    return `mahbub_${timestamp}@example.com`;
  }
}
