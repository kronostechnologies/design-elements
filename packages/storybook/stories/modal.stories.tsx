import { Button, Modal, useModal } from '@equisoft/design-elements-react';
import { StoryFn, StoryObj } from '@storybook/react';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'Components/Modal',
    component: Modal,
};

type Story = StoryFn<typeof Modal>;

export const Normal: Story = () => {
    const { isModalOpen, closeModal, openModal } = useModal();
    return (
        <>
            <Button label="Open Modal" buttonType="primary" onClick={openModal} />
            <Modal
                appElement="#storybook-root"
                ariaLabel="Modal label"
                ariaDescribedby="story-description"
                isOpen={isModalOpen}
                onRequestClose={closeModal}
            >
                <span id="story-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
            </Modal>
        </>
    );
};

export const PaddingDisabled: StoryObj<typeof Modal> = {
    parameters: {
        docs: {
            description: {
                story: 'The prop `noPadding` removes padding to give you a blank modal to work with.',
            },
        },
    },
    render: () => {
        const { isModalOpen, closeModal, openModal } = useModal();
        return (
            <>
                <Button label="Open Modal" buttonType="primary" onClick={openModal} />
                <Modal
                    appElement="#storybook-root"
                    ariaLabel="Modal label"
                    ariaDescribedby="story-description"
                    noPadding
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                >
                    <span id="story-description">A modal without padding</span>
                </Modal>
            </>
        );
    },
};

export const WithoutCloseButton: Story = () => {
    const { isModalOpen, closeModal, openModal } = useModal();
    return (
        <>
            <Button label="Open Modal" buttonType="primary" onClick={openModal} />
            <Modal
                appElement="#storybook-root"
                ariaLabel="Modal label"
                hasCloseButton={false}
                isOpen={isModalOpen}
                onRequestClose={closeModal}
            />
        </>
    );
};

export const WithHeader: Story = () => {
    const { isModalOpen, closeModal, openModal } = useModal();
    return (
        <>
            <Button label="Open Modal" buttonType="primary" onClick={openModal} />
            <Modal
                appElement="#storybook-root"
                ariaLabel="Modal label"
                ariaDescribedby="story-description"
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                modalHeader={<b>Header content</b>}
            >
                <span id="story-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
            </Modal>
        </>
    );
};

export const WithFooter: Story = () => {
    const { isModalOpen, closeModal, openModal } = useModal();
    return (
        <>
            <Button label="Open Modal" buttonType="primary" onClick={openModal} />
            <Modal
                appElement="#storybook-root"
                ariaLabel="Modal label"
                ariaDescribedby="story-description"
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                modalFooter={<b>Footer content</b>}
            >
                <span id="story-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
            </Modal>
        </>
    );
};
