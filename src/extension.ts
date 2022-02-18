import * as vscode from "vscode";
import * as commands from "./commands";
import { PbkitExtensionContext } from "./types";
import { ENABLEMENT_FLAG, EXTENSION_NS } from "./constants";

const extensionContext = {} as PbkitExtensionContext;

export async function activate(context: vscode.ExtensionContext) {
  extensionContext.clientOptions = {
    documentSelector: [
      { scheme: "file", language: "proto" },
    ],
    diagnosticCollectionName: "pbkit",
  };

  const registerCommand = createRegisterCommand(context);
  registerCommand("restart", commands.startLanguageServer);

  await commands.startLanguageServer(context, extensionContext)();
}

export function deactivate() {
  const client = extensionContext.client;
  extensionContext.client = undefined;
  vscode.commands.executeCommand("setContext", ENABLEMENT_FLAG, false);
  return client?.stop();
}

function createRegisterCommand(
  context: vscode.ExtensionContext,
): (name: string, factory: commands.Factory) => void {
  return function registerCommand(
    name: string,
    factory: (
      context: vscode.ExtensionContext,
      extensionContext: PbkitExtensionContext,
    ) => commands.Callback,
  ): void {
    const fullName = `${EXTENSION_NS}.${name}`;
    const command = factory(context, extensionContext);
    context.subscriptions.push(
      vscode.commands.registerCommand(fullName, command),
    );
  };
}
