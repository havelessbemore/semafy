# Contributing

Thank you for contributing! We are grateful for any community participation.

## Code of Conduct

This project is governed by the [Code of Conduct](./CODE_OF_CONDUCT.md). By contributing, you agree to uphold this code.

## How Can I Contribute?

- Search through [issues](https://github.com/havelessbemore/semafy/issues) for bugs you can help fix.
- Look at [discussions/ideas](https://github.com/havelessbemore/semafy/discussions/categories/ideas) for an idea you'd like to explore.

## Developing

- `npm run test`: Run tests
- `npm run test:coverage`: Create coverage reports
- `npm run lint`: Check styleguide adherence
- `npm run format`: Automatically adjust your code to the styleguide.
- `npm run build`: Build the source

### Reporting Issues

#### Before Submitting

- Perform a [quick search](https://github.com/havelessbemore/semafy/issues) to see if the issue has already been reported. If it has and it's still open, add a comment instead of opening a new issue.

#### Writing a Submission

- Use a clear and descriptive title to identify the problem.
- Describe why this is an issue, such as its impact and scope.
- Provide exact steps to reproduce in as much detail as possible.
- Give expected vs actual results of following these steps.

### Suggesting Ideas

#### Before Suggesting

- Check the documentation to see if the feature is already included.
- Perform a [quick search](https://github.com/havelessbemore/semafy/discussions/categories/ideas) to see if the idea is already suggested.

### Pull Requests

#### Tests

- Include sufficient tests
- Add new tests when adding new features.
- Update existing tests to reflect code changes.
- When fixing a bug, add tests that highlight how the behavior was broken.
- Make sure all tests pass before submitting the pull request
- Please do not include changes to `dist/` in your pull request. This should only be updated when releasing a new version.

## Styleguides

### Git Commit Messages

Please follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).

### Typescript Styleguide

Styling is enforced by [ESLint](https://eslint.org/), [Prettier](https://prettier.io/docs/en/integrating-with-linters.html) and [typescript-eslint](https://typescript-eslint.io/).

- Run `npm run lint` to test styleguide adherence.
- Run `npm run format` to automatically adjust your code to the styleguide.

---

Thanks again for contributing!
