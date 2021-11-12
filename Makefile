.PHONY: yarn
yarn:
	yarn

.PHONY: build_react
build_react: yarn
	cd packages/react; yarn build;

.PHONY: react
react: yarn
	cd packages/react; yarn start;

.PHONY: storybook
storybook: yarn
	cd packages/storybook; yarn start;

.PHONY: scan_secrets
scan_secrets:
	@curl -sSL https://raw.githubusercontent.com/kronostechnologies/standards/dev/secret_scan/bin/gitleaks.bash | bash
