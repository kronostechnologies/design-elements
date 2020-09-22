import { useState } from 'react';

interface ModalHookResult {
    isModalOpen: boolean;
    openModal(): void;
    closeModal(): void;
}

export function useModal(initiallyOpened = false): ModalHookResult {
    const [isModalOpen, setIsModalOpen] = useState(initiallyOpened);
    const openModal = (): void => setIsModalOpen(true);
    const closeModal = (): void => setIsModalOpen(false);

    return {
        isModalOpen,
        openModal,
        closeModal,
    };
}
