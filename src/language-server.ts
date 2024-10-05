import { exec } from "child_process";
import { platform } from "os";
import { ExtensionContext } from "vscode";
import { ServerOptions, TransportKind } from "vscode-languageclient/node";

type GetServerOptionsFn = (context: ExtensionContext) => Promise<ServerOptions>;

export const getServerOptions: GetServerOptionsFn = async (context) => {
  // if (await commandExists("pb")) {
  //   return await getDenoServerOptions(context);
  // }
  return await getNodeServerOptions(context);
};

export const getDenoServerOptions: GetServerOptionsFn = async () => {
  return {
    run: {
      command: "pb",
      args: ["lsp"],
      options: { env: { ...process.env, NO_COLOR: true } },
    },
    debug: {
      command: "pb",
      args: ["lsp"],
      options: { env: { ...process.env, NO_COLOR: true } },
    },
  };
};

export const getNodeServerOptions: GetServerOptionsFn = async (context) => {
  return {
    run: {
      module: context.asAbsolutePath(
        "dist/@pbkit/pb-cli/esm/cli/pb/entrypoint.js",
      ),
      transport: TransportKind.stdio,
      args: ["lsp"],
    },
    debug: {
      module: context.asAbsolutePath(
        "node_modules/@pbkit/pb-cli/esm/cli/pb/entrypoint.js",
      ),
      transport: TransportKind.stdio,
      args: ["lsp"],
    },
  };
};

export function commandExists(command: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (platform() === "win32") resolve(false);
    else exec(`command -v ${command}`, (error) => resolve(!error));
  });
}
