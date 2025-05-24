// Copy order to clipboard function
function copyOrderToClipboard() {
  const order = window.orderDetails;
  let orderText = "🌿 CASTILLA FARM ORDER 🌿\n";
  orderText += "========================\n\n";
  
  if (order.coconut > 0) orderText += `🥥 Young Coconut: ${order.coconut} pcs × ₱7.00 = ₱${(order.coconut * 7).toLocaleString()}\n`;
  if (order.dragonfruit > 0) orderText += `🐲 Dragon Fruit: ${order.dragonfruit} kg × ₱120.00 = ₱${(order.dragonfruit * 120).toLocaleString()}\n`;
  if (order.banana > 0) orderText += `🍌 Fresh Banana: ${order.banana} kg × ₱75.00 = ₱${(order.banana * 75).toLocaleString()}\n`;
  if (order.corn > 0) orderText += `🌽 Corn Meal: ${order.corn} sack × ₱1500.00 = ₱${(order.corn * 1500).toLocaleString()}\n`;
  
  orderText += "\n========================\n";
  orderText += `💰 TOTAL: ₱${order.total.toLocaleString()}\n`;
  orderText += "========================\n\n";
  orderText += "📍 Location: Brgy. Bog-o, Asturias, Cebu\n";
  orderText += "📞 Contact: 09561558776\n";
  orderText += "🌱 Fresh from our farm to your table!";

  navigator.clipboard.writeText(orderText).then(() => {
    showCopyNotification();
  }).catch(() => {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = orderText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showCopyNotification();
  });
}

// Take screenshot function
function takeScreenshot() {
  const confirmationBox = document.getElementById('confirmationBox');
  
  // Use html2canvas library (you'll need to include it)
  if (typeof html2canvas !== 'undefined') {
    html2canvas(confirmationBox, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true
    }).then(canvas => {
      // Create download link
      const link = document.createElement('a');
      link.download = `Castilla-Farm-Order-${new Date().toISOString().slice(0,10)}.png`;
      link.href = canvas.toDataURL();
      link.click();
      showScreenshotNotification();
    });
  } else {
    // Fallback: Open print dialog
    window.print();
    showScreenshotNotification('Print dialog opened!');
  }
}

// Show copy notification
function showCopyNotification() {
  const notification = document.getElementById('copyNotification');
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Show screenshot notification
function showScreenshotNotification(message = '📸 Screenshot saved!') {
  const notification = document.getElementById('screenshotNotification');
  notification.textContent = message;
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Navigation scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
    } else {
    navbar.classList.remove('scrolled');
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('visible');
    }
    });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
});

// Toggle history function
function toggleHistory() {
    const historyText = document.getElementById("historyText");
    historyText.classList.toggle('show');
}

// Order functions
function submitOrder() {
    const coconut = parseInt(document.getElementById('coconut').value) || 0;
    const dragonfruit = parseInt(document.getElementById('dragonfruit').value) || 0;
    const banana = parseInt(document.getElementById('banana').value) || 0;
    const corn = parseInt(document.getElementById('corn').value) || 0;

    if (coconut === 0 && dragonfruit === 0 && banana === 0 && corn === 0) {
    alert('Please select at least one product to order.');
    return;
    }

    const prices = {
    coconut: 7,
    dragonfruit: 120,
    banana: 75,
    corn: 1500
    };

    const total = coconut * prices.coconut +
                dragonfruit * prices.dragonfruit +
                banana * prices.banana +
                corn * prices.corn;

    let orderItems = [];
    if (coconut > 0) orderItems.push(`Young Coconut: ${coconut} pcs × ₱7.00 = ₱${coconut * 7}`);
    if (dragonfruit > 0) orderItems.push(`Dragon Fruit: ${dragonfruit} kg × ₱120.00 = ₱${dragonfruit * 120}`);
    if (banana > 0) orderItems.push(`Fresh Banana: ${banana} kg × ₱75.00 = ₱${banana * 75}`);
    if (corn > 0) orderItems.push(`Corn Meal: ${corn} sack × ₱1500.00 = ₱${corn * 1500}`);

    const summary = `
    <h3 style="color: var(--primary-green); margin-bottom: 20px;">Order Summary</h3>
    <div style="text-align: left; margin-bottom: 20px;">
        ${orderItems.map(item => `<p style="margin: 10px 0; font-size: 1.1rem;">${item}</p>`).join('')}
    </div>
    <div style="border-top: 2px solid var(--light-green); padding-top: 15px;">
        <p style="font-size: 1.3rem; font-weight: bold; color: var(--primary-green);">Total: ₱${total.toLocaleString()}</p>
    </div>
    <p style="margin-top: 20px; color: var(--accent-green); font-size: 0.9rem;">
        Note: You'll be redirected to our messenger where your order details will be automatically copied. Please paste them in the chat and wait for our response.
    </p>
    `;

    document.getElementById("confirmationBox").classList.add('show');
    document.getElementById("orderSummary").innerHTML = summary;
    document.getElementById("finalConfirmation").innerText = "";

    // Store order details globally
    window.orderDetails = {
    coconut,
    dragonfruit,
    banana,
    corn,
    total
    };
}

function confirmOrder() {
    const fbUsername = "delfa.castilla";
    const order = window.orderDetails;

    let orderText = "Order Details:\n";
    if (order.coconut > 0) orderText += `Coconut: ${order.coconut} pcs\n`;
    if (order.dragonfruit > 0) orderText += `Dragonfruit: ${order.dragonfruit} kg\n`;
    if (order.banana > 0) orderText += `Banana: ${order.banana} kg\n`;
    if (order.corn > 0) orderText += `Corn: ${order.corn} sacks\n`;
    orderText += `Total: ₱${order.total.toLocaleString()}`;

    const encodedMessage = encodeURIComponent(orderText);
    const messengerLink = `https://m.me/${fbUsername}?ref=order&message=${encodedMessage}`;

    // Copy to clipboard
    navigator.clipboard.writeText(orderText).then(() => {
    window.open(messengerLink, '_blank');
    }).catch(() => {
    window.open(messengerLink, '_blank');
    });

    document.getElementById("confirmationBox").classList.remove('show');
    document.getElementById("finalConfirmation").innerText = "Order sent successfully! Thank you for choosing Castilla Farm.";
    document.getElementById("orderForm").reset();
}

function cancelOrder() {
    document.getElementById("confirmationBox").classList.remove('show');
    document.getElementById("finalConfirmation").innerText = "Order canceled.";
}

// Feedback form handler
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !message) {
    alert("Please fill out all fields.");
    return;
    }

    const feedbackText = `Feedback from ${name}:\n${message}`;
    const encodedFeedback = encodeURIComponent(feedbackText);
    const fbUsername = "delfa.castilla";
    const messengerLink = `https://m.me/${fbUsername}?ref=feedback&message=${encodedFeedback}`;

    // Copy to clipboard
    navigator.clipboard.writeText(feedbackText).then(() => {
    window.open(messengerLink, '_blank');
    }).catch(() => {
    window.open(messengerLink, '_blank');
    });

    document.getElementById("feedbackResponse").innerText = "Feedback sent successfully! Thank you for your input.";
    document.getElementById("feedbackForm").reset();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
        target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
        });
    }
    });
});