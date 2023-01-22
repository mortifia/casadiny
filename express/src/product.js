import express from 'express'

var router = express.Router()

//get product, with pagination and filter, sort, search(like) and limit
router.get('/all', async (req, res) => {
  const { page, limit, sort, search, priceMin, priceMax } = req.query || {}

  const offset = (parseInt(page || 1) - 1) * parseInt(limit || 25)
  let sort2 = {}
  if (sort) {
    let sortTMP = []
    //if sort is not a array, we convert it
    if (!Array.isArray(sort)) {
      sortTMP = [sort.toString()]
    } else {
      sortTMP = sort
    }
    //we loop on the array
    sortTMP.forEach(sort => {
      switch (sort) {
        case 'price':
          sort2.priceHT = 'asc'
          break
        case 'priceDesc':
          sort2.priceHT = 'desc'
          break
        case 'title':
          sort2.title = 'asc'
          break
        case 'titleDesc':
          sort2.title = 'desc'
          break
        default:
          sort2.priceHT = 'asc'
          break
      }
    })
  }
  console.log(priceMax)
  const products = await req.prisma.product
    .findMany({
      where: {
        OR: [
          {
            title: {
              contains: search || '',
            },
            text: {
              contains: search || '',
            },
          },
        ],
        priceHT: {
          gte: priceMin ? Number(priceMin) : undefined,
          lte: priceMax ? Number(priceMax) : undefined,
        },
      },
      skip: offset,
      take: limit,
      orderBy: sort2,
      include: {
        // ProductIllustration
        ProductIllustration: true,
        ProductRate: true,
      },
    })
    .then(products => {
      // console.dir(products, { depth: 4 })
      return products.map(product => {
        return {
          ...product,
          ProductRate: undefined,
          //we calculate the average rate not delete float
          averageRate:
            product.ProductRate.reduce(
              (acc, ProductRate) => Number(acc) + Number(ProductRate.rate),
              0
            ) / Number(product.ProductRate.length),
          ProductIllustration: product.ProductIllustration.map(
            ProductIllustration => ProductIllustration.url
          ),
        }
      })
    })

  res.json(products)
})

export default router
