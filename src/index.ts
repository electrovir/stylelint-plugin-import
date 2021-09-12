import {fileExtensionRule} from './rules/file-extension/file-extension.rule';
import {fileNameStartsWithRule} from './rules/file-name-starts-with/file-name-starts-with.rule';
import {importAsReferenceRule} from './rules/import-as-reference/import-as-reference.rule';

export default [fileNameStartsWithRule, importAsReferenceRule, fileExtensionRule];
