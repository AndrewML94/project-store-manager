const productMock = [
  {
    productId: 1,
    quantity: 2
  },
  {
    productId: 2,
    quantity: 2
  }
];

const invalidProductId = [
  {
    productId: 7,
    quantity: 2
  },
  {
    productId: 2,
    quantity: 2
  }
];

const newProductMock = {
  id: 4,
  itemsSold: [
    {
      productId: 1,
      quantity: 2
    },
    {
      productId: 2,
      quantity: 2
    }
  ]
};

const allSales = [
  {
    saleId: 1,
    date: '2023-03-27T14:18:11.000Z',
    productId: 1,
    quantity: 5
  },
  {
    saleId: 1,
    date: '2023-03-27T14:18:11.000Z',
    productId: 2,
    quantity: 10
  },
  {
    saleId: 2,
    date: '2023-03-27T14:18:11.000Z',
    productId: 3,
    quantity: 15
  }
];

const saleById = [
  {
    date: '2023-03-27T14:18:11.000Z',
    productId: 3,
    quantity: 15
  }
];

module.exports = {
  productMock,
  newProductMock,
  invalidProductId,
  allSales,
  saleById,
};