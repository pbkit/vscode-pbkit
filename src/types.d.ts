import {
  LanguageClient,
  LanguageClientOptions,
} from "vscode-languageclient/node";

export interface PbkitExtensionContext {
  client: LanguageClient | undefined;
  clientOptions: LanguageClientOptions;
}
