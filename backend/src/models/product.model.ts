import mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
          name: string;
          description: string;
          price: number;
          image: string;
          category: string;
          countInStock: number;
          createdAt: Date;
          updatedAt: Date;
}

const productSchema = new mongoose.Schema<IProduct>(
          {
                    name: {
                              type: String,
                              required: [true, 'Please provide a product name'],
                              trim: true,
                    },
                    description: {
                              type: String,
                              required: [true, 'Please provide a product description'],
                    },
                    price: {
                              type: Number,
                              required: [true, 'Please provide a product price'],
                              min: [0, 'Price cannot be negative'],
                    },
                    image: {
                              type: String,
                              required: [true, 'Please provide a product image URL'],
                    },
                    category: {
                              type: String,
                              required: [true, 'Please provide a product category'],
                    },
                    countInStock: {
                              type: Number,
                              required: [true, 'Please provide count in stock'],
                              min: [0, 'Count in stock cannot be negative'],
                              default: 0,
                    },
          },
          {
                    timestamps: true,
          }
);

const ProductModel = mongoose.model<IProduct>('Product', productSchema);

export default ProductModel;