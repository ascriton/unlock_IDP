// Food items configuration - Organic mindmap layout for smartphone
const foodItems = [
    // Central items (larger, prominent)
    { id: 'apples', name: 'Pommes', image: 'Pommes', category: 'fruits-vegetables', price: 3.50, x: 80, y: 50, width: 100, height: 100 },
    { id: 'meat', name: 'Viande', image: 'Viande', category: 'proteins', price: 15.00, x: 250, y: 80, width: 95, height: 95 },
    
    // Medium items spread around
    { id: 'bread', name: 'Pain', image: 'Pain', category: 'grains', price: 3.10, x: 20, y: 180, width: 75, height: 75 },
    { id: 'fish', name: 'Poisson', image: 'Poisson', category: 'proteins', price: 12.50, x: 130, y: 200, width: 80, height: 80 },
    { id: 'chocolate', name: 'Chocolat', image: 'Chocolat', category: 'others', price: 6.20, x: 260, y: 210, width: 70, height: 70 },
    { id: 'carrots', name: 'Carottes', image: 'Carottes', category: 'fruits-vegetables', price: 2.20, x: 50, y: 290, width: 60, height: 60 },
    
    // Smaller items scattered
    { id: 'bananas', name: 'Bananes', image: 'Bananes', category: 'fruits-vegetables', price: 2.80, x: 150, y: 310, width: 65, height: 65 },
    { id: 'cheese', name: 'Fromage', image: 'Fromage', category: 'proteins', price: 8.30, x: 270, y: 300, width: 55, height: 55 },
    { id: 'pasta', name: 'Pâtes', image: 'Pâtes', category: 'grains', price: 2.90, x: 30, y: 380, width: 70, height: 70 },
    { id: 'rice', name: 'Riz', image: 'Riz', category: 'grains', price: 4.50, x: 140, y: 400, width: 65, height: 65 },
    
    // Bottom scattered items
    { id: 'strawberries', name: 'Fraises', image: 'Fraises', category: 'fruits-vegetables', price: 3.20, x: 250, y: 380, width: 60, height: 60 },
    { id: 'baguette', name: 'Baguette', image: 'Baguette', category: 'grains', price: 2.40, x: 80, y: 450, width: 55, height: 55 },
    { id: 'tomatoes', name: 'Tomates', image: 'Tomates', category: 'fruits-vegetables', price: 2.60, x: 180, y: 470, width: 50, height: 50 },
    { id: 'cookies', name: 'Biscuits', image: 'Biscuits', category: 'others', price: 5.80, x: 270, y: 450, width: 60, height: 60 },
    { id: 'lettuce', name: 'Laitue', image: 'Laitue', category: 'fruits-vegetables', price: 1.90, x: 20, y: 520, width: 50, height: 50 }
];

