// Quiz Game Data
const quizQuestions = [
    {
        question: "What makes Saima's birthday special?",
        options: ["The cake", "The people who love her", "The gifts", "The party"],
        correct: 1
    },
    {
        question: "What's the best birthday gift for Saima?",
        options: ["Expensive presents", "Love and friendship", "Money", "Surprise parties"],
        correct: 1
    },
    {
        question: "How should Saima celebrate life?",
        options: ["Every single day", "Only on birthdays", "Once a year", "Never"],
        correct: 0
    },
    {
        question: "What brings true happiness to Saima?",
        options: ["Material things", "Making memories", "Being famous", "Having power"],
        correct: 1
    },
    {
        question: "What's the most important thing in Saima's life?",
        options: ["Success", "Love and connection", "Wealth", "Fame"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let quizAnswered = false;

// Wishes Generator Data
const wishesCategories = {
    heartfelt: [
        "May your 21th birthday be as wonderful as you are, Saima. You deserve all the happiness in the world!",
        "On your special day, I want you to know how much you're loved and appreciated. Happy Birthday, Saima!",
        "Saima, may this year bring you closer to your dreams and fill your life with endless joy.",
        "Happy Birthday to someone who makes the world a brighter place just by being in it. You're amazing, Saima!"
    ],
    funny: [
        "Happy 21th Birthday, Saima! Don't worry, you're not getting older, you're just leveling up!",
        "Congratulations on reaching level 19, Saima! May your new skills include cake-eating and present-opening!",
        "Happy Birthday, Saima! Remember, age is just a number... a really high number in your case!",
        "Saima, you're not old, you're just vintage! Happy 19th Birthday!"
    ],
    inspirational: [
        "As you celebrate your 19th birthday, Saima, remember that the future is as bright as you make it. Dream big!",
        "Happy Birthday, Saima! May this year be the beginning of a wonderful journey toward your dreams.",
        "Saima, on your 19th birthday, I hope you realize how much potential you have. The world is yours to conquer!",
        "Happy Birthday, Saima! May you always have the courage to follow your heart and chase your dreams."
    ],
    poetic: [
        "Like a flower in bloom, you grow more beautiful with each passing year. Happy 21th Birthday, Saima.",
        "May your life be painted with the colors of joy, love, and laughter. Happy Birthday, Saima.",
        "On this special day, may your heart be filled with sunshine and your path lined with roses. Happy Birthday, Saima.",
        "Like a star in the night sky, you shine bright. May your 19th year be as luminous as you are, Saima."
    ]
};

let selectedWishCategory = 'heartfelt';

// Photo Booth Variables
let stream = null;
let selectedFrameIndex = 0;
let selectedPhotoIndex = -1;
const frameUrls = [
    'https://i.ibb.co/6yFm2K5L/frame1.png',
    'https://i.ibb.co/2P2sC6Kg/frame2.png',
    'https://i.ibb.co/9bH8zW3f/frame3.png',
    'https://i.ibb.co/T1hLk1QG/frame4.png'
];

// Photo URLs from Memories Gallery
const photoUrls = [
    'https://i.ibb.co/M52Ztz2V/1693714295444.jpg',
    'https://i.ibb.co/Ftjw4KM/IMG-20251015-WA0003.jpg',
    'https://i.ibb.co/PGwWz6Zt/sa.jpg',
    'https://i.ibb.co/5g0FWV1p/saim.jpg',
    'https://i.ibb.co/dsQy8VkH/sai.jpg',
    'https://i.ibb.co/4wtdCnTW/IMG-20251015-WA0004.jpg'
];

// Theme Management
function changeTheme(theme) {
    const body = document.body;
    const themeBtns = document.querySelectorAll('.theme-btn');
    
    // Remove all theme classes
    body.classList.remove('theme-ocean', 'theme-sunset', 'theme-forest', 'theme-galaxy');
    
    // Remove active class from all buttons
    themeBtns.forEach(btn => btn.classList.remove('active'));
    
    // Apply new theme
    if (theme !== 'default') {
        body.classList.add(`theme-${theme}`);
    }
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Animation control
let animationsPaused = false;

function toggleAnimations() {
    animationsPaused = !animationsPaused;
    const body = document.body;
    const icon = document.getElementById('animation-icon');
    
    if (animationsPaused) {
        body.classList.add('animations-paused');
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    } else {
        body.classList.remove('animations-paused');
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    }
}

// Create background elements (particles, hearts, balloons, confetti, and stars)
function createBackgroundElements() {
    const container = document.getElementById('background-elements');
    
    // Create particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        container.appendChild(particle);
    }
    
    // Create floating hearts
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${Math.random() * 10}s`;
        heart.style.animationDuration = `${10 + Math.random() * 5}s`;
        container.appendChild(heart);
    }
    
    // Create floating balloons
    for (let i = 0; i < 10; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.left = `${Math.random() * 100}%`;
        balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        balloon.style.animationDelay = `${Math.random() * 15}s`;
        balloon.style.animationDuration = `${15 + Math.random() * 10}s`;
        container.appendChild(balloon);
    }
    
    // Create confetti
    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        confetti.style.animationDelay = `${Math.random() * 8}s`;
        confetti.style.animationDuration = `${8 + Math.random() * 5}s`;
        container.appendChild(confetti);
    }
    
    // Create stars
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 50}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        container.appendChild(star);
    }
}

// Typing animation for all text elements
function typeText(elementId, text, speed = 50) {
    const element = document.getElementById(elementId);
    element.textContent = '';
    
    let index = 0;
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Countdown Timer
function updateCountdown() {
    const birthday = new Date('February 25, 2024');
    const now = new Date();
    const diff = birthday - now;
    
    if (diff <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Social Sharing
function shareOnSocial(platform) {
    const url = window.location.href;
    const text = "Check out this special birthday website for Saima Jahangir!";
    
    switch(platform) {
        case 'facebook':
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
            break;
        case 'twitter':
            window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
            break;
        case 'instagram':
            // Instagram doesn't support direct URL sharing, so we'll copy the link
            copyLink();
            alert("Link copied! You can now paste it in your Instagram story.");
            break;
        case 'whatsapp':
            window.open(`https://wa.me/?text=${text} ${url}`, '_blank');
            break;
    }
}

function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert("Link copied to clipboard!");
    });
}

