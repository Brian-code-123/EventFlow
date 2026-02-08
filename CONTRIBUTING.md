# Contributing to EventFlow

We love your input! We want to make contributing to EventFlow as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features

---

## How to Contribute

### 1. Select a Repository

Choose EventFlow as the repository you want to contribute to!

### 2. Finding an Existing Issue

Browse the [Issues](https://github.com/R3ACTR/EventFlow/issues) tab and look for:

- `good first issue` - Perfect for newcomers
- `documentation` - Great for improving docs
- `help wanted` - Areas where we'd love your help
- `bug` - Help us fix issues

#### Comment & Request Assignment

**Before starting work, you must:**

1. **Comment on the issue** stating your intent to work on it
   - Example: "I would like to work on this issue."

2. **Wait for approval and assignment** by a maintainer or mentor

3. **Once approved**, the issue is assigned to you
   - Only one contributor is assigned to an issue at a time
   - After assignment, you may start work

### 3. Creating a New Issue

If you want to propose a new feature or report a bug:

1. Go to the [Issues](https://github.com/R3ACTR/EventFlow/issues) tab and click "New Issue"

2. **Before writing any code**, create a GitHub issue describing:
   - What the problem or improvement is
   - Why it matters
   - A brief proposed solution (if applicable)

3. **Wait for maintainer approval**

4. Once approved and assigned, you can start working

**No pull request is allowed without an approved issue.**

### 4. Working on an Issue (Only After Assignment)

#### Fork the Repository

1. Open the EventFlow repository: https://github.com/R3ACTR/EventFlow
2. Click **Fork** (top-right on GitHub)
3. This creates a copy of the repository under your GitHub account

#### Clone Your Fork Locally

Open your terminal and run:

```bash
git clone https://github.com/<your-username>/EventFlow.git
cd EventFlow
```

Open the repository in VS Code or any code editor.

#### Add Upstream Repository

Link the original repository (important for updates):

```bash
git remote add upstream https://github.com/R3ACTR/EventFlow.git
```

#### Create a Feature Branch

```bash
git checkout -b issue-<issue-number>
```

Example: `git checkout -b issue-123`

#### Implement the Fix or Improvement

- Make changes related only to the assigned issue
- Follow coding standards of the repository
- Test your changes locally

#### Stage and Commit Changes

```bash
git status
git add .
git commit -m "fix: description of your changes"
```

**Commit message format:**
- Use prefixes: `feat:`, `fix:`, `docs:`, `refactor:`
- Keep messages clear and descriptive

#### Sync With Upstream (If Needed)

Before pushing, sync with the main repository:

```bash
git fetch upstream
git merge upstream/main
```

#### Push Your Branch to GitHub

```bash
git push origin issue-<issue-number>
```

### 5. Open a Pull Request (PR)

1. Go to the EventFlow repository on GitHub
2. Click "New Pull Request"
3. Select your branch

#### PR Description Should Include:

- **What you changed** - Brief description of your changes
- **Why it fixes the issue** - Explanation of how your changes address the issue
- **Link the issue** using: `Fixes #123` or `Closes #123`
- **Add a screenshot** (if applicable) for faster review

Once maintainers merge your pull request, you can continue working on other issues or create new ones!

---

## Development Setup

### Prerequisites

- Node.js 18+
- pnpm or npm
- MongoDB

### Setup

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Visit: http://localhost:3000

### Before Submitting

- Ensure the test suite passes (if applicable)
- Make sure your code lints: `pnpm lint`
- Build the project: `pnpm build`

---

## License

By contributing, you agree that your contributions will be licensed under the **MIT License**.

---

**Thank you for contributing to EventFlow! 🎉**
