

import { useRecoilValue } from "recoil"
import { userState } from "../context/userState"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"



const useLikeToggle = () => {
  const userData = useRecoilValue(userState)
  const queryClient = useQueryClient()

  // !카카오 좋아요 토글
  const likeToggleKakao = async(coinId: string) => {
    const res = await axios.post(`http://localhost:3000/api/user/${coinId}/like`,{},{
      withCredentials: true
    })
    console.log(res.data)
    return res.data
  }

  const {mutate } = useMutation({
    mutationFn: likeToggleKakao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likeCoins', false] })
    },
    onError: (error) => { 
      console.error('error while toggling', error)
    }
  })

  //! 게스트 유저 좋아요 토글 
  const likeToggleGuest = (coinId: string) => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
    const currentLikedCoins = storedUser.interestedCoins || []

    let updatedLikeCoins

    if(currentLikedCoins.includes(coinId)){
      updatedLikeCoins = currentLikedCoins.filter((c: string) => c !== coinId)
    }else{
      updatedLikeCoins = [...currentLikedCoins, coinId]
    }

    const updatedUser = { ...storedUser, interestedCoins: updatedLikeCoins}
    localStorage.setItem('user', JSON.stringify(updatedUser))

    queryClient.invalidateQueries({queryKey: ['likeCoins', true]})
  }

  const likeToggle = (coinId: string) => {
    if(userData.isGuest){
      likeToggleGuest(coinId)
    }else{
      mutate(coinId)
    }
  }

  return { likeToggle }
}

export default useLikeToggle