class ModalController {
    constructor(options = {}) {
        this.options = {
            closeOnEscape: true,
            closeOnClickOutside: true,
            onOpen: () => {},
            onClose: () => {},
            ...options
        };

        this.activeModals = new Map();
        this.setupGlobalListeners();
    }

    setupGlobalListeners() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.options.closeOnEscape) {
                const activeModal = Array.from(this.activeModals.values())
                    .find(modal => modal.style.display === 'flex');
                if (activeModal) {
                    this.closeModal(activeModal.id);
                }
            }
        });
    }

    registerModal(modalId, customOptions = {}) {
        const modal = document.getElementById(modalId);
        if (!modal) {
            console.error(`Modal with id "${modalId}" not found`);
            return;
        }

        const modalOptions = {
            ...this.options,
            ...customOptions
        };

        this.activeModals.set(modalId, modal);

        if (modalOptions.closeOnClickOutside) {
            modal.addEventListener('click', (event) => {
                if (event.target === modal) {
                    this.closeModal(modalId);
                }
            });
        }

        return {
            open: () => this.openModal(modalId),
            close: () => this.closeModal(modalId),
            toggle: () => this.toggleModal(modalId)
        };
    }

    openModal(modalId) {
        const modal = this.activeModals.get(modalId);
        if (!modal) return;

        modal.style.display = 'flex';
        this.options.onOpen(modal);
    }

    closeModal(modalId) {
        const modal = this.activeModals.get(modalId);
        if (!modal) return;

        modal.style.display = 'none';
        this.options.onClose(modal);
    }

    toggleModal(modalId) {
        const modal = this.activeModals.get(modalId);
        if (!modal) return;

        if (modal.style.display === 'flex') {
            this.closeModal(modalId);
        } else {
            this.openModal(modalId);
        }
    }
}