// SVG Icons collection
// const svgIcons = {
//     apple: 'M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 7.5V9C15 10.4 13.9 12 12 12S9 10.4 9 9V7.5L3 7V9C3 14 7.03 18 12 18S21 14 21 9Z',
//     bread: 'M12,2A3,3 0 0,1 15,5V6.5C15,7.43 15.57,8 16.5,8C17.43,8 18,7.43 18,6.5V5A6,6 0 0,0 12,2C11,2 10,2.25 9.2,2.7L11.2,4.7C11.5,4.4 11.75,4 12,2M9.2,2.7C6.4,4.1 4.1,6.4 2.7,9.2L4.7,11.2C4.4,11.5 4,11.75 2,12C2.25,10 2.7,9.2 2.7,9.2M2,12A3,3 0 0,1 5,15H6.5C7.43,15 8,15.57 8,16.5C8,17.43 7.43,18 6.5,18H5A6,6 0 0,0 2,12M22,12C22,17.5 17.5,22 12,22S2,17.5 2,12',
//     fish: 'M2,12C2,9.79 3.64,7.79 6.22,7.41C7.67,4.31 10.54,2 14,2C18.42,2 22,5.58 22,10C22,12.21 20.36,14.21 17.78,14.59C16.33,17.69 13.46,20 10,20C5.58,20 2,16.42 2,12M4,12C4,15.31 6.69,18 10,18C11.89,18 13.62,17.09 14.66,15.56C14.44,15.52 14.22,15.46 14,15.38C12.24,14.77 11,13.04 11,11C11,8.96 12.24,7.23 14,6.62C14.22,6.54 14.44,6.48 14.66,6.44C13.62,4.91 11.89,4 10,4C6.69,4 4,6.69 4,12Z',
//     lasagna: 'M2,17H22V19C22,20.1 21.1,21 20,21H4C2.9,21 2,20.1 2,19V17M3.15,13H20.85C20.5,11.81 19.4,11 18,11H6C4.6,11 3.5,11.81 3.15,13M20.85,13C20.5,14.19 19.4,15 18,15H6C4.6,15 3.5,14.19 3.15,15M22,6V8H2V6C2,4.9 2.9,4 4,4H20C21.1,4 22,4.9 22,6Z',
//     carrot: 'M16,6L18.29,8.29L16.41,10.17L18.17,11.93L15.93,14.17L14.17,12.41L12.29,14.29L10,12L16,6M6,18A2,2 0 0,0 8,16A2,2 0 0,0 6,14C4.89,14 4,14.89 4,16A2,2 0 0,0 6,18M12,3L14,5L12,7L10,5L12,3Z',
//     meat: 'M12,2C13.75,2 15.37,2.91 16.19,4.5C16.66,5.5 16.66,6.5 16.19,7.5C15.37,9.09 13.75,10 12,10C10.25,10 8.63,9.09 7.81,7.5C7.34,6.5 7.34,5.5 7.81,4.5C8.63,2.91 10.25,2 12,2M7,12C8.1,12 9,12.9 9,14V22H15V14C15,12.9 15.9,12 17,12C18.1,12 19,12.9 19,14V22H21V14C21,11.79 19.21,10 17,10C15.9,10 14.94,10.42 14.21,11.1C13.47,10.42 12.51,10 11.4,10C9.19,10 7.4,11.79 7.4,14V22H9V14C9,12.9 7.9,12 7,12Z',
//     banana: 'M17.78,2.32C19.74,2.57 21.59,3.69 22.91,5.55C24.22,7.41 24.22,9.59 22.91,11.45C21.59,13.31 19.74,14.43 17.78,14.68L15.5,14.5C13.5,14.21 11.66,13.09 10.34,11.23C9.03,9.37 9.03,7.19 10.34,5.33C11.66,3.47 13.5,2.35 15.5,2.06L17.78,2.32M17.5,4.32C16.19,4.13 14.84,4.67 13.91,5.77C12.97,6.86 12.54,8.36 12.73,9.77C12.92,11.18 13.69,12.39 14.84,13.03C15.98,13.66 17.35,13.66 18.5,13.03L17.5,4.32Z',
//     pasta: 'M3,11H21V13H19V20A1,1 0 0,1 18,21H16A1,1 0 0,1 15,20V13H9V20A1,1 0 0,1 8,21H6A1,1 0 0,1 5,20V13H3V11M12,3A4,4 0 0,1 16,7V9H14V7A2,2 0 0,0 12,5A2,2 0 0,0 10,7V9H8V7A4,4 0 0,1 12,3Z',
//     gum: 'M12,2A2,2 0 0,1 14,4V8A2,2 0 0,1 12,10A2,2 0 0,1 10,8V4A2,2 0 0,1 12,2M7,10V22H9V10H7M15,10V22H17V10H15Z',
//     lettuce: 'M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M7,9L12,14L17,9H7Z',
//     cheese: 'M12,2L2,7L12,12L22,7L12,2M2,17L12,22L22,17V10L12,15L2,10V17Z',
//     rice: 'M12,3L2,12H5V20H19V12H22L12,3M6,14H18V18H6V14Z',
//     strawberry: 'M12,2A1,1 0 0,1 13,3V4.5C13,5.33 13.67,6 14.5,6C15.33,6 16,6.67 16,7.5V12A6,6 0 0,1 10,18A6,6 0 0,1 4,12V7.5C4,6.67 4.67,6 5.5,6C6.33,6 7,5.33 7,4.5V3A1,1 0 0,1 8,2A1,1 0 0,1 9,3V4H11V3A1,1 0 0,1 12,2Z',
//     chocolate: 'M3,3V21H21V3H3M5,5H19V19H5V5M7,7V9H9V7H7M11,7V9H13V7H11M15,7V9H17V7H15M7,11V13H9V11H7M11,11V13H13V11H11M15,11V13H17V11H15M7,15V17H9V15H7M11,15V17H13V15H11M15,15V17H17V15H15Z',
//     cereal: 'M12,2C13.1,2 14,2.9 14,4V5H10V4C10,2.9 10.9,2 12,2M16,7V8H8V7H16M18,10V11H6V10H18M20,13V20C20,21.1 19.1,22 18,22H6C4.9,22 4,21.1 4,20V13H20Z',
//     egg: 'M12,3C7.03,3 3,7.95 3,14C3,18.42 6.58,22 11,22H13C17.42,22 21,18.42 21,14C21,7.95 16.97,3 12,3Z',
//     baguette: 'M2,12C2,9.79 3.64,7.79 6.22,7.41C7.67,4.31 10.54,2 14,2C18.42,2 22,5.58 22,10C22,12.21 20.36,14.21 17.78,14.59C16.33,17.69 13.46,20 10,20C5.58,20 2,16.42 2,12Z',
//     tomato: 'M12,2C13.1,2 14,2.9 14,4S13.1,6 12,6C10.9,6 10,5.1 10,4S10.9,2 12,2M21,9V7L15,7.5V9C15,10.4 13.9,12 12,12S9,10.4 9,9V7.5L3,7V9C3,14 7.03,18 12,18S21,14 21,9Z',
//     cookie: 'M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M9,8A1,1 0 0,0 8,9A1,1 0 0,0 9,10A1,1 0 0,0 10,9A1,1 0 0,0 9,8M15,11A1,1 0 0,0 14,12A1,1 0 0,0 15,13A1,1 0 0,0 16,12A1,1 0 0,0 15,11M11,14A1,1 0 0,0 10,15A1,1 0 0,0 11,16A1,1 0 0,0 12,15A1,1 0 0,0 11,14Z',
//     broccoli: 'M12,2A1,1 0 0,1 13,3V4.5C13,5.33 13.67,6 14.5,6C15.33,6 16,6.67 16,7.5V12A6,6 0 0,1 10,18A6,6 0 0,1 4,12V7.5C4,6.67 4.67,6 5.5,6C6.33,6 7,5.33 7,4.5V3A1,1 0 0,1 8,2A1,1 0 0,1 9,3V4H11V3A1,1 0 0,1 12,2Z'
// };

