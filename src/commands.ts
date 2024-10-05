import * as vscode from "vscode";
import { LanguageClient } from "vscode-languageclient/node";
import {
  ENABLEMENT_FLAG,
  LANGUAGE_CLIENT_ID,
  LANGUAGE_CLIENT_NAME,
} from "./constants";
import { PbkitExtensionContext } from "./types";
import { getServerOptions } from "./language-server";

export type Callback = (...args: any[]) => unknown;
export type Factory = (
  context: vscode.ExtensionContext,
  extensionContext: PbkitExtensionContext,
) => Callback;

// Start (or restart) the Language Server
export function startLanguageServer(
  context: vscode.ExtensionContext,
  extensionContext: PbkitExtensionContext,
) {
  return async () => {
    console.log("Start Pbkit language server");
    if (extensionContext.client) {
      vscode.commands.executeCommand("setContext", ENABLEMENT_FLAG, false);
      await extensionContext.client.restart();
      vscode.commands.executeCommand("setContext", ENABLEMENT_FLAG, true);
      return;
    }
    const client = new LanguageClient(
      LANGUAGE_CLIENT_ID,
      LANGUAGE_CLIENT_NAME,
      await getServerOptions(context),
      extensionContext.clientOptions,
    );
    extensionContext.client = client;
    await client.start();
    vscode.commands.executeCommand("setContext", ENABLEMENT_FLAG, true);
  };
}
