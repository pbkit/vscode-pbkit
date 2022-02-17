import * as os from "os";

export async function getPbCommand(): Promise<string> {
  // @TODO: Need to handle for workspace folder or win32 platform
  // https://github.com/denoland/vscode_deno/blob/0ef2ffa4c3aba32bf6c95712d9e2877c370c6bf5/client/src/util.ts#L18
  const defaultCommand = await getDefaultPbCommand();
  return defaultCommand;
}

function getDefaultPbCommand() {
  switch (os.platform()) {
    case "win32":
      throw new Error("Implement this");
    default:
      return Promise.resolve("pb");
  }
}
