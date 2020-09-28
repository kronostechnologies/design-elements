build_react:
	cd packages/react && yarn && yarn link && yarn build
build_storybook:
	cd packages/storybook && yarn && yarn link @equisoft/design-elements-react && yarn build
build_all: build_react build_storybook

react:
	cd packages/react && yarn start

storybook:
	cd packages/storybook && yarn start
