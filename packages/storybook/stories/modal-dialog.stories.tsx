import { Button, ModalDialog, useModal } from '@equisoft/design-elements-react';
import { StoryObj } from '@storybook/react';

export default {
    title: 'Components/Modal',
    component: ModalDialog,
};

type Story = StoryObj<typeof ModalDialog>;

export const Default: Story = {
    render: () => {
        const { isModalOpen, closeModal, openModal } = useModal();
        return (
            <>
                <Button label="Open Modal" buttonType="primary" onClick={openModal} />
                <ModalDialog
                    appElement="#storybook-root"
                    ariaDescribedby="story-description"
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    title="Heading 5"
                    subtitle="Subtitle 1"
                >
                    <p style={{ margin: 0 }} id="story-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vivamus fringilla tellus nec auctor gravida.
                    </p>
                </ModalDialog>
            </>
        );
    },
};

export const AlertModal: Story = {
    render: () => {
        const { isModalOpen, closeModal, openModal } = useModal();
        return (
            <>
                <Button label="Open Modal" buttonType="destructive" onClick={openModal} />
                <ModalDialog
                    appElement="#storybook-root"
                    ariaDescribedby="story-description"
                    confirmButton={{
                        label: 'Delete',
                    }}
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    title="Alert Modal"
                    dialogType="alert"
                >
                    <p style={{ margin: 0 }} id="story-description">
                        This modal has a destructive button. It is used to alert the user of something.
                    </p>
                </ModalDialog>
            </>
        );
    },
};
