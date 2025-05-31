
        document.addEventListener('DOMContentLoaded', function() {
            // File upload handling
            const fileUpload = document.getElementById('file-upload');
            const fileUploadArea = document.getElementById('file-upload-area');
            const fileNameDisplay = document.getElementById('file-name-display');
            
            fileUpload.addEventListener('change', function() {
                if (this.files.length > 0) {
                    if (this.files.length === 1) {
                        fileNameDisplay.textContent = this.files[0].name;
                    } else {
                        fileNameDisplay.textContent = `${this.files.length} files selected`;
                    }
                    fileUploadArea.style.borderColor = 'var(--primary)';
                } else {
                    fileNameDisplay.textContent = 'No files selected';
                    fileUploadArea.style.borderColor = '#e2e8f0';
                }
            });
            
            // Allow drag and drop
            fileUploadArea.addEventListener('dragover', function(e) {
                e.preventDefault();
                this.style.borderColor = 'var(--primary)';
                this.style.backgroundColor = 'rgba(74, 107, 255, 0.05)';
            });
            
            fileUploadArea.addEventListener('dragleave', function() {
                this.style.borderColor = '#e2e8f0';
                this.style.backgroundColor = 'transparent';
            });
            
            fileUploadArea.addEventListener('drop', function(e) {
                e.preventDefault();
                this.style.borderColor = '#e2e8f0';
                this.style.backgroundColor = 'transparent';
                
                if (e.dataTransfer.files.length) {
                    fileUpload.files = e.dataTransfer.files;
                    const event = new Event('change');
                    fileUpload.dispatchEvent(event);
                }
            });
            
            // Click to select files
            fileUploadArea.addEventListener('click', function() {
                fileUpload.click();
            });
            
            // Form submission
            const orderForm = document.getElementById('maestro-order-form');
            orderForm.addEventListener('submit', function(e) {
                e.preventDefault();
                // In a real implementation, this would validate and submit the form
                alert('Order submitted! Redirecting to payment...');
                // window.location.href = '/payment';
            });
            
            // Update summary when options change
            const writerLevel = document.getElementById('writer-level');
            const options = document.querySelectorAll('.additional-options input');
            
            function updateSummary() {
                // In a real implementation, this would update the order summary
                // based on selected options
                console.log('Updating summary...');
            }
            
            writerLevel.addEventListener('change', updateSummary);
            options.forEach(option => {
                option.addEventListener('change', updateSummary);
            });
        });
    