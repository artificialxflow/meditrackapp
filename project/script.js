// DOM Elements
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const currentDateElement = document.getElementById('currentDate');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    initializeChart();
});

function initializeApp() {
    // Set current date
    const today = new Date();
    const persianMonths = [
        'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
        'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
    ];
    
    const persianDays = [
        'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'
    ];
    
    const dayName = persianDays[today.getDay()];
    const day = today.getDate();
    const month = persianMonths[today.getMonth()];
    
    if (currentDateElement) {
        currentDateElement.textContent = `${dayName} ${day} ${month}`;
    }
    
    // Add entrance animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
}

function setupEventListeners() {
    // Sidebar toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
            closeSidebar();
        }
    });
    
    // Prevent sidebar from closing when clicking inside
    if (sidebar) {
        sidebar.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
    
    // Handle medication action buttons
    setupMedicationButtons();
    
    // Handle quick action buttons
    setupQuickActions();
    
    // Handle form submission
    setupFormHandlers();
}

function toggleSidebar() {
    if (sidebar.classList.contains('active')) {
        closeSidebar();
    } else {
        openSidebar();
    }
}

function openSidebar() {
    sidebar.classList.add('active');
    // Add backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'sidebar-backdrop active';
    backdrop.addEventListener('click', closeSidebar);
    document.body.appendChild(backdrop);
}

function closeSidebar() {
    sidebar.classList.remove('active');
    // Remove backdrop
    const backdrop = document.querySelector('.sidebar-backdrop');
    if (backdrop) {
        backdrop.remove();
    }
}

function setupMedicationButtons() {
    const medicationItems = document.querySelectorAll('.medication-item');
    
    medicationItems.forEach(item => {
        const checkButton = item.querySelector('.btn-outline-success');
        const delayButton = item.querySelector('.btn-outline-warning');
        const badge = item.querySelector('.badge');
        
        if (checkButton) {
            checkButton.addEventListener('click', function() {
                // Mark as taken
                badge.className = 'badge bg-success';
                badge.textContent = 'مصرف شد';
                
                // Add visual feedback
                item.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                }, 200);
                
                // Show notification
                showNotification('دارو با موفقیت ثبت شد!', 'success');
            });
        }
        
        if (delayButton) {
            delayButton.addEventListener('click', function() {
                // Mark as delayed
                badge.className = 'badge bg-warning';
                badge.textContent = 'به تعویق افتاد';
                
                // Show notification
                showNotification('دارو به تعویق افتاد. یادآوری جدید تنظیم شد.', 'warning');
            });
        }
    });
}

function setupQuickActions() {
    const quickActionButtons = document.querySelectorAll('.quick-action-btn');
    
    quickActionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

function setupFormHandlers() {
    const addMedicineForm = document.querySelector('#addMedicineModal form');
    const saveButton = document.querySelector('#addMedicineModal .btn-primary');
    
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            const medicineName = document.getElementById('medicineName').value;
            const dosage = document.getElementById('dosage').value;
            const frequency = document.getElementById('frequency').value;
            const time = document.getElementById('time').value;
            const notes = document.getElementById('notes').value;
            
            if (!medicineName || !dosage || !time) {
                showNotification('لطفاً تمام فیلدهای ضروری را پر کنید.', 'error');
                return;
            }
            
            // Simulate saving medicine
            setTimeout(() => {
                showNotification('دارو با موفقیت اضافه شد!', 'success');
                
                // Close modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('addMedicineModal'));
                modal.hide();
                
                // Reset form
                addMedicineForm.reset();
                
                // Update summary cards (simulate)
                updateSummaryCards();
            }, 500);
        });
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type} notification`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : type === 'warning' ? 'exclamation-triangle' : type === 'error' ? 'times' : 'info'}-circle"></i>
        ${message}
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 6rem;
        right: 1rem;
        z-index: 1060;
        min-width: 300px;
        max-width: 400px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function updateSummaryCards() {
    // Simulate updating summary cards
    const activeMedicinesCard = document.querySelector('.card-primary h3');
    const todayRemindersCard = document.querySelector('.card-success h3');
    
    if (activeMedicinesCard) {
        const current = parseInt(activeMedicinesCard.textContent);
        activeMedicinesCard.textContent = current + 1;
    }
    
    if (todayRemindersCard) {
        const current = parseInt(todayRemindersCard.textContent);
        todayRemindersCard.textContent = current + 1;
    }
}

function initializeChart() {
    const ctx = document.getElementById('weeklyChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'],
            datasets: [{
                label: 'نرخ مصرف دارو (%)',
                data: [85, 92, 78, 95, 88, 90, 82],
                borderColor: '#4A90E2',
                backgroundColor: 'rgba(74, 144, 226, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#4A90E2',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            elements: {
                point: {
                    hoverRadius: 8
                }
            }
        }
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification {
        animation: slideInRight 0.3s ease-out;
    }
    
    .btn:active {
        transform: scale(0.95);
    }
    
    .medication-item:hover {
        transform: translateY(-2px);
    }
    
    .loaded .card,
    .loaded .summary-card {
        animation: fadeIn 0.6s ease-out;
    }
`;
document.head.appendChild(style);

// Handle touch events for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (swipeDistance > swipeThreshold) {
        // Swipe right - open sidebar
        openSidebar();
    } else if (swipeDistance < -swipeThreshold) {
        // Swipe left - close sidebar
        closeSidebar();
    }
}

// Service Worker registration for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }).catch(function(err) {
            console.log('ServiceWorker registration failed');
        });
    });
}