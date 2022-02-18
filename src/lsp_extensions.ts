import { RequestType, TextDocumentIdentifier } from "vscode-languageclient";

export interface VirtualTextDocumentParams {
  textDocument: TextDocumentIdentifier;
}

export const virtualTextDocument = new RequestType<
  VirtualTextDocumentParams,
  string,
  void
>("pbkit/virtualTextDocument");
