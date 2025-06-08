import mongoose from 'mongoose';

export interface ICartItem {
          product: mongoose.Types.ObjectId;
          quantity: number;
}

export interface ICart extends mongoose.Document {
          user: mongoose.Types.ObjectId;
          items: ICartItem[];
          createdAt: Date;
          updatedAt: Date;
}

const cartSchema = new mongoose.Schema(
          {
                    user: {
                              type: mongoose.Schema.Types.ObjectId,
                              ref: 'User',
                              required: true,
                    },
                    items: [
                              {
                                        product: {
                                                  type: mongoose.Schema.Types.ObjectId,
                                                  ref: 'Product',
                                                  required: true,
                                        },
                                        quantity: {
                                                  type: Number,
                                                  required: true,
                                                  min: 1,
                                                  default: 1,
                                        },
                              },
                    ],
          },
          {
                    timestamps: true,
          }
);

export default mongoose.model<ICart>('Cart', cartSchema);