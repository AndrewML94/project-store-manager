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

module.exports = {
  validSale,
  invalidSale,
  saleWithoutQuantity,
  returnSale
};