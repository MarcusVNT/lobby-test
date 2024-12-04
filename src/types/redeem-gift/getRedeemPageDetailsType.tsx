export type GetRedeemPageDetailsType = {
  id: string
  title: string
  status: string
  administrative_link: string
  redemption_link: string
  items: [
    {
      customer_product_id: string
      quantity: number
      size_grid: {
        name: string
      }
      sizes: [
        {
          id: string
          name: string
        },
      ]
    },
  ]
  extra_questions: [
    {
      id: number
      answer_type: string
      question: string
      options: string[]
    },
  ]
}
