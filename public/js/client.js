
        // Sidebar toggle for mobile
        const menuToggle = document.querySelector('.menu-toggle');
        const sidebar = document.querySelector('.sidebar');
        
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });

        // Search functionality
        const searchInput = document.querySelector('.search-bar input');
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            // Implement search logic (e.g., filter table rows by name or email)
            console.log('Searching clients for:', searchTerm);
        });

        // Status filter
        const statusFilter = document.querySelector('#status-filter');
        statusFilter.addEventListener('change', (e) => {
            const status = e.target.value;
            // Implement status filter logic
            console.log('Filtering by status:', status);
        });

        // Date range filter
        const dateFrom = document.querySelector('#date-from');
        const dateTo = document.querySelector('#date-to');
        
        dateFrom.addEventListener('change', (e) => {
            console.log('Registered from:', e.target.value);
            // Implement date filter logic
        });
        
        dateTo.addEventListener('change', (e) => {
            console.log('Registered to:', e.target.value);
            // Implement date filter logic
        });

        // Notification click handler
        const notificationIcon = document.querySelector('.notification-icon');
        notificationIcon.addEventListener('click', () => {
            // Implement notification view logic
            console.log('Notifications clicked');
        });

        // User profile dropdown
        const userProfile = document.querySelector('.user-profile');
        userProfile.addEventListener('click', () => {
            // Implement dropdown menu logic
            console.log('User profile clicked');
        });

        // Pagination controls
        const paginationButtons = document.querySelectorAll('.pagination-btn');
        paginationButtons.forEach(button => {
            button.addEventListener('click', () => {
                paginationButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                // Implement pagination logic
                console.log('Page changed:', button.textContent);
            });
        });

        // Export button
        const exportButton = document.querySelector('.table-actions .btn:first-child');
        exportButton.addEventListener('click', () => {
            // Implement export logic
            console.log('Export clients clicked');
        });

        // Bulk actions button
        const bulkActionsButton = document.querySelector('.table-actions .btn:last-child');
        bulkActionsButton.addEventListener('click', () => {
            // Implement bulk actions logic
            console.log('Bulk actions clicked');
        });

        // Add client button
        const addClientButton = document.querySelector('.page-header .btn-primary');
        addClientButton.addEventListener('click', () => {
            // Implement add client logic
            console.log('Add client clicked');
        });

        // Action buttons
        const actionButtons = document.querySelectorAll('.action-btn');
        actionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const action = button.querySelector('i').classList.contains('fa-eye') ? 'View' :
                              button.querySelector('i').classList.contains('fa-edit') ? 'Edit' :
                              button.querySelector('i').classList.contains('fa-user-slash') ? 'Deactivate' :
                              'Activate';
                const clientId = button.closest('tr').querySelector('.client-id').textContent;
                console.log(`${action} client: ${clientId}`);
                // Implement action logic (e.g., view details, edit client, toggle status)
            });
        });
    