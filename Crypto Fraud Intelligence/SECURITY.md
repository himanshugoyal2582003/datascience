# Security Policy for Crypto Fraud Intelligence

## Reporting Security Vulnerabilities

Please **DO NOT** open a public GitHub issue for security vulnerabilities.

Instead, please report security issues to:
- **Email**: [security contact - add your email]
- **GitHub Private Vulnerability Report**: https://github.com/[owner]/crypto-fraud-intelligence/security/advisories/new

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.x | ✅ Yes |
| 0.x | ❌ No |

## Security Updates

- Security patches are released as soon as possible
- We follow [Semantic Versioning](https://semver.org/)
- All patches are tagged with `[SECURITY]` prefix

## Best Practices

- Keep dependencies up to date: `npm audit fix`, `pip audit`
- Never commit secrets or API keys
- Use environment variables for configuration
- Enable 2FA on GitHub account
- Review dependencies before installing

## Dependencies with Known Issues

We regularly scan for CVEs using:
- npm audit (JavaScript)
- safety (Python)
- Bandit (Python security linting)

See [CONTRIBUTING.md](../CONTRIBUTING.md) for more details.

## Contact

For security questions, contact the maintainers privately.

---

**Last Updated**: 2026-05-28
