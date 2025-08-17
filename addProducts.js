const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');

const products = [
  {
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation.",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Smart Watch",
    description: "Track your fitness and notifications with this smart watch.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable speaker with deep bass and long battery life.",
    price: 29.99,
    image: "https://cdn.thewirecutter.com/wp-content/media/2024/11/portablebluetoothspeakers-2048px-9481.jpg?auto=webp&quality=75&width=1024"
  },
  {
    name: "Gaming Mouse",
    description: "Ergonomic gaming mouse with customizable DPI and RGB lighting.",
    price: 39.99,
    image: "https://bpc.h-cdn.co/assets/18/07/1280x640/landscape-1518539915-gaming-mouse.gif"
  },
  {
    name: "Mechanical Keyboard",
    description: "Tactile mechanical keyboard with backlit keys and durable switches.",
    price: 79.99,
    image: "https://miro.medium.com/v2/resize:fit:1044/1*D8xrKPbB3VGeI9Qb58o4YA.jpeg"
  },
  {
    name: "4K Monitor",
    description: "Ultra HD 4K monitor with vibrant colors and fast refresh rate.",
    price: 299.99,
    image: "https://i.pcmag.com/imagery/roundups/01Y9bqNdRmGOzHcetHQG2FW-36.fit_lim.size_1050x.webp"
  },
  {
    name: "USB-C Hub",
    description: "Multi-port USB-C hub for laptops and tablets.",
    price: 24.99,
    image: "https://s.yimg.com/uu/api/res/1.2/ydtRk15_FJcG9.M6pHOCMw--~B/Zmk9c3RyaW07aD03MjA7dz0xMjgwO2FwcGlkPXl0YWNoeW9u/https://s.yimg.com/os/creatr-uploaded-images/2024-08/80c60420-5373-11ef-bd39-1e19ef37202f"
  },
  {
    name: "Portable SSD",
    description: "Fast and reliable portable SSD for data storage on the go.",
    price: 119.99,
    image: "https://assets.hardwarezone.com/img/2023/11/SSD-T5-EVO_KV_Landscape.jpg"
  },
  {
    name: "Noise Cancelling Earbuds",
    description: "Compact earbuds with active noise cancellation and long battery life.",
    price: 49.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkMSUOpafXRAYJ0mzPudSvhDrkDbIPar4_HsG6zXu7uQCvuqvJWQ7DLjKJuoQjJ0QDHSE&usqp=CAU"
  },
  {
    name: "Fitness Tracker",
    description: "Track your steps, heart rate, and sleep with this stylish fitness tracker.",
    price: 34.99,
    image: "https://cdn.thewirecutter.com/wp-content/media/2023/11/fitness-tracker-2048px-5344.jpg?auto=webp&quality=75&crop=1.91:1&width=1200"
  }
];

const seedDB = async () => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern_auth_demo';
  await mongoose.connect(MONGO_URI);
  
  console.log('Clearing existing products...');
  await Product.deleteMany({});
  
  console.log('Adding new products...');
  await Product.insertMany(products);
  
  console.log('Database seeding complete!');
};

seedDB().then(() => {
  mongoose.connection.close();
}); 