const BUDGET = 30;

// Image cache for loading product images
const imageCache = {};
const loadingImages = {};

function loadImage(imageName) {
    if (!imageCache[imageName]) {
        const img = new Image();
        img.src = `images/${imageName}.png`;
        
        // When image loads, redraw the canvas
        img.onload = () => {
            imageCache[imageName] = img;
            if (selectionManager) {
                selectionManager.drawShelf();
            }
        };
        
        img.onerror = () => {
            console.warn(`Failed to load image: images/${imageName}.png`);
        };
        
        return null; // Return null while loading
    }
    return imageCache[imageName];
}

// Selection state
class SelectionManager {
    constructor() {
        this.selectedItems = new Set();
        this.canvas = document.getElementById('supermarketCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scaleFactor = 1;
        this.init();
    }

    init() {
        this.setupCanvas();
        this.drawShelf();
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        this.canvas.addEventListener('touchstart', (e) => this.handleTouch(e));
        window.addEventListener('resize', () => this.handleResize());
    }

    setupCanvas() {
        // Set canvas size for smartphone organic mindmap layout
        const containerWidth = this.canvas.parentElement.clientWidth - 10;
        
        // Smartphone-optimized organic layout
        const maxWidth = Math.min(containerWidth, 400);
        const canvasHeight = 650; // Adjusted for organic layout
        
        this.scaleFactor = maxWidth / 400;
        this.canvas.width = 400;
        this.canvas.height = canvasHeight;
        this.canvas.style.width = maxWidth + 'px';
        this.canvas.style.height = (canvasHeight * this.scaleFactor) + 'px';
    }

    handleResize() {
        this.setupCanvas();
        this.drawShelf();
    }

    drawShelf() {
        const ctx = this.ctx;
        
        // Clear canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw vertical supermarket layout background
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw subtle border
        ctx.strokeStyle = '#999';
        ctx.lineWidth = 1;
        ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw food items
        foodItems.forEach(item => this.drawFoodItem(item));
    }

    drawFoodItem(item) {
        const ctx = this.ctx;
        const isSelected = this.selectedItems.has(item.id);
        const centerX = item.x + item.width / 2;
        const centerY = item.y + item.height / 2;
        const radius = Math.max(item.width, item.height) / 2;
        
        // Draw soft shadow for depth
        ctx.fillStyle = isSelected ? 'rgba(39, 174, 96, 0.15)' : 'rgba(0, 0, 0, 0.08)';
        ctx.beginPath();
        ctx.arc(centerX + 2, centerY + 3, radius + 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw circular selection highlight
        if (isSelected) {
            ctx.fillStyle = '#27ae60';
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius + 3, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Draw main circle
        ctx.fillStyle = isSelected ? '#e8f8f0' : '#ffffff';
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw circle border
        ctx.strokeStyle = isSelected ? '#1e8449' : '#ddd';
        ctx.lineWidth = isSelected ? 2 : 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Draw image centered in circle
        if (item.image) {
            this.drawImage(item.image, centerX - item.width / 2 + 5, centerY - item.height / 2 + 5, item.width - 10, item.height - 10);
        }
        
        // Draw price below the circle
        ctx.font = 'bold 10px Arial';
        ctx.fillStyle = isSelected ? '#27ae60' : '#e74c3c';
        ctx.textAlign = 'center';
        ctx.fillText(`€${item.price.toFixed(2).replace('.', ',')}`, centerX, centerY + radius + 15);
    }

    // Draw image from file
    drawImage(imageName, x, y, width, height) {
        const img = imageCache[imageName];
        
        if (img && img.complete && img.naturalWidth > 0) {
            // Image is loaded and valid
            try {
                this.ctx.drawImage(img, x, y, width, height);
            } catch (e) {
                console.error('Error drawing image:', e);
            }
        } else {
            // Load image if not already cached
            loadImage(imageName);
        }
    }

    handleClick(event) {
        this.handleInteraction(event);
    }

    handleTouch(event) {
        event.preventDefault();
        this.handleInteraction(event.touches[0]);
    }

    handleInteraction(event) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        
        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;
        
        // Check for clicks on circular items
        const clickedItem = foodItems.find(item => {
            const centerX = item.x + item.width / 2;
            const centerY = item.y + item.height / 2;
            const radius = Math.max(item.width, item.height) / 2;
            const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
            return distance <= radius;
        });
        
        if (clickedItem) {
            this.toggleSelection(clickedItem.id);
        }
    }

    toggleSelection(itemId) {
        if (this.selectedItems.has(itemId)) {
            this.selectedItems.delete(itemId);
        } else {
            this.selectedItems.add(itemId);
        }
        
        this.drawShelf();
        this.updateDisplay();
        this.updateValidationStatus();
    }

    updateValidationStatus() {
        const validator = new ValidationManager();
        const validation = validator.validate(this.getSelectedItems());
        
        // Update category counts in the existing HTML structure
        this.updateCategoryDisplay();
        
        // Update budget display
        this.updateBudgetDisplay();
    }

    updateDisplay() {
        this.updateCategoryDisplay();
        this.updateBudgetDisplay();
    }

    updateCategoryDisplay() {
        const selectedItems = this.getSelectedItems();
        
        // Group items by category
        const categories = {
            'fruits-vegetables': [],
            'proteins': [],
            'grains': [],
            'others': []
        };
        
        selectedItems.forEach(item => {
            if (categories[item.category]) {
                categories[item.category].push(item);
            }
        });
        
        // Update fruits & vegetables list
        const fruitsVegEl = document.getElementById('fruitsVegList');
        if (fruitsVegEl) {
            const fruitsVegItems = categories['fruits-vegetables'];
            fruitsVegEl.textContent = fruitsVegItems.length > 0 
                ? fruitsVegItems.map(item => item.name).join(', ') + ` (${fruitsVegItems.length})`
                : 'Aucun';
        }
        
        // Update proteins list
        const proteinsEl = document.getElementById('proteinsList');
        if (proteinsEl) {
            const proteinItems = categories['proteins'];
            proteinsEl.textContent = proteinItems.length > 0 
                ? proteinItems.map(item => item.name).join(', ') + ` (${proteinItems.length})`
                : 'Aucun';
        }
        
        // Update grains list
        const grainsEl = document.getElementById('grainsList');
        if (grainsEl) {
            const grainItems = categories['grains'];
            grainsEl.textContent = grainItems.length > 0 
                ? grainItems.map(item => item.name).join(', ') + ` (${grainItems.length})`
                : 'Aucun';
        }
        
        // Update others list
        const othersEl = document.getElementById('othersList');
        if (othersEl) {
            const otherItems = categories['others'];
            othersEl.textContent = otherItems.length > 0 
                ? otherItems.map(item => item.name).join(', ') + ` (${otherItems.length})`
                : 'Aucun';
        }
    }

    updateBudgetDisplay() {
        const selectedItems = this.getSelectedItems();
        const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
        const budget = BUDGET; // Budget limit from HTML
        const remaining = budget - total;
        
        // Update spent amount
        const spentEl = document.getElementById('spentAmount');
        if (spentEl) {
            spentEl.textContent = `€${Math.round(total * 100) / 100}`;
            spentEl.className = total > budget ? 'budget-amount budget-over' : 'budget-amount budget-ok';
        }
        
        // Update remaining amount
        const remainingEl = document.getElementById('remainingAmount');
        if (remainingEl) {
            const displayRemaining = Math.max(0, remaining);
            remainingEl.textContent = `€${Math.round(displayRemaining * 100) / 100}`;
            remainingEl.className = remaining < 0 ? 'budget-amount budget-over' : 'budget-amount budget-ok';
        }
    }

    getSelectedItems() {
        return Array.from(this.selectedItems).map(id => 
            foodItems.find(item => item.id === id)
        );
    }



    clearSelection() {
        this.selectedItems.clear();
        this.drawShelf();
        this.updateDisplay();
        this.updateValidationStatus();
    }
}

function validateSelection() {
    const validator = new ValidationManager();
    const validation = validator.validate(selectionManager.getSelectedItems());
    
    if (validation.overall.valid) {
        showModal(
            '🎉 Parfait !',
            `<p>Votre sélection est valide et prête à continuer !</p>
             <p><strong>Articles sélectionnés respectent tous les critères :</strong></p>
             <ul>
                <li>✓ Toutes les catégories alimentaires incluses</li>
                <li>✓ Dans la limite du budget</li>
                <li>Prenez la carte n° 35</li>
             </ul>`,
            'success'
        );
    } else {
        let messageBody = '<p>Votre sélection n\'est pas encore complète :</p><ul>';
        
        if (!validation.categories.valid) {
            messageBody += `<li>• ${validation.categories.message}</li>`;
        }
        if (!validation.budget.valid) {
            messageBody += `<li>• ${validation.budget.message}</li>`;
        }
        
        messageBody += '</ul>';
        
        showModal(
            '❌ Sélection incomplète',
            messageBody,
            'error'
        );
    }
}

function showModal(title, body, type = 'info') {
    const modal = document.getElementById('validationModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    
    // Set content
    modalTitle.textContent = title;
    modalBody.innerHTML = body;
    
    // Set styling based on type
    modalTitle.className = `modal-title ${type}`;
    modalCloseBtn.className = `modal-close-btn ${type === 'success' ? 'success' : ''}`;
    
    // Show modal
    modal.classList.add('show');
    
    // Focus on close button for accessibility
    setTimeout(() => modalCloseBtn.focus(), 100);
}

function closeModal() {
    const modal = document.getElementById('validationModal');
    modal.classList.remove('show');
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('validationModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Validation logic
class ValidationManager {
    constructor() {
        this.budgetLimit = BUDGET;
        this.requiredMinimums = {
            'fruits-vegetables': 3,
            'grains': 2,
            'proteins': 1
        };
    }

    validate(selectedItems) {
        const categoryValidation = this.validateCategories(selectedItems);
        const budgetValidation = this.validateBudget(selectedItems);
        const overall = categoryValidation.valid && budgetValidation.valid;

        return {
            categories: categoryValidation,
            budget: budgetValidation,
            overall: {
                valid: overall,
                message: overall ? 'Ready to continue!' : 'Selection incomplete'
            }
        };
    }

    validateCategories(selectedItems) {
        const categoryCounts = {};
        
        // Count items by category
        selectedItems.forEach(item => {
            categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
        });

        const missingRequirements = [];
        
        // Check minimum requirements
        for (const [category, minCount] of Object.entries(this.requiredMinimums)) {
            const currentCount = categoryCounts[category] || 0;
            if (currentCount < minCount) {
                const categoryName = this.getCategoryDisplayName(category);
                missingRequirements.push(`${categoryName}: ${currentCount}/${minCount}`);
            }
        }
        
        if (missingRequirements.length === 0) {
            return {
                valid: true,
                message: 'All requirements met ✓'
            };
        } else {
            return {
                valid: false,
                message: `Missing: ${missingRequirements.join(', ')}`
            };
        }
    }

    getCategoryDisplayName(category) {
        const names = {
            'fruits-vegetables': 'Fruits & Vegetables',
            'proteins': 'Proteins',
            'grains': 'Grains',
            'others': 'Others'
        };
        return names[category] || category;
    }

    validateBudget(selectedItems) {
        const totalSpent = selectedItems.reduce((sum, item) => sum + item.price, 0);
        
        if (totalSpent <= this.budgetLimit) {
            return {
                valid: true,
                message: `$${totalSpent.toFixed(2)} / $${this.budgetLimit} ✓`
            };
        } else {
            const overspent = totalSpent - this.budgetLimit;
            return {
                valid: false,
                message: `Over budget by $${overspent.toFixed(2)} (${totalSpent.toFixed(2)}/${this.budgetLimit})`
            };
        }
    }
}

// Global functions for HTML buttons
function clearSelection() {
    if (selectionManager) {
        selectionManager.clearSelection();
    }
}

// Initialize the application
let selectionManager;

// Preload all product images
function preloadImages() {
    const imageNames = ['apple'];
    imageNames.forEach(name => loadImage(name));
}

window.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    selectionManager = new SelectionManager();
});
