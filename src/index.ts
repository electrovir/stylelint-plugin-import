import {fileNameStartsWithRule} from './rules/file-name-starts-with/file-name-starts-with.rule';
import {importAsReferenceRule} from './rules/import-as-reference/import-as-reference.rule';
import {fileExtensionRule} from './rules/file-extension/file-extension.rule';

export default [fileNameStartsWithRule, importAsReferenceRule, fileExtensionRule];
