const BUDGET = 15;
const REQUIRED_MINIMUMS = {
    'fruits-vegetables': 4,
    'grains': 3,
    'proteins': 2
};
const PIN_CODE = "6458";
const foodItems = [
    { "id": "leek", "name": "Poireau", "image": "https://static.vecteezy.com/system/resources/previews/009/887/170/non_2x/white-rice-in-bow-free-png.png", "category": "fruits-vegetables", "price": 19.99 },
    { "id": "banana", "name": "Banane", "image": "https://example.com/images/rice.png", "category": "fruits-vegetables", "price": 29.99 },
    { "id": "apple", "name": "Pomme", "image": "https://example.com/images/rice.png", "category": "fruits-vegetables", "price": 39.99 },
    { "id": "carrot", "name": "Carotte", "image": "https://example.com/images/rice.png", "category": "fruits-vegetables", "price": 9.99 },
    { "id": "orange", "name": "Orange", "image": "https://example.com/images/rice.png", "category": "fruits-vegetables", "price": 24.99 },
    { "id": "pasta", "name": "Pâtes", "image": "https://example.com/images/rice.png", "category": "grains", "price": 49.99 },
    { "id": "rice", "name": "Riz", "image": "https://example.com/images/rice.png", "category": "grains", "price": 59.99 },
    { "id": "bread", "name": "Pain", "image": "https://example.com/images/rice.png", "category": "grains", "price": 14.99 },
    { "id": "milk", "name": "Lait", "image": "https://example.com/images/rice.png", "category": "proteins", "price": 34.99 },
    { "id": "cheese", "name": "Fromage", "image": "https://example.com/images/rice.png", "category": "proteins", "price": 44.99 },
    { "id": "yogurt", "name": "Yaourt", "image": "https://example.com/images/rice.png", "category": "proteins", "price": 27.99 },
    { "id": "butter", "name": "Beurre", "image": "https://example.com/images/rice.png", "category": "proteins", "price": 54.99 },
    { "id": "spinach", "name": "Épinards", "image": "https://example.com/images/rice.png", "category": "fruits-vegetables", "price": 22.99 },
    { "id": "grapes", "name": "Raisins", "image": "https://example.com/images/rice.png", "category": "fruits-vegetables", "price": 31.99 },
    { "id": "chicken", "name": "Poulet", "image": "https://example.com/images/rice.png", "category": "proteins", "price": 64.99 },
    { "id": "beef", "name": "Bœuf", "image": "https://example.com/images/rice.png", "category": "proteins", "price": 74.99 },
    { "id": "fish", "name": "Poisson", "image": "https://example.com/images/rice.png", "category": "proteins", "price": 69.99 },
    { "id": "tomato", "name": "Tomate", "image": "https://example.com/images/rice.png", "category": "fruits-vegetables", "price": 18.99 },
    { "id": "cucumber", "name": "Concombre", "image": "https://example.com/images/rice.png", "category": "fruits-vegetables", "price": 16.99 },
    { "id": "tofu", "name": "Tofu", "image": "https://example.com/images/rice.png", "category": "proteins", "price": 39.99 },
    { "id": "chickpeas", "name": "Pois chiches", "image": "https://example.com/images/rice.png", "category": "grains", "price": 29.99 },
    { "id": "lentils", "name": "Lentilles", "image": "https://example.com/images/rice.png", "category": "grains", "price": 24.99 },
    { "id": "chewing-gum", "name": "Chewing-gum", "image": "https://example.com/images/rice.png", "category": "others", "price": 4.99 },
    { "id": "chocolate", "name": "Chocolat", "image": "https://example.com/images/rice.png", "category": "others", "price": 14.99 }
]


// Image cache for loading product images
const imageCache = {};
const loadingImages = {};

function resolveImageSrc(imageValue) {
    if (!imageValue) return null;
    const val = String(imageValue).trim();
    if (val.startsWith('http://') || val.startsWith('https://')) {
        return val;
    }
    // Only direct links are supported in simplified mode
    return null;
}

