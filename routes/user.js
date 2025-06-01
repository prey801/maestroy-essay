

// File upload functionality
const setupFileUpload = () => {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const errorMessage = document.getElementById('errorMessage');
    const allowedExtensions = ['pdf', 'doc', 'docx', 'ppt', 'pptx'];

    const validateFile = (file) => {
        const extension = file.name.split('.').pop().toLowerCase();
        return allowedExtensions.includes(extension);
    };

    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            if (validateFile(file)) {
                uploadArea.innerHTML = `
                    <i class="fas fa-file-alt" style="color: var(--success);" aria-hidden="true"></i>
                    <h3>${file.name}</h3>
                    <p>${(file.size / 1024).toFixed(2)} KB</p>
                `;
                uploadArea.style.borderColor = 'var(--success)';
                errorMessage.style.display = 'none';
            } else {
                errorMessage.textContent = 'Invalid file type. Please upload a PDF, DOC, DOCX, PPT, or PPTX file.';
                errorMessage.style.display = 'block';
                fileInput.value = '';
            }
        }
    });

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--primary)';
        uploadArea.style.backgroundColor = 'rgba(74, 107, 255, 0.05)';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--light-gray)';
        uploadArea.style.backgroundColor = 'transparent';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--light-gray)';
        uploadArea.style.backgroundColor = 'transparent';

        if (e.dataTransfer.files.length) {
            const file = e.dataTransfer.files[0];
            if (validateFile(file)) {
                fileInput.files = e.dataTransfer.files;
                uploadArea.innerHTML = `
                    <i class="fas fa-file-alt" style="color: var(--success);" aria-hidden="true"></i>
                    <h3>${file.name}</h3>
                    <p>${(file.size / 1024).toFixed(2)} KB</p>
                `;
                uploadArea.style.borderColor = 'var(--success)';
                errorMessage.style.display = 'none';
            } else {
                errorMessage.textContent = 'Invalid file type. Please upload a PDF, DOC, DOCX, PPT, or PPTX file.';
                errorMessage.style.display = 'block';
            }
        }
    });
};

// Form validation and modal handling
const setupFormAndModal = () => {
    const submitBtn = document.getElementById('submitAssignment');
    const uploadModal = document.getElementById('uploadModal');
    const closeModal = document.getElementById('closeModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const errorMessage = document.getElementById('errorMessage');
    const fileInput = document.getElementById('fileInput');
    const assignmentTitle = document.getElementById('assignmentTitle');
    const assignmentType = document.getElementById('assignmentType');
    const deadline = document.getElementById('deadline');

    const closeModalFunction = () => {
        uploadModal.style.display = 'none';
        submitBtn.focus();
    };

    submitBtn.addEventListener('click', async () => {
        errorMessage.style.display = 'none';

        if (fileInput.files.length === 0 || !assignmentTitle.value || !assignmentType.value || !deadline.value) {
            errorMessage.textContent = 'Please fill out all fields and upload a valid file.';
            errorMessage.style.display = 'block';
            return;
        }

        // Validate deadline is in the future
        const today = new Date().toISOString().split('T')[0];
        if (deadline.value < today) {
            errorMessage.textContent = 'Deadline must be in the future.';
            errorMessage.style.display = 'block';
            return;
        }

        // Prepare form data for backend
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        formData.append('title', assignmentTitle.value);
        formData.append('type', assignmentType.value);
        formData.append('deadline', deadline.value);
        formData.append('userId', 'sarah_miller'); // Hardcoded for demo; replace with actual user ID from auth

        try {
            const response = await fetch('/api/assignments', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                uploadModal.style.display = 'flex';
                modalCloseBtn.focus();
            } else {
                errorMessage.textContent = result.error || 'Failed to submit assignment.';
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            errorMessage.textContent = 'Error submitting assignment. Please try again.';
            errorMessage.style.display = 'block';
        }
    });

    closeModal.addEventListener('click', closeModalFunction);
    modalCloseBtn.addEventListener('click', closeModalFunction);

    window.addEventListener('click', (e) => {
        if (e.target === uploadModal) {
            closeModalFunction();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && uploadModal.style.display === 'flex') {
            closeModalFunction();
        }
    });

    const focusableElements = uploadModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    uploadModal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    });
};

// Mobile sidebar toggle
const setupSidebarToggle = () => {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const sidebar = document.querySelector('.sidebar');

    mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });
};

// Ripple effect for buttons
const setupRippleEffect = () => {
    document.querySelectorAll('.ripple').forEach(button => {
        button.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
};

// Animation for stats cards on load
const setupStatsAnimation = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
    });
};

// Initialize all functionality
const init = () => {
    setupFileUpload();
    setupFormAndModal();
    setupSidebarToggle();
    setupRippleEffect();
    setupStatsAnimation();
};

init();