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
