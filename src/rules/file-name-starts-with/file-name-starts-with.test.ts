import {DefaultOptionMode} from 'stylelint-rule-creator';
import {testDefaultRule} from 'stylelint-rule-creator/dist/testing';
import {pluginPath} from '../../plugin-util';
import {fileNameStartsWithRule} from './file-name-starts-with.rule';

testDefaultRule({
    rule: fileNameStartsWithRule,
    pluginPath: pluginPath,
    tests: [
        {
            ruleOptions: true,
            description: 'should work with default rule options',
            accept: [
                {
                    code: `
                        @import (reference) "${fileNameStartsWithRule.defaultOptions.startWith}colors";

                        a { color: pink; }
                    `,
                    description: 'accepts import with startWith',
                },
                {
                    code: `
                        @import (reference) "../../../${fileNameStartsWithRule.defaultOptions.startWith}colors";
                        a { color: pink; }
                    `,
                    description: 'accepts import with startWith and directories',
                },
            ],
            reject: [
                {
                    code: `
                        @import (reference) "colors";
                        a { color: pink; }
                    `,
                    description: 'blocks import without startWith',
                    message: fileNameStartsWithRule.messages.shouldStartWith(
                        'colors',
                        fileNameStartsWithRule.defaultOptions.startWith,
                    ),
                },
                {
                    code: `
                        @import (reference) "../../../colors";
                        a { color: pink; }
                    `,
                    description: 'blocks import with directories and without startWith',
                    message: fileNameStartsWithRule.messages.shouldStartWith(
                        'colors',
                        fileNameStartsWithRule.defaultOptions.startWith,
                    ),
                },
            ],
        },
        {
            ruleOptions: {
                mode: DefaultOptionMode.REQUIRE,
                startWith: '_',
            },
            accept: [
                {
                    code: `
                        @import (reference) "_colors";

                        a { color: pink; }
                    `,
                    description: 'accepts import with startWith',
                },
                {
                    code: `
                        @import (reference) "../../../_colors";
                        a { color: pink; }
                    `,
                    description: 'accepts import with startWith and directories',
                },
            ],
            reject: [
                {
                    code: `
                        @import (reference) "colors";
                        a { color: pink; }
                    `,
                    description: 'blocks import without startWith',
                    message: fileNameStartsWithRule.messages.shouldStartWith('colors', '_'),
                },
                {
                    code: `
                        @import (reference) "../../../colors";
                        a { color: pink; }
                    `,
                    description: 'blocks import with directories and without startWith',
                    message: fileNameStartsWithRule.messages.shouldStartWith('colors', '_'),
                },
            ],
        },
        {
            ruleOptions: {
                mode: DefaultOptionMode.BLOCK,
                startWith: '_',
            },
            accept: [
                {
                    code: `
                        @import (reference) "colors";

                        a { color: pink; }
                    `,
                    description: 'accepts import without blocked startWith',
                },
                {
                    code: `
                        @import (reference) "../../../colors";
                        a { color: pink; }
                    `,
                    description: 'accepts import without blocked startWith and with directories',
                },
            ],
            reject: [
                {
                    code: `
                        @import (reference) "_colors";
                        a { color: pink; }
                    `,
                    description: 'blocks import with blocked startWith',
                    message: fileNameStartsWithRule.messages.shouldNotStartWith('_colors', '_'),
                },
                {
                    code: `
                        @import (reference) "../../../_colors";
                        a { color: pink; }
                    `,
                    description: 'blocks import with directories and with blocked startWith',
                    message: fileNameStartsWithRule.messages.shouldNotStartWith('_colors', '_'),
                },
            ],
        },
        {
            description: 'should ignore imports that match lineExceptions',
            ruleOptions: {
                mode: DefaultOptionMode.BLOCK,
                startWith: '_',
                lineExceptions: ['*colors*'],
            },
            accept: [
                {
                    code: `
                        @import (reference) "_colors";
                        a { color: pink; }
                    `,
                },
                {
                    code: `
                        @import (reference) "../../../_colors";
                        a { color: pink; }
                    `,
                },
            ],
            reject: [],
        },
    ],
});
