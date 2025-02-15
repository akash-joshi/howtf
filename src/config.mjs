import inquirer from "inquirer";

/** @typedef {import("conf").default} Conf */

export const configurator = (/** @type {{ config: Conf }} */ { config }) => {
  const apiKey = config.get("apiKey");
  const model = config.get("model");

  const apiKeyCopy = `API Key${apiKey ? " (Already set)" : ""}`;
  const modelCopy = `Model${model ? ` (${model})` : ""}`;

  /** @type {import("openai").OpenAI.ChatModel[]} */
  const modelChoices = [
    "gpt-3.5-turbo",
    "gpt-4o",
    "gpt-4o-mini",
    "o1-preview",
    "o1",
    "o1-mini",
    "o3-mini",
  ];

  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to configure?",
        choices: [apiKeyCopy, modelCopy],
      },
      {
        type: "input",
        name: "apiKey",
        message: "Enter your new API key (Press enter to keep unchanged):",
        when: (answers) => answers.action.includes("API Key"),
      },
      {
        type: "list",
        name: "model",
        message: "Select the model:",
        choices: modelChoices,
        when: (answers) => answers.action.includes("Model"),
      },
    ])
    .then((answers) => {
      if (answers.apiKey) {
        config.set("apiKey", answers.apiKey);
        console.log("API key updated successfully.");
      }
      if (answers.model) {
        config.set("model", answers.model);
        console.log("Model updated successfully.");
      }
    });
};
