# Typescript Template

This repository was built from a custom-built template for a console-based [Typescript](https://www.typescriptlang.org) program designed for editing in [Visual Studio Code](https://code.visualstudio.com) or [Github Codespaces](https://github.com/features/codespaces).
Below, we outline the contents of the template for your reference if you need to build your own Typescript project.

## Package Management

We use [NPM](https://npmjs.com) for package management.
The package is initialized with:

~~~console
$> npm init
~~~

With default values given for the `package.json` file that is created.
In particular, a few scripts/sub-commands are given so that building, testing, _etc._, can be run via `npm run`.
See `package.json` to see what these commands do.

Note that the template uses the [Unlicense](https://unlicense.org) license which is replicated in `LICENSE`.
We recommend that you change the license as needed.

## Typescript

The Typescript compiler is installed as a (local) npm development package via `npm`:

~~~console
$> npm install typescript --save-dev
~~~

Development packages are packages that only used during program development, not program execution.

`tsconfig.json` contains default options to the Typescript compiler, `tsc`.
In particular, we specify that source files are contained in the `/src` directory and output files are placed in the `/dist` directory.
See the [tsconfig refeence](https://www.typescriptlang.org/tsconfig) for more information on these options.

## ESLint

We use [ESLint](https://eslint.org) to lint our code.
When coupled with appropriate Visual Studio Code plugin, ESLint provides strong support to enforce style and healthy code practices during development.
We installed `eslint` via the `eslint/config` helper tool:

~~~console
$> npm init @eslint/config
~~~

Arbitrarily, we chose the [Javascript Standard](https://standardjs.com) style for ESLint to enforce.
Feel free to customize this style template or choose a different style altogether.
`.eslintrc.js` contains these settings and the [ESLint user guide](https://eslint.org/docs/latest/use/configure/) provides a comprehensive reference for the file.

## Jest

We use [Jest](https://jestjs.io) as a testing framework for Typescript projects.
There are many such frameworks available; we choose Jest both because of its popularity and its ease of setup and use.

~~~console
$> npm install --save-dev jest ts-jest @types/jest
$> npx ts-jest config:init
~~~

The last command adds a Jest configuration file, `jest.config.js`, to the project.

## Devcontainer Configuration

The `/.devcontainer/devcontainer.json` file configures the runtime instance created when the project is loaded within a Github Codespace.
The file is the default configuration file provided by Microsoft in its [Node.js container template](https://github.com/microsoft/vscode-remote-try-node) with appropriate modifications for these kinds of projects.

Notably, if this project is run in a local version of Visual Studio Code, we recommend installing the following plugins to manage your work:

+   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
+   [Github Classroom](https://marketplace.visualstudio.com/items?itemName=GitHub.classroom)

## Git Configuration

`.gitignore` is pre-populated so that Git ignores all build files generated by the project.



This repository/assignment is a starting point for your semester-long, individual language implementation project. Over the course of the semester, we will introduce various milestones prompting you to add to your implementation. You should complete all of your work in this repository, using good git practices throughout development, e.g., commiting and pushing changes periodically. If you need help with using Git, check out this Mini-course/repository on using Git and Github.

Initial Specification: I will be writing this language in TypeScript. The goal of this language, besides containing basic and standard functions of a language, will be to allow for user defined structures. I do not know if this goal is too lofty (but I feel as though it might be) so I will ifrst shoot for very simple user defined structures. I am choosing to write this in TypeScript for ease of transitioning between class and project work and also because I have been enjoying coding in TypeScript. 
  Ultimately, I hope that this will be (semi) general purpose language that is object oriented. This language, being general purpose, should be useful for a wide variety of tasks, such as creating simple algorithms, functions, and user defined structures. Because this language will ultimately shadow many languages that already exist in the real world, I hope by building a complier for this language I will gain a better understanding of the grammar,, internals, and work necessary to create the coding languages which dominate the industry today. Due to my current frustrations with the technology I am using in my stats class, I may make this language to be somewhat stats specific and include useful stats functions that would aid in general data analysis.
