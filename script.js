// State management
let currentPage = 'landing';
let passcode = '';
const CORRECT_PASSCODE = '092625';
let puzzlePieces = [
    { id: 0, currentPos: 0, correctPos: 0 },
    { id: 1, currentPos: 1, correctPos: 1 },
    { id: 2, currentPos: 2, correctPos: 2 },
    { id: 3, currentPos: 3, correctPos: 3 }
];
let draggedPiece = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    shufflePuzzle();
});

// Event Listeners
function initializeEventListeners() {
    // Landing page buttons
// Landing page buttons
    document.getElementById('yes-btn').addEventListener('click', handleYesClick);
    document.getElementById('no-btn').addEventListener('click', handleNoClick);
    document.getElementById('fine-btn').addEventListener('click', handleFineClick); 
    
    // Keypad buttons
    document.querySelectorAll('.key[data-num]').forEach(btn => {
        btn.addEventListener('click', function() {
            handleKeypadInput(this.dataset.num);
        });
    });
    
    document.getElementById('delete-btn').addEventListener('click', handleDelete);
    
    // Gift cards
    document.querySelectorAll('.gift-card[data-page]').forEach(card => {
        card.addEventListener('click', function() {
            navigateToPage(this.dataset.page);
        });
    });
    
    // Back buttons
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            navigateToPage('gift');
        });
    });
    
    // Letter modal
    document.getElementById('letter-btn').addEventListener('click', openLetterModal);
    document.getElementById('close-modal').addEventListener('click', closeLetterModal);
    document.getElementById('letter-modal').addEventListener('click', function(e) {
        if (e.target === this) closeLetterModal();
    });
}

// Landing Page Functions
function handleYesClick() {
    navigateToPage('passcode');
}

function handleNoClick() {
    const landingContent = document.getElementById('landing-content');  
    const sadMessage = document.getElementById('sad-message');

    landingContent.classList.add('hidden'); 
    sadMessage.classList.remove('hidden');
}


function handleFineClick() {
    const landingContent = document.getElementById('landing-content'); 
    const sadMessage = document.getElementById('sad-message');

    sadMessage.classList.add('hidden');
    landingContent.classList.remove('hidden'); 
}

// Passcode Functions
function handleKeypadInput(num) {
    if (passcode.length < 6) {
        passcode += num;
        updatePasscodeDisplay();
        
        if (passcode.length === 6) {
            checkPasscode();
        }
    }
}

function handleDelete() {
    if (passcode.length > 0) {
        passcode = passcode.slice(0, -1);
        updatePasscodeDisplay();
        clearError();
    }
}

function updatePasscodeDisplay() {
    const digits = document.querySelectorAll('.passcode-digit');
    digits.forEach((digit, index) => {
        if (index < passcode.length) {
            digit.textContent = passcode[index];
            digit.classList.add('filled');
        } else {
            digit.textContent = '';
            digit.classList.remove('filled');
        }
        digit.classList.remove('error');
    });
}

function checkPasscode() {
    if (passcode === CORRECT_PASSCODE) {
        const passcodeContent = document.getElementById('passcode-content');
        const loader = document.getElementById('passcode-loader');

        passcodeContent.classList.add('hidden');
        loader.classList.remove('hidden');

        setTimeout(() => {
            navigateToPage('gift');
            
            passcode = '';
            updatePasscodeDisplay();
            loader.classList.add('hidden');
            passcodeContent.classList.remove('hidden');

        }, 2500);

    } else {
        showPasscodeError();
    }
}

function showPasscodeError() {
    const digits = document.querySelectorAll('.passcode-digit');
    const errorMsg = document.getElementById('passcode-error');
    
    digits.forEach(digit => digit.classList.add('error'));
    errorMsg.classList.remove('hidden');
    
    setTimeout(() => {
        passcode = '';
        updatePasscodeDisplay();
        clearError();
    }, 1500);
}

function clearError() {
    const errorMsg = document.getElementById('passcode-error');
    errorMsg.classList.add('hidden');
}

// Jar Page Functions
document.getElementById('close-heart-modal').addEventListener('click', closeHeartModal);
document.getElementById('heart-message-modal').addEventListener('click', function(e) {
    if (e.target === this) closeHeartModal();
});

// Jar of hearts buttons
document.querySelectorAll('.heart-btn').forEach(heart => {
    heart.addEventListener('click', handleHeartClick);
});

function handleHeartClick(e) {
    const message = e.currentTarget.dataset.message;
    openHeartModal(message);
}

function openHeartModal(message) {
    const modal = document.getElementById('heart-message-modal');
    const messageText = document.getElementById('heart-message-text');
    
    messageText.textContent = message;
    
    modal.classList.remove('hidden');
}

function closeHeartModal() {
    document.getElementById('heart-message-modal').classList.add('hidden');
}

// Modal Functions
function openLetterModal() {
    document.getElementById('letter-modal').classList.remove('hidden');
}

function closeLetterModal() {
    document.getElementById('letter-modal').classList.add('hidden');
}

// Navigation
function navigateToPage(pageName) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageName + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageName;
    }
}