import path from 'path';
import * as vscode from "vscode";
import { LanguageClient, ServerOptions, TransportKind } from "vscode-languageclient/node";
import {
  ENABLEMENT_FLAG,
  LANGUAGE_CLIENT_ID,
  LANGUAGE_CLIENT_NAME,
} from "./constants";
import { PbkitExtensionContext } from "./types";

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
      const client = extensionContext.client;
      extensionContext.client = undefined;
      vscode.commands.executeCommand("setContext", ENABLEMENT_FLAG, false);
      await client.stop();
    }
    
    const serverOptions: ServerOptions = {
      run: {
        module: context.asAbsolutePath(path.join('node_modules', '@pbkit', 'pb-cli', 'esm', 'cli', 'pb', 'entrypoint.js')),
        transport: TransportKind.stdio,
        args: ["lsp"],
      },
      debug: {
        module: context.asAbsolutePath(path.join('node_modules', '@pbkit', 'pb-cli', 'esm', 'cli', 'pb', 'entrypoint.js')),
        transport: TransportKind.stdio,
        args: ["lsp"],
      }
    }
    const client = new LanguageClient(
      LANGUAGE_CLIENT_ID,
      LANGUAGE_CLIENT_NAME,
      serverOptions,
      extensionContext.clientOptions,
    );
    context.subscriptions.push(client.start());
    await client.onReady();
    extensionContext.client = client;
    vscode.commands.executeCommand("setContext", ENABLEMENT_FLAG, true);
  };
}