// Quiz Game Functions - Fixed
function initializeQuiz() {
    currentQuestion = 0;
    score = 0;
    quizAnswered = false;
    displayQuestion();
}

function displayQuestion() {
    const question = quizQuestions[currentQuestion];
    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');
    const nextBtn = document.getElementById('quiz-next-btn');
    const finishBtn = document.getElementById('quiz-finish-btn');
    
    // Set question text
    questionEl.textContent = `Question ${currentQuestion + 1}: ${question.question}`;
    
    // Clear previous options
    optionsEl.innerHTML = '';
    
    // Create option elements
    question.options.forEach((option, index) => {
        const optionEl = document.createElement('div');
        optionEl.classList.add('quiz-option');
        optionEl.textContent = option;
        optionEl.onclick = () => selectAnswer(index);
        optionsEl.appendChild(optionEl);
    });
    
    // Hide buttons initially
    nextBtn.style.display = 'none';
    finishBtn.style.display = 'none';
    quizAnswered = false;
    
    // Update score display
    document.getElementById('quiz-score').textContent = `Score: ${score}/${currentQuestion}`;
}

function selectAnswer(selectedIndex) {
    if (quizAnswered) return;
    
    quizAnswered = true;
    const question = quizQuestions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    const nextBtn = document.getElementById('quiz-next-btn');
    const finishBtn = document.getElementById('quiz-finish-btn');
    
    // Disable all options
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Show correct/incorrect feedback
    if (selectedIndex === question.correct) {
        options[selectedIndex].classList.add('correct');
        score++;
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[question.correct].classList.add('correct');
    }
    
    // Update score
    document.getElementById('quiz-score').textContent = `Score: ${score}/${currentQuestion + 1}`;
    
    // Show appropriate button
    if (currentQuestion < quizQuestions.length - 1) {
        nextBtn.style.display = 'inline-block';
    } else {
        finishBtn.style.display = 'inline-block';
        const message = score >= 4 ? 'Excellent!' : 'Great effort!';
        document.getElementById('quiz-score').textContent = `Final Score: ${score}/${quizQuestions.length} - ${message}`;
    }
}

function nextQuestion() {
    currentQuestion++;
    displayQuestion();
}

// Gift Box Functions
function openGift(element, index) {
    element.classList.add('opened');
    
    // Add confetti effect when opening a gift
    createConfettiBurst();
}

// Interactive Cake Functions
let extinguishedCandles = 0;

