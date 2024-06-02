// Replace with your actual CoinGecko API key
const apiKey = 'CG-oktS1eQtQrWXRLWh7E5cknWP';

const apiUrl = 'https://api.coingecko.com/api/v3/simple/price';

// Function to fetch and display prices
const fetchPrices = async (crypto) => {
  try {
    const response = await fetch(`${apiUrl}?ids=${crypto}&vs_currencies=usd`);
    const data = await response.json();
    const price = data[crypto].usd;
    document.getElementById('price-ticker').textContent = `Current Price: $${price.toFixed(2)}`;
    
    // Update chart data and render
    updateChartData(crypto, price);
  } catch (error) {
    console.error(error);
    document.getElementById('price-ticker').textContent = 'Error fetching data';
  }
};

// Function to update chart data and render
const updateChartData = (crypto, price) => {
  const ctx = document.getElementById('price-chart').getContext('2d');
  
  // Initialize and configure chart with chart.js or other libraries
  if (!window.chart) {
    window.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: crypto,
          data: [],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
              lineWidth: 1,
            }
          },
          x: {
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
              lineWidth: 1,
            }
          }
        }
      }
    });
  }

  // Add new data point to the chart
  window.chart.data.labels.push(new Date().toLocaleTimeString());
  window.chart.data.datasets[0].data.push(price);
  window.chart.update();
};

// Handle form submission
const cryptoForm = document.getElementById('crypto-form');
cryptoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const selectedCrypto = document.getElementById('crypto').value;
  fetchPrices(selectedCrypto);
});

// Implement real-time updates using setInterval
const updateInterval = 5000; // Update prices every 5 seconds
setInterval(() => {
  const selectedCrypto = document.getElementById('crypto').value;
  fetchPrices(selectedCrypto);
}, updateInterval);
