import { Button, ModalDialog, useModal } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ModalDialog> = {
    title: 'Components/Modal',
    component: ModalDialog,
    argTypes: {
        appElement: {
            control: { type: null },
        },
        isOpen: {
            control: { type: null },
        },
        onRequestClose: {
            control: { type: null },
        },
        parentSelector: {
            control: { type: null },
        },
    },
};

export default meta;

type Story = StoryObj<typeof ModalDialog>;

export const Default: Story = {
    args: {
        ariaDescribedby: 'story-description',
        title: 'Heading 5',
        subtitle: 'Subtitle 1',
    },
    render: (args) => {
        const { isModalOpen, closeModal, openModal } = useModal();
        return (
            <>
                <Button label="Open Modal" buttonType="primary" onClick={openModal} />
                <ModalDialog
                    {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                    appElement="#storybook-root"
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
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
    args: {
        ariaDescribedby: 'story-description',
        dialogType: 'alert',
        confirmButton: { label: 'Delete' },
        title: 'Alert Modal',
        subtitle: 'Subtitle 1',
    },
    render: (args) => {
        const { isModalOpen, closeModal, openModal } = useModal();
        return (
            <>
                <Button label="Open Modal" buttonType="destructive-primary" onClick={openModal} />
                <ModalDialog
                    {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                    appElement="#storybook-root"
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                >
                    <p style={{ margin: 0 }} id="story-description">
                        This modal has a destructive button. It is used to alert the user of something.
                    </p>
                </ModalDialog>
            </>
        );
    },
};
