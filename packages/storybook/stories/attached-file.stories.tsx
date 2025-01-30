import { AttachedFile } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';

const AttachedFileMeta: Meta<typeof AttachedFile> = {
    title: 'Components/Attached File',
    component: AttachedFile,
    argTypes: {
        children: {
            control: {
                type: 'text',
            },
        },
    },
    args: {
        onCancel() {
            // eslint-disable-next-line no-console
            console.info('onCancel');
        },
        onDelete() {
            // eslint-disable-next-line no-console
            console.info('onDelete');
        },
        onRetry() {
            // eslint-disable-next-line no-console
            console.info('onRetry');
        },
        onClose() {
            // eslint-disable-next-line no-console
            console.info('onClose');
        },
    },
};

export default AttachedFileMeta;

type Story = StoryObj<typeof AttachedFile>;

export const Default: Story = {
    ...AttachedFileMeta,
    args: {
        ...AttachedFileMeta.args,
        filename: 'File.txt',
        status: 'default',
        filesize: 100000,
    },
};

export const Uploading: Story = {
    ...AttachedFileMeta,
    args: {
        ...AttachedFileMeta.args,
        status: 'uploading',
        filename: 'File.txt',
        filesize: 100000,
        percent: 40,
    },
};

export const Error: Story = {
    ...AttachedFileMeta,
    args: {
        ...AttachedFileMeta.args,
        status: 'error',
        filename: 'File.txt',
        filesize: 100000,
        errorText: 'Error message',
    },
};

export const Cancelled: Story = {
    ...AttachedFileMeta,
    args: {
        ...AttachedFileMeta.args,
        status: 'cancelled',
        filename: 'File.txt',
        filesize: 100000,
    },
};

export const Success: Story = {
    ...AttachedFileMeta,
    args: {
        ...AttachedFileMeta.args,
        filename: 'File.txt',
        filesize: 100000,
        status: 'success',
    },
};

export const WithLozange: Story = {
    ...AttachedFileMeta,
    args: {
        ...AttachedFileMeta.args,
        filename: 'File.txt',
        status: 'default',
        filesize: 100000,
        lozengeText: 'Label',
    },
};
