import fs from "fs-extra";
import path from "path";

export async function getMergedConfig(cliOptions: any) {
  const configPath = path.resolve("vpi18n.config.json");
  const fileConfig = (await fs.pathExists(configPath))
    ? await fs.readJson(configPath)
    : {};

  // Priority: Command line arguments > Configuration file > Default value
  return {
    source: cliOptions.source || fileConfig.source || "docs",
    target: cliOptions.target || fileConfig.target || "en",
    model: cliOptions.model || fileConfig.model || "gpt-4o-mini",
    glossary: cliOptions.glossary || fileConfig.glossary || null,
  };
}
