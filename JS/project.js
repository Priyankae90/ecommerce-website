
  // Wait until the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search');
    const productCards = document.querySelectorAll('.content .card');
    const cartItemsContainer = document.querySelector('.right-sidebar .a');

    // Initialize an array to hold cart items
    let cart = [];

    // Function to filter products based on search input
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      productCards.forEach(card => {
        const title = card.querySelector('h2').textContent.toLowerCase();
        if (title.includes(query)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });

    // Function to handle "Add to Cart" button clicks
    document.querySelectorAll('.card button:nth-of-type(2)').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        const title = card.querySelector('h2').textContent;
        const priceText = card.querySelector('h3').textContent;
        const price = priceText.replace('Prize:$', '').trim();
        const imgSrc = card.querySelector('img').getAttribute('src');

        // Add item to cart array
        cart.push({ title, price, imgSrc });
        updateCartDisplay();
      });
    });

    // Function to update the cart display
    function updateCartDisplay() {
      // Clear previous cart items
      cartItemsContainer.innerHTML = '';

      if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>No items in cart.</p>';
        return;
      }

      // Display all cart items
      cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';

        const img = document.createElement('img');
        img.src = item.imgSrc;
        img.alt = item.title;
        img.style.width = '50px';

        const title = document.createElement('p');
        title.textContent = item.title;

        const price = document.createElement('p');
        price.textContent = `$${item.price}`;

        // Optional: Add a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Add';
         removeBtn.textContent ='Remove';
        removeBtn.addEventListener('click', () => {
          cart.splice(index, 1);
          updateCartDisplay();
        });

        itemDiv.appendChild(img);
        itemDiv.appendChild(title);
        itemDiv.appendChild(price);
        itemDiv.appendChild(removeBtn);

        cartItemsContainer.appendChild(itemDiv);
      });
    }

    // Handle "Buy" buttons
    document.querySelectorAll('.card button:nth-of-type(1)').forEach(btn => {
      btn.addEventListener('click', (e) => {
        alert('Thank you for your purchase!');
      });
    });
  });