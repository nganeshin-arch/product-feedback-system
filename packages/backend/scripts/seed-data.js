// Sample product data - 40 products across different categories
const products = [
  // Electronics (10 products)
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling headphones with 30-hour battery life and superior sound quality.',
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
  },
  {
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking, heart rate monitoring, and smartphone notifications on your wrist.',
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'
  },
  {
    name: 'Portable Power Bank 20000mAh',
    description: 'High-capacity portable charger with fast charging support for all your devices.',
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400'
  },
  {
    name: '4K Webcam',
    description: 'Crystal clear video calls with auto-focus and built-in noise-cancelling microphone.',
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400'
  },
  {
    name: 'Wireless Gaming Mouse',
    description: 'Precision gaming mouse with customizable RGB lighting and programmable buttons.',
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400'
  },
  {
    name: 'USB-C Hub Adapter',
    description: 'Multi-port hub with HDMI, USB 3.0, SD card reader, and power delivery.',
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400'
  },
  {
    name: 'Mechanical Keyboard RGB',
    description: 'Premium mechanical keyboard with customizable RGB backlighting and tactile switches.',
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400'
  },
  {
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof speaker with 360-degree sound and 12-hour battery life.',
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400'
  },
  {
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging for all Qi-enabled devices with LED indicator.',
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1591290619762-c588f0e8e23f?w=400'
  },
  {
    name: 'HD Monitor 27 inch',
    description: 'Ultra-slim bezel monitor with vibrant colors and adjustable stand.',
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400'
  },

  // Home & Kitchen (10 products)
  {
    name: 'Stainless Steel Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe and auto-shutoff feature.',
    category: 'Home & Kitchen',
    image_url: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400'
  },
  {
    name: 'Air Fryer XL',
    description: 'Healthy cooking with rapid air technology, 8 preset cooking functions.',
    category: 'Home & Kitchen',
    image_url: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400'
  },
  {
    name: 'Vacuum Cleaner Robot',
    description: 'Smart navigation, app control, and automatic charging for effortless cleaning.',
    category: 'Home & Kitchen',
    image_url: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400'
  },
  {
    name: 'Electric Kettle',
    description: 'Fast boiling kettle with temperature control and keep-warm function.',
    category: 'Home & Kitchen',
    image_url: 'https://images.unsplash.com/photo-1563822249366-3efbb5c8c5ca?w=400'
  },
  {
    name: 'Blender Pro',
    description: 'High-powered blender for smoothies, soups, and nut butters with multiple speeds.',
    category: 'Home & Kitchen',
    image_url: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400'
  },
  {
    name: 'Non-Stick Cookware Set',
    description: '10-piece cookware set with durable non-stick coating and heat-resistant handles.',
    category: 'Home & Kitchen',
    image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'
  },
  {
    name: 'Smart Thermostat',
    description: 'Energy-saving thermostat with app control and learning capabilities.',
    category: 'Home & Kitchen',
    image_url: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=400'
  },
  {
    name: 'LED Desk Lamp',
    description: 'Adjustable brightness and color temperature with USB charging port.',
    category: 'Home & Kitchen',
    image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400'
  },
  {
    name: 'Memory Foam Pillow',
    description: 'Ergonomic pillow with cooling gel and hypoallergenic cover.',
    category: 'Home & Kitchen',
    image_url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400'
  },
  {
    name: 'Storage Organizer Set',
    description: 'Stackable storage bins with labels for closet and pantry organization.',
    category: 'Home & Kitchen',
    image_url: 'https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?w=400'
  },

  // Sports & Fitness (5 products)
  {
    name: 'Yoga Mat Premium',
    description: 'Extra thick non-slip yoga mat with carrying strap and alignment marks.',
    category: 'Sports & Fitness',
    image_url: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400'
  },
  {
    name: 'Resistance Bands Set',
    description: 'Five resistance levels for strength training and physical therapy.',
    category: 'Sports & Fitness',
    image_url: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400'
  },
  {
    name: 'Adjustable Dumbbells',
    description: 'Space-saving dumbbells with quick weight adjustment from 5 to 52.5 lbs.',
    category: 'Sports & Fitness',
    image_url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400'
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes with responsive cushioning and breathable mesh.',
    category: 'Sports & Fitness',
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'
  },
  {
    name: 'Water Bottle Insulated',
    description: 'Stainless steel bottle keeps drinks cold for 24 hours or hot for 12 hours.',
    category: 'Sports & Fitness',
    image_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400'
  },

  // Books & Media (5 products)
  {
    name: 'E-Reader Tablet',
    description: 'Glare-free display with adjustable warm light and weeks of battery life.',
    category: 'Books & Media',
    image_url: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400'
  },
  {
    name: 'Noise-Cancelling Earbuds',
    description: 'True wireless earbuds with active noise cancellation and touch controls.',
    category: 'Books & Media',
    image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400'
  },
  {
    name: 'Streaming Media Player',
    description: '4K HDR streaming with voice remote and access to thousands of channels.',
    category: 'Books & Media',
    image_url: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400'
  },
  {
    name: 'Vinyl Record Player',
    description: 'Vintage-style turntable with built-in speakers and Bluetooth connectivity.',
    category: 'Books & Media',
    image_url: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400'
  },
  {
    name: 'Book Light Rechargeable',
    description: 'Clip-on reading light with adjustable brightness and flexible neck.',
    category: 'Books & Media',
    image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'
  },

  // Additional Electronics (5 products)
  {
    name: 'Laptop Stand Aluminum',
    description: 'Ergonomic laptop stand with adjustable height and angle for better posture.',
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400'
  },
  {
    name: 'External SSD 1TB',
    description: 'Ultra-fast portable SSD with USB-C connection and shock resistance.',
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400'
  },
  {
    name: 'Smart LED Light Bulbs',
    description: 'WiFi-enabled color-changing bulbs with app and voice control.',
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=400'
  },
  {
    name: 'Wireless Earbuds Pro',
    description: 'Premium earbuds with spatial audio and adaptive EQ technology.',
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400'
  },
  {
    name: 'Tablet 10 inch',
    description: 'Lightweight tablet with high-resolution display and long battery life.',
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400'
  },

  // Additional Home & Kitchen (3 products)
  {
    name: 'Instant Pot Multi-Cooker',
    description: '7-in-1 programmable pressure cooker for quick and easy meals.',
    category: 'Home & Kitchen',
    image_url: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400'
  },
  {
    name: 'Cordless Stick Vacuum',
    description: 'Powerful cordless vacuum with HEPA filtration and LED display.',
    category: 'Home & Kitchen',
    image_url: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400'
  },
  {
    name: 'Smart Doorbell Camera',
    description: 'HD video doorbell with motion detection and two-way audio.',
    category: 'Home & Kitchen',
    image_url: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400'
  },

  // Additional Sports & Fitness (2 products)
  {
    name: 'Fitness Tracker Band',
    description: 'Activity tracker with heart rate monitor and sleep tracking.',
    category: 'Sports & Fitness',
    image_url: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400'
  },
  {
    name: 'Foam Roller',
    description: 'High-density foam roller for muscle recovery and massage.',
    category: 'Sports & Fitness',
    image_url: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400'
  }
];

module.exports = { products };
