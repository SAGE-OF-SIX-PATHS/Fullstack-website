import { Request, Response } from 'express';
import Product from '../models/product.model';
import mongoose from 'mongoose';

// Get all products
export const getProducts = async (req: Request, res: Response) => {
          console.log('📦 Fetching all products...');
          try {
                    const products = await Product.find({});
                    console.log(`✅ Found ${products.length} products.`);
                    res.json(products);
          } catch (error) {
                    console.error('❌ Get products error:', error);
                    res.status(500).json({ message: 'Server error' });
          }
};

// Get a single product by ID
export const getProductById = async (
          req: Request<{ id: string }>,
          res: Response
): Promise<void> => {
          const { id } = req.params;
          console.log(`🔍 Fetching product with ID: ${id}`);

          // ✅ Validate ObjectId
          if (!mongoose.Types.ObjectId.isValid(id)) {
                    console.log('⚠️ Invalid ObjectId format');
                    res.status(400).json({ message: 'Invalid product ID' });
                    return;
          }

          try {
                    const product = await Product.findById(id);
                    console.log('📄 Product fetch result:', product);

                    if (!product) {
                              console.log('⚠️ Product not found');
                              res.status(404).json({ message: 'Product not found' });
                              return;
                    }

                    console.log(`✅ Product found: ${product.name}`);
                    res.json(product);
          } catch (error) {
                    console.error('❌ Get product by ID error:', error);
                    res.status(500).json({ message: 'Server error' });
          }
};
        
// Create sample products (for development)
export const createSampleProducts = async (req: Request, res: Response) => {
          console.log('🛠️ Creating sample products...');
          try {
                    const sampleProducts = [
                              {
                                        name: 'Wireless Bluetooth Headphones',
                                        description:
                                                  'High-quality wireless headphones with noise cancellation and 20-hour battery life.',
                                        price: 149.99,
                                        image:
                                                  'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                                        category: 'electronics',
                                        countInStock: 10,
                              },
                              {
                                        name: 'Smartphone XYZ',
                                        description:
                                                  'Latest flagship smartphone with 128GB storage, 8GB RAM and amazing camera quality.',
                                        price: 899.99,
                                        image:
                                                  'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                                        category: 'electronics',
                                        countInStock: 7,
                              },
                              {
                                        name: 'Running Shoes',
                                        description:
                                                  'Lightweight running shoes with cushioned soles for maximum comfort during exercise.',
                                        price: 89.99,
                                        image:
                                                  'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                                        category: 'clothing',
                                        countInStock: 15,
                              },
                              {
                                        name: 'Coffee Maker',
                                        description:
                                                  'Programmable coffee maker with thermal carafe to keep your coffee hot for hours.',
                                        price: 79.99,
                                        image:
                                                  'https://images.pexels.com/photos/6316065/pexels-photo-6316065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                                        category: 'appliances',
                                        countInStock: 5,
                              },
                              {
                                        name: 'Laptop Pro',
                                        description:
                                                  'Powerful laptop with 16GB RAM, 512GB SSD, and dedicated graphics card for professionals.',
                                        price: 1299.99,
                                        image:
                                                  'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                                        category: 'electronics',
                                        countInStock: 3,
                              },
                              {
                                        name: 'Backpack',
                                        description:
                                                  'Durable backpack with laptop compartment, water bottle holders, and multiple pockets.',
                                        price: 49.99,
                                        image:
                                                  'https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                                        category: 'accessories',
                                        countInStock: 20,
                              },
                              {
                                        name: 'Smart Watch',
                                        description:
                                                  'Track your fitness, receive notifications, and more with this advanced smartwatch.',
                                        price: 199.99,
                                        image:
                                                  'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                                        category: 'electronics',
                                        countInStock: 8,
                              },
                              {
                                        name: 'Desk Lamp',
                                        description:
                                                  'Adjustable desk lamp with multiple brightness levels and color temperatures.',
                                        price: 39.99,
                                        image:
                                                  'https://images.pexels.com/photos/3844517/pexels-photo-3844517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                                        category: 'home',
                                        countInStock: 12,
                              },
                    ];

                    console.log('🧹 Deleting existing products...');
                    await Product.deleteMany({});
                    console.log('🗑️ Existing products deleted.');

                    console.log('📥 Inserting sample products...');
                    const createdProducts = await Product.insertMany(sampleProducts);
                    console.log(`✅ ${createdProducts.length} sample products created.`);

                    res.status(201).json({
                              message: 'Sample products created successfully',
                              count: createdProducts.length,
                              products: createdProducts,
                    });
          } catch (error) {
                    console.error('❌ Create sample products error:', error);
                    res.status(500).json({ message: 'Server error' });
          }
};