function extinguishFlame(flame) {
    if (flame.classList.contains('extinguished')) return;
    
    flame.classList.add('extinguished');
    extinguishedCandles++;
    
    if (extinguishedCandles === 3) {
        document.getElementById('cake-message').textContent = "Make a wish! It came true!";
        document.getElementById('cake-next-btn').style.display = 'inline-block';
        
        // Create fireworks effect
        setTimeout(() => {
            createFireworks();
        }, 500);
    } else {
        document.getElementById('cake-message').textContent = `${3 - extinguishedCandles} candles left to blow out!`;
    }
}

// Photo Booth Functions
async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.getElementById('camera-video');
        video.srcObject = stream;
        
        document.getElementById('start-camera').style.display = 'none';
        document.getElementById('take-photo').style.display = 'inline-block';
    } catch (err) {
        console.error("Error accessing camera:", err);
        alert("Unable to access camera. Please check your permissions.");
    }
}

function takePhoto() {
    const video = document.getElementById('camera-video');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Draw the selected frame on top
    const frameImg = new Image();
    frameImg.onload = function() {
        ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
        
        // Display the captured photo
        const photoResult = document.getElementById('photo-result');
        const capturedPhoto = document.getElementById('captured-photo');
        capturedPhoto.src = canvas.toDataURL('image/png');
        photoResult.style.display = 'block';
        
        // Hide camera controls
        document.getElementById('take-photo').style.display = 'none';
        document.getElementById('retake-photo').style.display = 'inline-block';
        
        // Stop the camera stream
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    };
    frameImg.src = frameUrls[selectedFrameIndex];
}

function retakePhoto() {
    const photoResult = document.getElementById('photo-result');
    photoResult.style.display = 'none';
    
    document.getElementById('retake-photo').style.display = 'none';
    document.getElementById('start-camera').style.display = 'inline-block';
}

