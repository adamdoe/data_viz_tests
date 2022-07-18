# Selenium/Mocha Tests for COVE

Website automation tests for making sure COVE elements display on WCMS.

## Installation

### Install Chrome Driver
*This appears to be the official repository but proceed at your own risk since I'm not a chromedriver expert.*

__Check chrome version:__
```bash
chrome://version
```

__Install Version__
```bash
https://chromedriver.storage.googleapis.com/index.html
```

__Alternatively use Brew to install Chrome Driver:__
```bash
brew install --cask chromedriver
```

__Install node modules__
```bash
npm install
```

## Usage

```bash
# Run tests in console
npm run start 

# Output tests to text file
npm run start:report
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
