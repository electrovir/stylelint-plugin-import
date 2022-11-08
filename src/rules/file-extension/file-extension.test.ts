import {DefaultOptionMode} from 'stylelint-rule-creator';
import {testDefaultRule} from 'stylelint-rule-creator/dist/testing';
import {pluginPath} from '../../plugin-util';
import {fileExtensionRule, FileExtensionRuleOptions} from './file-extension.rule';

testDefaultRule({
    rule: fileExtensionRule,
    pluginPath: pluginPath,
    tests: [
        {
            ruleOptions: {
                mode: DefaultOptionMode.REQUIRE,
                extension: '.css',
            },
            fix: true,
            description: 'with url function and required .css',
            accept: [
                {
                    code: '@import url("some-path.css");',
                },
            ],
            reject: [
                {
                    code: '@import url("some-path");',
                    message: fileExtensionRule.messages.extensionRequired(
                        '@import url("some-path")',
                        fileExtensionRule.defaultOptions.extension,
                    ),
                    fixed: '@import url("some-path.css");',
                },
            ],
        },
        {
            ruleOptions: {
                mode: DefaultOptionMode.BLOCK,
                extension: '',
            },
            fix: true,
            description: 'with url function and blocked .css',
            accept: [
                {
                    code: '@import url("some-path");',
                },
            ],
            reject: [
                {
                    code: '@import url("some-path.css");',
                    message: fileExtensionRule.messages.extensionBlocked(
                        '@import url("some-path.css")',
                    ),
                    fixed: '@import url("some-path");',
                },
            ],
        },
        {
            ruleOptions: true,
            fix: true,
            description: 'defaults work as expected',
            accept: [
                {code: `@import 'fileNameHere${fileExtensionRule.defaultOptions.extension}';`},
            ],
            reject: [
                {
                    code: "@import 'fileNameHere';",
                    message: fileExtensionRule.messages.extensionRequired(
                        "@import 'fileNameHere'",
                        fileExtensionRule.defaultOptions.extension,
                    ),
                    fixed: "@import 'fileNameHere.css';",
                },
            ],
        },
        {
            ruleOptions: {
                mode: DefaultOptionMode.REQUIRE,
                extension: '.less',
            },
            fix: true,
            description: 'defaults work as expected',
            accept: [{code: `@import 'fileNameHere.less';`}],
            reject: [
                {
                    code: "@import 'fileNameHere';",
                    message: fileExtensionRule.messages.extensionRequired(
                        "@import 'fileNameHere'",
                        '.less',
                    ),
                    fixed: "@import 'fileNameHere.less';",
                },
            ],
        },
        {
            ruleOptions: {
                mode: DefaultOptionMode.BLOCK,
            } as FileExtensionRuleOptions,
            fix: true,
            description: 'defaults work as expected',
            accept: [{code: `@import 'fileNameHere';`}],
            reject: [
                {
                    code: "@import 'fileNameHere.css';",
                    message: fileExtensionRule.messages.extensionBlocked(
                        "@import 'fileNameHere.css'",
                    ),
                    fixed: "@import 'fileNameHere';",
                },
            ],
        },
    ],
});