function selectFrame(index) {
    selectedFrameIndex = index;
    
    // Update selected frame display
    const frameImg = document.querySelector('#selected-frame img');
    frameImg.src = frameUrls[index];
    
    // Update active state
    const frameOptions = document.querySelectorAll('.photo-booth-frame-option');
    frameOptions.forEach((option, i) => {
        if (i === index) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

function selectPhotoForFrame(index) {
    selectedPhotoIndex = index;
    
    // If a photo is selected, show it in the camera preview area
    const video = document.getElementById('camera-video');
    video.style.display = 'none';
    
    // Create an image element to show the selected photo
    let photoPreview = document.getElementById('photo-preview');
    if (!photoPreview) {
        photoPreview = document.createElement('img');
        photoPreview.id = 'photo-preview';
        photoPreview.style.width = '100%';
        photoPreview.style.height = '100%';
        photoPreview.style.objectFit = 'cover';
        video.parentNode.insertBefore(photoPreview, video.nextSibling);
    }
    
    photoPreview.src = photoUrls[index];
    photoPreview.style.display = 'block';
    
    // Update button states
    document.getElementById('start-camera').style.display = 'none';
    document.getElementById('take-photo').style.display = 'inline-block';
    
    // If camera was active, stop it
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
}

function downloadPhoto() {
    const capturedPhoto = document.getElementById('captured-photo');
    const link = document.createElement('a');
    link.download = 'saima-birthday-photo.png';
    link.href = capturedPhoto.src;
    link.click();
}

function sharePhoto() {
    const capturedPhoto = document.getElementById('captured-photo').src;
    
    if (navigator.share) {
        navigator.share({
            title: 'Saima\'s Birthday Photo',
            text: 'Check out my birthday photo!',
            url: capturedPhoto
        }).catch(err => console.error('Error sharing:', err));
    } else {
        // Fallback: copy the image to clipboard
        alert('Your browser doesn\'t support sharing. You can download the photo instead.');
    }
}

// Wishes Generator Functions
function selectWishCategory(category) {
    selectedWishCategory = category;
    
    // Update active state
    const categories = document.querySelectorAll('.wishes-category');
    categories.forEach(cat => {
        cat.classList.remove('active');
        if (cat.textContent.toLowerCase() === category) {
            cat.classList.add('active');
        }
    });
}

function generateWish() {
    const wishes = wishesCategories[selectedWishCategory];
    const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
    
    document.getElementById('generated-wish').textContent = randomWish;
}

function copyWish() {
    const wish = document.getElementById('generated-wish').textContent;
    
    if (wish === "Click \"Generate Wish\" to create a special birthday wish for Saima!") {
        alert("Please generate a wish first!");
        return;
    }
    
    navigator.clipboard.writeText(wish).then(() => {
        alert("Wish copied to clipboard!");
    });
}

// Guestbook Functions
function addGuestMessage() {
    const name = document.getElementById('guest-name').value.trim();
    const message = document.getElementById('guest-message').value.trim();
    
    if (!name || !message) {
        alert("Please enter both your name and a message!");
        return;
    }
    
    const messagesContainer = document.getElementById('guestbook-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('guestbook-message');
    
    const now = new Date();
    const dateStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    messageElement.innerHTML = `
        <div class="guestbook-message-header">
            <div class="guestbook-message-name">${name}</div>
            <div class="guestbook-message-date">${dateStr}</div>
        </div>
        <div class="guestbook-message-text">${message}</div>
    `;
    
    messagesContainer.insertBefore(messageElement, messagesContainer.firstChild);
    
    // Clear form
    document.getElementById('guest-name').value = '';
    document.getElementById('guest-message').value = '';
    
    // Show success message
    alert("Your message has been added to the guestbook!");
}

// Show a specific section
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Special animations for specific sections
    if (sectionId === 'thankyou') {
        showBirthdayCake();
        createFireworks();
    } else {
        hideBirthdayCake();
    }
    
    // Reset photo booth when leaving the section
    if (sectionId !== 'photobooth') {
        resetPhotoBooth();
    }
    
    // Start typing animation for section text
    switch(sectionId) {
        case 'message':
            typeText('message-text', "Saima, today is not just another day… it's your special day! You are an amazing person, full of kindness, light, and sincerity. I hope this little website makes your 19th birthday brighter and more memorable.");
            break;
        case 'memories':
            typeText('memories-text', "Here are some lovely pictures and memories collected for Saima. Each image holds a special story and wonderful memory!");
            break;
        case 'gifts':
            typeText('gifts-text', "Click on each gift box to reveal a special birthday wish for Saima!");
            break;
        case 'interactive-cake':
            typeText('interactive-cake-text', "Make a wish and click on each flame to blow out the candles!");
            break;
        case 'scrapbook':
            typeText('scrapbook-text', "A digital scrapbook filled with precious memories of Saima!");
            break;
        case 'photobooth':
            typeText('photobooth-text', "Take a fun birthday photo with different frames or use your favorite memories! Click on any memory photo to use it in the photo booth.");
            break;
        case 'wishes-generator':
            typeText('wishes-generator-text', "Generate personalized birthday wishes for Saima in different styles!");
            break;
        case 'guestbook':
            typeText('guestbook-text', "Leave a special birthday message for Saima in this digital guestbook!");
            break;
        case 'quiz':
            typeText('quiz-text', "Test your knowledge about Saima's birthday and celebrations! Answer all questions to continue to the next surprise.");
            // Initialize quiz with a small delay to ensure the section is visible
            setTimeout(() => {
                initializeQuiz();
            }, 100);
            break;
        case 'game':
            typeText('game-text', "Match all pairs to continue to Saima's next special surprise.");
            initializeGame();
            break;
        case 'letter':
            startTypingAnimation();
            break;
        case 'wishes':
            typeText('wishes-text', "May Saima's future be bright, peaceful, and filled with success. You deserve everything beautiful in life.");
            break;
        case 'thankyou':
            typeText('thankyou-text', "I hope this little website made Saima's 21th birthday special. Wishing you joy, love, and endless blessings for the year ahead.");
            break;
    }
}

// Reset Photo Booth
function resetPhotoBooth() {
    // Stop camera if active
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
    
    // Reset UI elements
    document.getElementById('camera-video').style.display = 'block';
    const photoPreview = document.getElementById('photo-preview');
    if (photoPreview) {
        photoPreview.style.display = 'none';
    }
    document.getElementById('start-camera').style.display = 'inline-block';
    document.getElementById('take-photo').style.display = 'none';
    document.getElementById('retake-photo').style.display = 'none';
    document.getElementById('photo-result').style.display = 'none';
    
    // Reset selected photo
    selectedPhotoIndex = -1;
}

// Typing animation for letter
function startTypingAnimation() {
    const text = "Dear Saima,\n\nI just wanted to take a moment to thank you for being you.\nYou bring positivity, warmth, and inspiration wherever you go.\nYour presence makes every moment brighter and more meaningful.\n\nI hope this 19th year brings you endless happiness and success.\nMay every day be as special as you are,\nand may all your dreams take flight.\n\nYou deserve all the love and joy in the world!\n\nWith love and best wishes,\nYour birthday well-wisher";
    
    const typedTextElement = document.getElementById('typed-text');
    const cursor = document.getElementById('cursor');
    const letterNextBtn = document.getElementById('letter-next-btn');
    
    typedTextElement.textContent = '';
    cursor.style.display = 'inline-block';
    letterNextBtn.style.display = 'none';
    
    let index = 0;
    const typingSpeed = 50;
    
    function type() {
        if (index < text.length) {
            if (text.charAt(index) === '\n') {
                typedTextElement.innerHTML += '<br>';
            } else {
                typedTextElement.textContent += text.charAt(index);
            }
            index++;
            setTimeout(type, typingSpeed);
        } else {
            // Hide cursor after typing is complete
            setTimeout(() => {
                cursor.style.display = 'none';
                letterNextBtn.style.display = 'inline-block';
            }, 1000);
        }
    }
    
    type();
}

// Memory game logic
const gameCards = [
    { id: 1, emoji: '🎈' },
    { id: 2, emoji: '🎂' },
    { id: 3, emoji: '🎁' },
    { id: 4, emoji: '🎉' },
    { id: 5, emoji: '🎊' },
    { id: 6, emoji: '🥳' }
];

let gameCardsArray = [];
let flippedCards = [];
let matchedPairs = 0;

function initializeGame() {
    // Reset game state
    gameCardsArray = [];
    flippedCards = [];
    matchedPairs = 0;
    
    // Create pairs of cards
    gameCards.forEach(card => {
        gameCardsArray.push({ ...card, uniqueId: card.id * 2 });
        gameCardsArray.push({ ...card, uniqueId: card.id * 2 + 1 });
    });
    
    // Shuffle cards
    gameCardsArray.sort(() => Math.random() - 0.5);
    
    // Create game board
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
    
    gameCardsArray.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-game-card');
        cardElement.dataset.id = card.id;
        cardElement.dataset.index = index;
        
        cardElement.innerHTML = `
            <div class="card-front">
                <i class="fas fa-question"></i>
            </div>
            <div class="card-back">
                <span>${card.emoji}</span>
            </div>
        `;
        
        cardElement.addEventListener('click', flipCard);
        gameContainer.appendChild(cardElement);
    });
    
    // Hide next button
    document.getElementById('game-next-btn').style.display = 'none';
}

function flipCard() {
    // If card is already flipped or matched, or if we've already flipped 2 cards, return
    if (flippedCards.length >= 2 || this.classList.contains('flipped') || this.classList.contains('matched')) {
        return;
    }
    
    // Flip the card
    this.classList.add('flipped');
    flippedCards.push(this);
    
    // Check if we've flipped 2 cards
    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];
    
    // Check if the cards match
    if (card1.dataset.id === card2.dataset.id) {
        // Cards match
        setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');
            flippedCards = [];
            matchedPairs++;
            
            // Check if all pairs have been matched
            if (matchedPairs === gameCards.length) {
                // Show the next button
                document.getElementById('game-next-btn').style.display = 'inline-block';
            }
        }, 500);
    } else {
        // Cards don't match
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Birthday cake animation
function showBirthdayCake() {
    const cake = document.getElementById('birthday-cake');
    cake.classList.add('show');
}

function hideBirthdayCake() {
    const cake = document.getElementById('birthday-cake');
    cake.classList.remove('show');
}

// Fireworks animation
function createFireworks() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#ff1493'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight / 2;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Create explosion point
            const explosion = document.createElement('div');
            explosion.style.position = 'fixed';
            explosion.style.left = `${x}px`;
            explosion.style.top = `${y}px`;
            explosion.style.width = '4px';
            explosion.style.height = '4px';
            explosion.style.borderRadius = '50%';
            explosion.style.backgroundColor = color;
            explosion.style.zIndex = '100';
            document.body.appendChild(explosion);
            
            // Create particles
            for (let j = 0; j < 30; j++) {
                const particle = document.createElement('div');
                particle.classList.add('firework');
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;
                particle.style.backgroundColor = color;
                
                // Random direction
                const angle = Math.random() * Math.PI * 2;
                const velocity = 50 + Math.random() * 50;
                particle.style.setProperty('--x', `${Math.cos(angle) * velocity}px`);
                particle.style.setProperty('--y', `${Math.sin(angle) * velocity}px`);
                
                document.body.appendChild(particle);
                
                // Remove particle after animation
                setTimeout(() => {
                    particle.remove();
                }, 1500);
            }
            
            // Remove explosion point
            setTimeout(() => {
                explosion.remove();
            }, 100);
        }, i * 1000);
    }
}

