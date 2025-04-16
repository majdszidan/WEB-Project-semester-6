document.addEventListener('DOMContentLoaded', function() {
    // Menu data
    const menuItems = [
        { name: 'Courses', link: '#', submenu: [
            { name: 'Mathematics', link: '#math' },
            { name: 'Science', link: '#science' },
            { name: 'Languages', link: '#languages' },
            { name: 'History', link: '#history' },
            { name: 'Computer Science', link: '#cs' }
        ] },
    ];

    // Language options
    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' },
        { code: 'de', name: 'Deutsch' },
        { code: 'zh', name: 'Chinese (中文)' },
        { code: 'ar', name: 'Arabic (العربية)' },
        { code: 'ru', name: 'Russian (Русский)' },
        { code: 'hi', name: 'Hindi (हिन्दी)' },
        { code: 'pt', name: 'Portuguese (Português)' },
        { code: 'ja', name: 'Japanese (日本語)' }
    ];

    // Course categories
    const courseCategories = [
        {
            title: 'Mathematics',
            description: 'Catch up on algebra, calculus, geometry, and more',
            icon: 'fa-square-root-variable',
            color: 'bg-blue-100'
        },
        {
            title: 'Science',
            description: 'Biology, chemistry, physics, and environmental science',
            icon: 'fa-flask',
            color: 'bg-green-100'
        },
        {
            title: 'Languages',
            description: 'English, Spanish, French, and more world languages',
            icon: 'fa-language',
            color: 'bg-yellow-100'
        },
        {
            title: 'History & Social Studies',
            description: 'World history, geography, economics, and civics',
            icon: 'fa-landmark',
            color: 'bg-red-100'
        },
        {
            title: 'Computer Science',
            description: 'Programming, algorithms, data structures, and more',
            icon: 'fa-code',
            color: 'bg-purple-100'
        },
        {
            title: 'Arts & Music',
            description: 'Visual arts, music theory, and creative expression',
            icon: 'fa-palette',
            color: 'bg-pink-100'
        }
    ];


   
    
    // Populate Language Dropdown
    const languageDropdown = document.getElementById('language-dropdown');
    const mobileLanguageSelect = document.getElementById('mobile-language-select');
    
    languages.forEach(lang => {
        const langItem = document.createElement('a');
        langItem.href = '#';
        langItem.className = 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100';
        langItem.textContent = lang.name;
        langItem.setAttribute('data-lang-code', lang.code);
        langItem.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('selected-language').textContent = lang.name;
            languageDropdown.classList.add('hidden');
            // Here you would typically set the language in your app
        });
        languageDropdown.appendChild(langItem);
    });
    
    // Toggle language dropdown
    const languageBtn = document.getElementById('language-dropdown-btn');
    languageBtn.addEventListener('click', function() {
        const isVisible = languageDropdown.classList.contains('block');
        
        languageDropdown.classList.toggle('hidden', isVisible);
        languageDropdown.classList.toggle('block', !isVisible);
        
        if (!isVisible) {
            languageDropdown.classList.add('dropdown-animation');
        }
    });
    
    // Close language dropdown when clicking outside
    document.addEventListener('click', function(e) {
        const container = document.getElementById('language-dropdown-container');
        if (!container.contains(e.target)) {
            languageDropdown.classList.remove('block', 'dropdown-animation');
            languageDropdown.classList.add('hidden');
        }
    });
    
   
    // Populate Course Categories
    const categoriesContainer = document.querySelector('.mt-12.grid');
    if (categoriesContainer) {
        courseCategories.forEach(category => {
            const categoryCard = document.createElement('div');
            categoryCard.className = 'flex flex-col rounded-lg shadow-lg overflow-hidden';
            
            categoryCard.innerHTML = `
                <div class="${category.color} px-4 py-5 sm:p-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 bg-white rounded-md p-3">
                            <i class="fas ${category.icon} text-xl text-indigo-600"></i>
                        </div>
                        <div class="ml-5">
                            <h3 class="text-lg font-medium text-gray-900">${category.title}</h3>
                            <p class="mt-2 text-sm text-gray-500">${category.description}</p>
                        </div>
                    </div>
                </div>
            `;
            
            categoriesContainer.appendChild(categoryCard);
        });
    }
    
    
    // Login Modal
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const loginBackdrop = document.getElementById('login-backdrop');
    
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function() {
            loginModal.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        });
    }
    
    // Signup Modal
    const signupBtn = document.getElementById('signup-btn');
    const signupModal = document.getElementById('signup-modal');
    const signupBackdrop = document.getElementById('signup-backdrop');
    
    if (signupBtn && signupModal) {
        signupBtn.addEventListener('click', function() {
            signupModal.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        });
    }
    
    // Close Modals
    const closeModalButtons = document.querySelectorAll('.close-modal');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (loginModal) loginModal.classList.add('hidden');
            if (signupModal) signupModal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        });
    });
    
    // Close modal when clicking on backdrop
    if (loginBackdrop) {
        loginBackdrop.addEventListener('click', function() {
            loginModal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        });
    }
    
    if (signupBackdrop) {
        signupBackdrop.addEventListener('click', function() {
            signupModal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (loginModal) loginModal.classList.add('hidden');
            if (signupModal) signupModal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    });
    
    // Handle form submissions (prevent default for demo)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically handle form submission
            alert('Form submission would be processed here.');
        });
    });
});