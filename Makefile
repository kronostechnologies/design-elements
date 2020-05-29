build_web:
	cd packages/web && yarn && yarn link
build_react:
	cd packages/react && yarn && yarn link @equisoft/design-elements-web && yarn build
build_storybook:
	cd packages/react && yarn && yarn build:storybook
build_all: build_web build_react build_storybook

react:
	cd packages/react && yarn start

storybook:
	cd packages/react && yarn start:storybook