// Confetti burst effect
function createConfettiBurst() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#ff1493'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.opacity = '0.8';
        confetti.style.transform = 'translate(-50%, -50%)';
        confetti.style.zIndex = '1000';
        
        document.body.appendChild(confetti);
        
        // Animate confetti
        const angle = Math.random() * Math.PI * 2;
        const velocity = 5 + Math.random() * 10;
        const lifetime = 1000 + Math.random() * 1000;
        
        let opacity = 0.8;
        let posX = window.innerWidth / 2;
        let posY = window.innerHeight / 2;
        let posYVel = -Math.abs(Math.sin(angle) * velocity);
        let posXVel = Math.cos(angle) * velocity;
        let gravity = 0.2;
        
        const animateConfetti = () => {
            posX += posXVel;
            posY += posYVel;
            posYVel += gravity;
            opacity -= 0.01;
            
            confetti.style.left = `${posX}px`;
            confetti.style.top = `${posY}px`;
            confetti.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animateConfetti);
            } else {
                confetti.remove();
            }
        };
        
        requestAnimationFrame(animateConfetti);
    }
}

// Chatbot functionality
function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    
    chatbot.classList.toggle('active');
    chatbotToggle.classList.toggle('hidden');
}

function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Generate bot response
    setTimeout(() => {
        const response = generateBotResponse(message);
        addMessage(response, 'bot');
    }, 500);
}

