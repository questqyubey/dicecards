module.exports = {
  root: true,
  env: {
    es2020: true,
    node: true
  },
  plugins: ['jest', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
    // Prettier errors show up as eslint errors.
    'plugin:prettier/recommended'
  ],
  rules: {
    // Use parens around arrow function args if there is more than one.
    'arrow-parens': ['error', 'as-needed'],
    // Decided to switch off in https://ftr-dev.slack.com/archives/GE0JHA32B/p1615157328008200
    'class-methods-use-this': 'off',
    // Keep method complexity down (see https://en.wikipedia.org/wiki/Cyclomatic_complexity).
    complexity: ['error', { max: 20 }],
    // Don't require curly braces.
    curly: 'off',
    // Switch statements don't need a default case.
    'default-case': 'off',
    // Use dot notation where possible.
    'dot-notation': 'error',
    // Prefer strict equals (===) over loose equals (==).
    eqeqeq: 'error',
    // Make sure that 'for-in' loops have an appropriate guard to prevent looping
    // over an object's prototype inherited properties.
    'guard-for-in': 'error',
    // Disallow specific global variables.
    'no-restricted-globals': [
      'error',
      {
        name: 'spyOn',
        message: 'Use jest.spyOn instead.'
      }
    ],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          'lodash',
          // We should not be importing from barrels within a module, as it
          // can lead to evaluating the same file twice - once from an import
          // in its barrel and once from its direct import.
          '.',
          './',
          './.',
          './index',
          '..',
          '../',
          '../.',
          '../index',
          '../..',
          '../../',
          '../../.',
          '../../index',
          '../../..',
          '../../../',
          '../../../.',
          '../../../index'
        ]
      }
    ],
    // We often exceed 500 lines for test files. Let's warn but not fail.
    'max-lines': [
      'warn',
      {
        max: 500,
        skipBlankLines: true,
        skipComments: true
      }
    ],
    // Don't allow more than one class per file.
    'max-classes-per-file': ['error', 1],
    // Keep line-length low-ish for readability on small screens/split panes.
    'max-len': [
      'error',
      {
        code: 120,
        ignorePattern: '^import|^export',
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreUrls: true,
        tabWidth: 2
      }
    ],
    // Require parens when invoking a constructor with no args.
    'new-parens': 'error',
    // We declare vars in switch cases quite often so leaving this as a warning for now.
    'no-case-declarations': 'warn',
    // Don't allow 'this' to be used outside of a method.
    'no-invalid-this': 'error',
    // Don't allow more than two empty lines.
    'no-multiple-empty-lines': ['error', { max: 2 }],
    // Don't allow new operators for String, Boolean, etc objects.
    'no-new-wrappers': 'error',
    // Don't allow throwing literals as exceptions.
    'no-throw-literal': 'error',
    // Require use of 'let' or 'const' over 'var'.
    'no-var': 'error',
    'no-unused-vars': [
      'error',
      {
        // Don't worry about making sure that _ vars are used.
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    // Warn about unnecessary escapes in regex patterns.
    'no-useless-escape': 'warn',
    // Prefer using ES6 object shorthand.
    'object-shorthand': 'error',
    // Require each var declaration to be made on its own line.
    'one-var': ['error', 'never'],
    // Prefer 'const' var declaration where the variable is not reassigned.
    'prefer-const': 'error',
    // Prefer 'spread' e.g instead of Math.max.apply(Math, args), use Math.max(...args)
    // But we tend to get type errors on [].concat.apply([], [[1], [2]]
    'prefer-spread': 'warn',
    // Always provide a radix arg to the 'parseInt()' function.
    radix: 'error',
    // Allow a module to not define a default export.
    'import/no-default-export': 'off',
    // Don't care about the order of our imports.
    'import/order': 'off',
    // We often use 'try..expect' in our tests.
    'jest/no-try-expect': 'off',
    // We use test callbacks a fair bit.
    'jest/no-test-callback': 'off',
    // We export from test files a fair bit.
    'jest/no-export': 'warn',
    // We change default jasmine timeouts
    'jest/no-jasmine-globals': 'off',
    // Only warning on this because we tend to put expects in before
    // blocks which is technically not supported by jest.
    'jest/no-standalone-expect': 'warn',
    // Not all our expect usages are valid but these are widespread
    // throughout our codebase so just warning on them for now.
    'jest/valid-expect': 'warn',
    // We commonly use Typemoq assertions rather than just expects
    'jest/expect-expect': 'off'
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        // Don't shadow variable declarations from outer scopes (for JS files)
        'no-shadow': 'error'
      }
    },
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        // Disables @typescript-eslint rules which conflict with prettier.
        'prettier'
      ],
      rules: {
        '@typescript-eslint/ban-types': [
          'error',
          {
            types: {
              String: {
                message: 'Use string instead',
                fixWith: 'string'
              },
              Boolean: {
                message: 'Use boolean instead',
                fixWith: 'boolean'
              },
              Number: {
                message: 'Use number instead',
                fixWith: 'number'
              },
              Symbol: {
                message: 'Use symbol instead',
                fixWith: 'symbol'
              },
              Undefined: {
                message: 'Use undefined instead',
                fixWith: 'undefined'
              }
            },
            // We ban default types, but omit "Object" because its usage is widespread
            // throughout our codebases.
            extendDefaults: false
          }
        ],
        // Prefer consistently defining interfaces over types.
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        // Prefer consistently having a return type
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
            allowTypedFunctionExpressions: true
          }
        ],
        '@typescript-eslint/member-delimiter-style': [
          'error',
          {
            multiline: {
              delimiter: 'none'
            }
          }
        ],
        // The following naming conventions have been tested against ftr-web and beast
        // to reduce the number of warnings. Would suggest aligning to these naming conventions where possible.
        '@typescript-eslint/naming-convention': [
          'warn',
          {
            selector: 'property',
            format: ['camelCase']
          },
          {
            selector: 'property',
            format: ['camelCase'],
            filter: {
              regex: '^_{1,}$',
              match: false
            }
          },
          {
            selector: 'classProperty',
            format: ['UPPER_CASE', 'camelCase']
          },
          {
            selector: 'objectLiteralProperty',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE', 'snake_case'],
            leadingUnderscore: 'allow'
          },
          {
            selector: 'function',
            format: ['camelCase', 'PascalCase']
          },
          {
            selector: 'variable',
            format: ['UPPER_CASE', 'camelCase', 'PascalCase'],
            modifiers: ['const', 'global']
          },
          {
            selector: 'classMethod',
            format: ['camelCase']
          },
          {
            selector: 'enum',
            format: ['PascalCase']
          },
          {
            selector: 'typeLike',
            format: ['PascalCase']
          }
        ],
        // Ported from our TSLint config. Empty interfaces can be useful, but they are
        // not necessarily type-safe.
        '@typescript-eslint/no-empty-interface': 'off',
        // Don't allow explicit "any" to be used - strong types should be used instead.
        '@typescript-eslint/no-explicit-any': 'error',
        // Don't allow require() imports - ES6 imports should be used instead.
        '@typescript-eslint/no-require-imports': 'error',
        // If you want to be explicit about an inferrable type in your declaration, that's
        // fine. This maintains compatibility with our TSLint config.
        '@typescript-eslint/no-inferrable-types': 'off',
        // We don't mind using typescript namespaces.
        '@typescript-eslint/no-namespace': 'off',
        // Don't shadow variable declarations from outer scopes (for TS files)
        '@typescript-eslint/no-shadow': ['error'],
        // Only warning on this due to https://github.com/typescript-eslint/typescript-eslint/issues/1857
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            // Don't worry about making sure that _ vars are used.
            args: 'after-used',
            argsIgnorePattern: '^_'
          }
        ],
        '@typescript-eslint/no-use-before-define': 'off',
        // Prefer a 'for-of' loop over a standard 'for' loop.
        '@typescript-eslint/prefer-for-of': 'error',
        // Use function types instead of interfaces with call signatures.
        '@typescript-eslint/prefer-function-type': 'error',
        // Prefer merged function overloads.
        '@typescript-eslint/unified-signatures': 'error'
      }
    },
    {
      // Disable these rules for tests
      files: ['*.spec.ts', '*.integration.ts', '*.scaling.ts', '*.system.ts'],
      rules: {
        'dot-notation': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        // We usually don't care about this for tests as we know what we're expecting.
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        // There are a lot of these errors - most times people are just using old try/catch/expect styles
        // instead of await expect(promise).rejects.toThrowError(InstanceOfError)
        'jest/no-conditional-expect': 'warn'
      }
    }
  ],
  reportUnusedDisableDirectives: true
}
