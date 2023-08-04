import { Button, ModalDialog, useModal } from '@equisoft/design-elements-react';
import { StoryObj } from '@storybook/react';
import { FunctionComponent, useCallback, useState } from 'react';
import styled from 'styled-components';
import { ShadowDomDecorator } from './utils/shadow-dom-decorator';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'Disclosure/Modal Dialog',
    component: ModalDialog,
};

type Story = StoryObj<typeof ModalDialog>;

export const Normal: Story = {
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

const Paragraph: FunctionComponent<{}> = () => (
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus molestie dignissim.
        Praesent nec vehicula erat. Duis sollicitudin maximus tristique. Donec eu erat congue, eleifend felis in,
        suscipit nibh. Nunc luctus orci vel nunc sodales, iaculis ultricies libero posuere. Suspendisse vel turpis
        lacus. Cras accumsan leo eu sem hendrerit, et rutrum nisl vehicula. Vivamus nec sapien ut nibh convallis
        ullamcorper. Nulla fringilla non ante sed posuere. Integer tincidunt nisi sed augue eleifend dignissim. Donec
        nec velit tellus. Nam nec lectus a ligula finibus tempus varius a felis. Ut lorem turpis, ultrices in vestibulum
        at, elementum et nunc. Cras rutrum ultricies nisi a congue. Ut et aliquam mi.
    </p>
);

export const Scrollable: Story = {
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
                    <div id="story-description">
                        {/* eslint-disable-next-line react/no-array-index-key */}
                        {[...Array(10).keys()].map((_, i) => <Paragraph key={i} />)}
                    </div>
                </ModalDialog>
            </>
        );
    },
};

export const CustomButtonLabels: Story = {
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
                    confirmButton={{
                        label: 'Custom Confirm',
                    }}
                    cancelButton={{
                        label: 'Custom Cancel',
                    }}
                    title="Heading 5"
                    subtitle="Subtitle 1"
                >
                    <p style={{ margin: 0 }} id="story-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                        fringilla tellus nec auctor gravida.
                    </p>
                </ModalDialog>
            </>
        );
    },
};

export const WithTitleIcon: Story = {
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
                    title="With title icon"
                    titleIcon="warningFilled"
                >
                    <p style={{ margin: 0 }} id="story-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                        fringilla tellus nec auctor gravida.
                    </p>
                </ModalDialog>
            </>
        );
    },
};

export const WithoutCloseButton: Story = {
    render: () => {
        const { isModalOpen, closeModal, openModal } = useModal();
        return (
            <>
                <Button label="Open Modal" buttonType="primary" onClick={openModal} />
                <ModalDialog
                    appElement="#storybook-root"
                    ariaDescribedby="story-description"
                    hasCloseButton={false}
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    title="Without close button"
                >
                    <p style={{ margin: 0 }} id="story-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                        fringilla tellus nec auctor gravida.
                    </p>
                </ModalDialog>
            </>
        );
    },
};

export const ConfirmCallback: Story = {
    render: () => {
        const { isModalOpen, closeModal, openModal } = useModal();

        function handleConfirm(): void {
            console.info('confirmed');
            closeModal();
        }

        return (
            <>
                <Button label="Open Modal" buttonType="primary" onClick={openModal} />
                <ModalDialog
                    appElement="#storybook-root"
                    ariaDescribedby="story-description"
                    isOpen={isModalOpen}
                    confirmButton={{
                        onConfirm: handleConfirm,
                    }}
                    onRequestClose={closeModal}
                    title="Heading 5"
                    subtitle="Subtitle 1"
                >
                    <p style={{ margin: 0 }} id="story-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                        fringilla tellus nec auctor gravida.
                    </p>
                </ModalDialog>
            </>
        );
    },
};

export const CancelCallback: Story = {
    render: () => {
        const { isModalOpen, closeModal, openModal } = useModal();

        function handleCancel(): void {
            console.info('canceled');
            closeModal();
        }

        return (
            <>
                <Button label="Open Modal" buttonType="primary" onClick={openModal} />
                <ModalDialog
                    appElement="#storybook-root"
                    ariaDescribedby="story-description"
                    isOpen={isModalOpen}
                    cancelButton={{
                        onCancel: handleCancel,
                    }}
                    onRequestClose={closeModal}
                    title="Heading 5"
                    subtitle="Subtitle 1"
                >
                    <p style={{ margin: 0 }} id="story-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                        fringilla tellus nec auctor gravida.
                    </p>
                </ModalDialog>
            </>
        );
    },
};

export const NoTitles: Story = {
    render: () => {
        const { isModalOpen, closeModal, openModal } = useModal();
        return (
            <>
                <Button label="Open Modal" buttonType="primary" onClick={openModal} />
                <ModalDialog
                    appElement="#storybook-root"
                    ariaLabel="Modal label"
                    ariaDescribedby="story-description"
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                >
                    <p style={{ margin: 0 }} id="story-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                        fringilla tellus nec auctor gravida.
                    </p>
                </ModalDialog>
            </>
        );
    },
};

export const CustomFooterContent: Story = {
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
                    footerContent={<b>Custom Content</b>}
                >
                    <p style={{ margin: 0 }} id="story-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                        fringilla tellus nec auctor gravida.
                    </p>
                </ModalDialog>
            </>
        );
    },
};

const AbsoluteDiv = styled.div`
    left: -9999px;
    position: absolute;
    top: -9999px;
`;

export const WithinShadowDOM: Story = {
    decorators: [ShadowDomDecorator],
    render: () => {
        const { isModalOpen, closeModal, openModal } = useModal();
        const [parentElement, setParentElement] = useState<HTMLDivElement | null>();
        const ref = useCallback(setParentElement, [setParentElement]);

        return (
            <>
                <AbsoluteDiv ref={ref} />

                {parentElement && [
                    <Button label="Open Modal" buttonType="primary" onClick={openModal} />,

                    <ModalDialog
                        appElement="#storybook-root"
                        ariaDescribedby="story-description"
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        parentSelector={() => parentElement}
                        title="Heading 5"
                        subtitle="Subtitle 1"
                    >
                        <p style={{ margin: 0 }} id="story-description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                            fringilla tellus nec auctor gravida.
                        </p>
                    </ModalDialog>,
                ]}
            </>
        );
    },
};

export const InformationModal: Story = {
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
                    title="Information Modal"
                    modalType="information-modal"
                    confirmButton={{
                        label: 'Got it',
                    }}
                >
                    <p style={{ margin: 0 }} id="story-description">
                        This modal has only one button. It is used to inform the user of something.
                    </p>
                </ModalDialog>
            </>
        );
    },
};

export const DestructiveModal: Story = {
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
                    title="Destructive Modal"
                    modalType="destructive-modal"
                >
                    <p style={{ margin: 0 }} id="story-description">
                        This modal has a destructive button. It is used to destroy something.
                    </p>
                </ModalDialog>
            </>
        );
    },
};