function handleChatInput(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = text;
    messagesContainer.appendChild(messageElement);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return "Hello there! How are you enjoying Saima's birthday celebration?";
    } else if (lowerMessage.includes('saima')) {
        return "Saima is such a special person! I hope you're enjoying this personalized birthday website created just for her.";
    } else if (lowerMessage.includes('birthday')) {
        return "Saima's 19th birthday is so special! Born on February 25, 2005, she brings so much joy to everyone around her.";
    } else if (lowerMessage.includes('help')) {
        return "I'm here to help! You can navigate through different sections using the buttons. Enjoy Saima's memories, games, and special surprises!";
    } else if (lowerMessage.includes('game')) {
        return "There are two fun games for Saima's birthday! The Birthday Quiz and Memory Match Game. Both are great fun!";
    } else if (lowerMessage.includes('memory') || lowerMessage.includes('memories')) {
        return "The memories section contains beautiful moments of Saima. Each image has a special caption and overlay text!";
    } else if (lowerMessage.includes('color') || lowerMessage.includes('theme')) {
        return "You can change the website's theme using the color buttons at the top left! Try different themes to see which you like best!";
    } else if (lowerMessage.includes('19') || lowerMessage.includes('age')) {
        return "Yes! Saima is celebrating her 19th birthday! What a wonderful milestone in her life journey.";
    } else if (lowerMessage.includes('gift')) {
        return "Don't miss the virtual gifts section! Click on each gift box to reveal a special birthday wish for Saima!";
    } else if (lowerMessage.includes('cake')) {
        return "Make sure to check out the interactive cake section! You can blow out the candles and make a wish!";
    } else if (lowerMessage.includes('photo')) {
        return "The photo booth is so much fun! You can take a picture with different birthday frames or use your favorite memories!";
    } else if (lowerMessage.includes('wish')) {
        return "The wishes generator can create personalized birthday wishes in different styles - heartfelt, funny, inspirational, or poetic!";
    } else if (lowerMessage.includes('guestbook')) {
        return "Don't forget to leave a message in the guestbook! Saima would love to read your birthday wishes!";
    } else if (lowerMessage.includes('scrapbook')) {
        return "The digital scrapbook contains precious memories of Saima with stickers and decorations!";
    } else if (lowerMessage.includes('thank')) {
        return "You're welcome! I'm glad I could help make Saima's special day even more memorable.";
    } else {
        return "That's interesting! I'm here to help with anything related to Saima's special birthday celebration. Feel free to ask me about any section!";
    }
}

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    createBackgroundElements();
    typeText('welcome-text', "Welcome to a special corner of the internet created just for Saima Jahangir. Click below to begin your birthday journey and celebrate this wonderful person!");
    
    // Start countdown timer
    setInterval(updateCountdown, 1000);
    updateCountdown();

});
