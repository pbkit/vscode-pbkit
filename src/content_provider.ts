import {
  CancellationToken,
  ProviderResult,
  TextDocumentContentProvider,
  Uri,
} from "vscode";
import { virtualTextDocument } from "./lsp_extensions";
import { PbkitExtensionContext } from "./types";

export class PbkitTextDocumentContentProvider
  implements TextDocumentContentProvider {
  constructor(private extensionContext: PbkitExtensionContext) {}

  provideTextDocumentContent(
    uri: Uri,
    token: CancellationToken,
  ): ProviderResult<string> {
    if (!this.extensionContext.client) {
      throw new Error("Pbkit language server has not started.");
    }

    console.log(
      "pbkitTextDocumentContentProvider/provideTextDocumentContent:sendRequest",
      { textDocument: { uri: uri.toString() } },
    );

    return this.extensionContext.client.sendRequest(virtualTextDocument, {
      textDocument: { uri: uri.toString() },
    }, token);
  }
}
