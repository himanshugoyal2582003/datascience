# 🤝 Contributing to Crypto Fraud Intelligence

Thank you for your interest in contributing to the Crypto Fraud Intelligence (CFI) project! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, inclusive, and professional in all interactions.

## Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- Git
- KNIME Analytics Platform (optional, for workflow modifications)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/crypto-fraud-intelligence.git
   cd crypto
   ```

2. **Set up Python environment**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # Windows: .venv\Scripts\activate
   pip install -r backend/requirements.txt
   ```

3. **Set up Node.js environment**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Download dataset**
   ```bash
   cd dataset/elliptic
   # Download from Kaggle Elliptic Dataset
   unzip elliptic-data-set.zip
   cd ../..
   ```

5. **Process data**
   ```bash
   python python-analysis/02_feature_engineering.py
   ```

## How to Contribute

### Reporting Bugs

1. Check if the bug already exists in [Issues](../../issues)
2. Open a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment (OS, Python version, etc.)

### Proposing Features

1. Open an issue with tag `enhancement`
2. Describe the feature and its benefits
3. Discuss with maintainers before implementing

### Submitting Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Keep commits atomic and well-documented
   - Follow code style (see below)
   - Add tests if applicable

3. **Test your changes**
   ```bash
   # Backend
   cd backend
   python -m pytest tests/
   
   # Frontend
   cd frontend
   npm run lint
   npm run build
   ```

4. **Commit and push**
   ```bash
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

5. **Submit a Pull Request**
   - Reference related issues
   - Describe changes clearly
   - Ensure CI/CD passes

## Code Style Guide

### Python
- Follow [PEP 8](https://pep8.org/)
- Use `black` for formatting
- Use `pylint` for linting
- Type hints required for new functions

```python
def calculate_risk_score(transaction: dict) -> float:
    """Calculate fraud risk score for a transaction.
    
    Args:
        transaction: Transaction data dictionary
        
    Returns:
        Risk score between 0 and 1
    """
    # implementation
    return score
```

### TypeScript/JavaScript
- Use ESLint configuration in `frontend/.eslintrc`
- Follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use meaningful variable names
- Add JSDoc comments

```typescript
/**
 * Fetches graph data from API and renders visualization
 * @param nodeId - Transaction ID to visualize
 * @returns Promise resolving to rendered graph
 */
async function renderGraph(nodeId: string): Promise<void> {
  // implementation
}
```

## Testing

- Write tests for new features
- Maintain >80% code coverage for critical paths
- Run full test suite before submitting PR

```bash
# Backend
pytest --cov=app tests/

# Frontend
npm run test
```

## Documentation

- Update README files if changing functionality
- Add docstrings to all functions
- Update API documentation in [docs/](docs/)
- Include examples for new features

## Commit Message Guidelines

Format: `<type>: <subject>`

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style (formatting, etc)
- `refactor:` Code refactoring
- `perf:` Performance improvement
- `test:` Tests

**Examples:**
```
feat: add anomaly detection model to backend
fix: correct risk score calculation in feature engineering
docs: update API endpoint documentation
refactor: simplify graph visualization component
```

## Pull Request Process

1. Ensure all tests pass
2. Update documentation
3. Provide clear PR description
4. Link related issues
5. Request review from maintainers
6. Address feedback promptly

## Project Structure

```
crypto/
├── backend/           ← FastAPI server
├── frontend/          ← Next.js dashboard
├── dataset/           ← Data files
├── python-analysis/   ← Feature engineering & analysis
├── knime/             ← ETL workflows
├── docs/              ← Documentation
└── notebooks/         ← Jupyter exploratory analysis
```

## Key Areas for Contribution

- 🔍 **ML Models**: Improve fraud detection algorithms
- 🎨 **UI/UX**: Enhance frontend dashboard
- 📊 **Analytics**: Add new analysis and metrics
- 📖 **Documentation**: Improve clarity and completeness
- 🧪 **Testing**: Increase test coverage
- 🐛 **Bug Fixes**: Address existing issues

## Deployment

Changes to main branch are automatically deployed:
- Backend → Render
- Frontend → Netlify

Ensure CI/CD passes before merging.

## Questions?

- Check [existing discussions](../../discussions)
- Open a new discussion for questions
- Contact maintainers

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing! 🙏
