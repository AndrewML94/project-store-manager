const productMock = [
  {
    productId: 1,
    quantity: 2
  },
  {
    productId: 2,
    quantity: 2
  }
]

const invalidProductId = [
  {
    productId: 7,
    quantity: 2
  },
  {
    productId: 2,
    quantity: 2
  }
]

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
}

module.exports = {
  productMock,
  newProductMock,
  invalidProductId
};