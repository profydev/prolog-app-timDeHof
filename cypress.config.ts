import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "58m2cf",
  retries: {
    runMode: 2,
    openMode: 1,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
