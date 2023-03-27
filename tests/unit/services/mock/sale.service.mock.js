const validSale = [
  {
    productId: 1,
    quantity: 2
  },
];

const invalidSale = [
  {
    productId: 7,
    quantity: 2
  },
  {
    productId: 2,
    quantity: 2
  }
];

const saleWithoutQuantity = [
  {
    productId: 7
  },
  {
    productId: 2,
    quantity: 2
  }
];

const returnSale = {
  id: 5,
  itemsSold: [
    {
      productId: 1,
      quantity: 2
    },
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

module.exports = {
  validSale,
  invalidSale,
  saleWithoutQuantity,
  returnSale,
  allSales,
};