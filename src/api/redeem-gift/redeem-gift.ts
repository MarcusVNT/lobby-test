import { api } from '@/lib/axios'
import { GetRedeemPageDetailsType } from '@/types/redeem-gift/getRedeemPageDetailsType'
import { PostRedeemGiftType } from '@/types/redeem-gift/postRedeemGiftType'

async function getRedeemPageDetails(id: string) {
  const response = await api.get<GetRedeemPageDetailsType>(
    `/api/v1/redeem_pages/${id}`,
  )
  return response.data
}

async function postRedeemGift(id: string, data: PostRedeemGiftType) {
  const response = await api.post(`/api/v1/redeem_pages/${id}/redeem`, data)
  return response.data
}

export { getRedeemPageDetails, postRedeemGift }
