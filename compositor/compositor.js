// Generate particles
const particlesContainer = document.getElementById('particles');
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particlesContainer.appendChild(particle);
}

// Editor functionality
const editor = document.getElementById('editor');
const charCount = document.getElementById('charCount');
const wordCount = document.getElementById('wordCount');
const lineCount = document.getElementById('lineCount');

// Load saved content
function loadContent() {
    const savedContent = localStorage.getItem('melolaliaCompositor');
    if (savedContent) {
        editor.value = savedContent;
        updateStats();
    }
}

// Save content
function saveContent() {
    localStorage.setItem('melolaliaCompositor', editor.value);
}

// Update statistics
function updateStats() {
    const text = editor.value;
    charCount.textContent = text.length;
    
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    wordCount.textContent = words.length;
    
    const lines = text.split('\n').length;
    lineCount.textContent = lines;
}

// Auto-save on input
let saveTimeout;
editor.addEventListener('input', () => {
    updateStats();
    
    // Debounce save
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        saveContent();
    }, 500);
});

// Load content on page load
loadContent();

// Save on page unload
window.addEventListener('beforeunload', saveContent);

// Keyboard shortcuts
editor.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + S to save manually
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveContent();
        
        // Visual feedback
        const indicator = document.querySelector('.auto-save-indicator span');
        indicator.textContent = '✓ Guardado';
        setTimeout(() => {
            indicator.textContent = 'Auto-guardado';
        }, 1000);
    }
});

// Tab support in textarea
editor.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(end);
        editor.selectionStart = editor.selectionEnd = start + 4;
    }
});