function loadImage(imageName) {
    const src = resolveImageSrc(imageName);
    if (!src) return null;
    if (!imageCache[src]) {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            imageCache[src] = img;
            if (selectionManager) selectionManager.drawShelf();
        };
        img.onerror = () => {
            console.warn(`Échec du chargement de l'image: ${src}`);
        };
        return null; // still loading
    }
    return imageCache[src];
}

// Selection state
class SelectionManager {
    constructor() {
        this.selectedItems = new Set();
        this.canvas = document.getElementById('supermarketCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scaleFactor = 1;
        // Grid configuration
        this.cols = 3;
        this.rows = 6;
        this.gap = 16; // uniform spacing between items
        this.itemSize = 0; // computed based on canvas
        this.labelPadding = 22; // vertical space reserved for price label
        this.layoutMap = {}; // current item rectangles for hit testing
        this.lastSelectedItem = null; // track last added product
        this.items = []; // exactly 18 items used for drawing/selection
        this.init();
    }

    init() {
        // Limit to exactly 18 items (3x6 grid)
        this.items = foodItems.slice(0, this.cols * this.rows);
        this.setupCanvas();
        this.drawShelf();
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        this.canvas.addEventListener('touchstart', (e) => this.handleTouch(e));
        window.addEventListener('resize', () => this.handleResize());
        // Initialize budget display from BUDGET constant
        this.updateBudgetDisplay();
    }

    setupCanvas() {
        // Responsive width: clamp to a reasonable max for readability
        const containerWidth = this.canvas.parentElement.clientWidth - 10;
        const W = Math.min(containerWidth, 600);

        // Compute uniform item size to fill width with equal gaps
        this.itemSize = Math.floor((W - (this.cols + 1) * this.gap) / this.cols);
        const L = this.labelPadding;
        // Compute height from rows, item size, gaps and label area
        const H = this.rows * (this.itemSize + L) + (this.rows + 1) * this.gap;

        // Apply canvas size (CSS and backing store match for simplicity)
        this.canvas.width = W;
        this.canvas.height = H;
        this.canvas.style.width = W + 'px';
        this.canvas.style.height = H + 'px';
    }

    handleResize() {
        this.setupCanvas();
        this.drawShelf();
    }

    drawShelf() {
        const ctx = this.ctx;
        
        // Clear canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw subtle border
        ctx.strokeStyle = '#999';
        ctx.lineWidth = 1;
        ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Compute grid layout: 3 columns x 6 rows, equal gaps in X and Y,
        // reserve vertical space for price label to avoid overlap
        const cols = this.cols;
        const rows = this.rows;
        const W = this.canvas.width;
        const H = this.canvas.height;
        const L = this.labelPadding; // label height per row
        // Reset current layout map
        this.layoutMap = {};

        // Draw items in grid order with equal gaps
        this.items.forEach((item, index) => {
            const r = Math.floor(index / cols);
            const c = index % cols;
            const x = this.gap + c * (this.itemSize + this.gap);
            const y = this.gap + r * (this.itemSize + L + this.gap);

            // Store layout for hit-testing
            this.layoutMap[item.id] = { x, y, width: this.itemSize, height: this.itemSize };

            // Draw with uniform size
            this.drawFoodItem({ ...item, x, y, width: this.itemSize, height: this.itemSize });
        });
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
        ctx.font = 'bold 12px Arial';
        ctx.fillStyle = isSelected ? '#27ae60' : '#e74c3c';
        ctx.textAlign = 'center';
        // Ensure the price fits within reserved label area
        ctx.fillText(`€${item.price.toFixed(2).replace('.', ',')}`, centerX, centerY + radius + Math.min(this.labelPadding - 3, 15));
    }

    // Draw image from file
    drawImage(imageName, x, y, width, height) {
        const src = resolveImageSrc(imageName);
        const img = src ? imageCache[src] : null;

        if (img && img.complete && img.naturalWidth > 0) {
            try {
                this.ctx.drawImage(img, x, y, width, height);
            } catch (e) {
                console.error('Error drawing image:', e);
            }
        } else {
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
        
        // Check for clicks on circular items using current grid layout
        const clickedItem = this.items.find(item => {
            const layout = this.layoutMap[item.id];
            if (!layout) return false;
            const centerX = layout.x + layout.width / 2;
            const centerY = layout.y + layout.height / 2;
            const radius = Math.max(layout.width, layout.height) / 2;
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
            // Update last selected only when adding a product
            const added = this.items.find(i => i.id === itemId);
            if (added) {
                this.lastSelectedItem = added;
            }
        }
        
        this.drawShelf();
        this.updateDisplay();
        this.updateValidationStatus();
        this.updateLastSelectedDisplay();
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

        // Update budget total from BUDGET
        const budgetTotalEl = document.getElementById('budgetTotal');
        if (budgetTotalEl) {
            budgetTotalEl.textContent = `€${budget}`;
        }

        // Update last selected product display alongside budget
        this.updateLastSelectedDisplay();
    }

    getSelectedItems() {
        return Array.from(this.selectedItems).map(id => 
            this.items.find(item => item.id === id)
        );
    }



    clearSelection() {
        this.selectedItems.clear();
        this.lastSelectedItem = null;
        this.drawShelf();
        this.updateDisplay();
        this.updateValidationStatus();
        this.updateLastSelectedDisplay();
    }

    // Add/update last selected product display in the info panel row
    updateLastSelectedDisplay() {
        const lastEl = document.getElementById('lastSelectedRow');
        if (!lastEl) return;
        if (this.lastSelectedItem) {
            const price = `€${this.lastSelectedItem.price.toFixed(2).replace('.', ',')}`;
            lastEl.textContent = `${this.lastSelectedItem.name} — ${price}`;
        } else {
            lastEl.textContent = '';
        }
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
        this.requiredMinimums = REQUIRED_MINIMUMS;
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
                message: overall ? 'Prêt à continuer !' : 'Sélection incomplète'
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
                message: 'Toutes les exigences sont remplies ✓'
            };
        } else {
            return {
                valid: false,
                message: `Manquant : ${missingRequirements.join(', ')}`
            };
        }
    }

    getCategoryDisplayName(category) {
        const names = {
            'fruits-vegetables': 'Fruits & Légumes',
            'proteins': 'Protéines',
            'grains': 'Céréales',
            'others': 'Autres'
        };
        return names[category] || category;
    }

    validateBudget(selectedItems) {
        const totalSpent = selectedItems.reduce((sum, item) => sum + item.price, 0);
        
        if (totalSpent <= this.budgetLimit) {
            return {
                valid: true,
                message: `€${totalSpent.toFixed(2)} / €${this.budgetLimit} ✓`
            };
        } else {
            const overspent = totalSpent - this.budgetLimit;
            return {
                valid: false,
                message: `Dépassement de budget de €${overspent.toFixed(2)} (€${totalSpent.toFixed(2)}/€${this.budgetLimit})`
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
let isUnlocked = false;

function initSupermarket() {
    if (selectionManager) return;
    selectionManager = new SelectionManager();
}

function updatePinDisplay(current) {
    const display = document.getElementById('pinDisplay');
    if (!display) return;
    const masked = (current || '').padEnd(4, '•');
    display.textContent = masked;
}

function showPinError(msg) {
    const el = document.getElementById('pinError');
    if (el) el.textContent = msg || '';
}

function unlockIfValid(input) {
    if (input === PIN_CODE) {
        isUnlocked = true;
        const overlay = document.getElementById('pinOverlay');
        const app = document.getElementById('appContainer');
        if (overlay) overlay.style.display = 'none';
        if (app) app.style.display = '';
        initSupermarket();
        showPinError('');
        return true;
    }
    return false;
}

window.addEventListener('DOMContentLoaded', async () => {
    // Setup PIN keypad interactions
    let input = '';
    updatePinDisplay(input);
    showPinError('');
    document.querySelectorAll('.pin-key').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-key');
            if (key === 'clear') {
                input = '';
                updatePinDisplay(input);
                showPinError('');
                return;
            }
            if (key === 'ok') {
                if (!unlockIfValid(input)) {
                    showPinError('Code PIN incorrect');
                }
                return;
            }
            if (input.length < 4 && /\d/.test(key)) {
                input += key;
                updatePinDisplay(input);
                // Do not auto-unlock on 4 digits; require pressing OK
                if (input.length === 4) {
                    showPinError('');
                }
            }
        });
    });
});
