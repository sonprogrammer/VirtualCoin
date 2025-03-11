// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { useRecoilState, useRecoilValue } from "recoil";
// import { userState } from "../context/userState";





// // ! 게스트유저(로컬스토리지)인지 카카오유저(디비)인지에 따라 토글 처리를 다르게해야함
// // ! 게스트 유저는 로컬에서 하면되는거고 카카오 유저는 서버에 요청보내서 디비 데이터 정보 바꾸면됨
// const useLikeToggle = () => {
//   const userData = useRecoilValue(userState)
//   const queryClient = useQueryClient()




//   const likeToggleKakao = async (coinId: string) => {
//     const res = await axios.post(`http://localhost:3000/api/user/${coinId}/like`)
//     return res.data
//   }
//   const { mutate } = useMutation({
//     mutationFn: likeToggleKakao,
//     onSuccess: () => {
//       queryClient.invalidateQueries(['guestUser'])
//       console.log('success')
//     },
//     onError: (error) => {
//       console.error('error while toggling', error)
//     }
//   })

//   const likeToggle = (coinId: string) => {
//     if(userData.isGuest){
//       const storedUser = JSON.parse(localStorage.getItem('guestUser') || '{}')
//       const currentLikedCoins = storedUser.interestedCoins || []
//       let updatedLikeCoins

//       if(currentLikedCoins.includes(coinId)){
//         updatedLikeCoins = currentLikedCoins.filter((c: string) => c !== coinId)
//       }else{
//         updatedLikeCoins = [...currentLikedCoins, coinId]
//       }
//       const updatedUser = {...storedUser, interestedCoins: updatedLikeCoins}
//       localStorage.setItem('guestUser', JSON.stringify(updatedUser))
//     }else{
//       mutate(coinId)
//     }
//   }
//   return{ 
//     likeToggle
//   }
// };

// export default useLikeToggle

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "../context/userState";
import { useState } from "react";

// 게스트 유저인지 카카오 유저인지에 따라 토글 처리를 다르게 해야 함
const useLikeToggle = () => {
  const userData = useRecoilValue(userState);
  const queryClient = useQueryClient();

  // 서버에서 좋아요한 코인 리스트 가져오기
  const fetchLikedCoins = async () => {
    if (!userData.isGuest) {
      // 카카오 유저는 서버에서 데이터 조회
      const res = await axios.get(`http://localhost:3000/api/user/liked-coins`);
      return res.data;
    }
    return []; 
  };

  const { data: KakaolikedCoins, isLoading, isError } = useQuery({
    queryKey: ['likedCoins'], 
    queryFn: fetchLikedCoins,
    staleTime: Infinity 
  }
  );

  // 카카오 유저의 좋아요 토글
  const likeToggleKakao = async (coinId: string) => {
    const res = await axios.post(`http://localhost:3000/api/user/${coinId}/like`);
    return res.data;
  };

  const { mutate } = useMutation({
    mutationFn: likeToggleKakao,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['likedCoins']});
    },
    onError: (error) => {
      console.error('error while toggling', error);
    },
  });



  // *게스트 유저 좋아요 토글
  const storedUser = JSON.parse(localStorage.getItem('guestUser') || '{}');
  const [guestlikedCoins, setGuestLikedCoins] = useState<string[]>(storedUser.interestedCoins);


  const likeToggle = (coinId: string) => {
    if (userData.isGuest) {
      
      const currentLikedCoins = storedUser.interestedCoins || [];
      let updatedLikeCoins;

      if (currentLikedCoins.includes(coinId)) {
        updatedLikeCoins = currentLikedCoins.filter((c: string) => c !== coinId);
      } else {
        updatedLikeCoins = [...currentLikedCoins, coinId];
      }
      setGuestLikedCoins(updatedLikeCoins)

      const updatedUser = { ...storedUser, interestedCoins: updatedLikeCoins };
      localStorage.setItem('guestUser', JSON.stringify(updatedUser));
    } else {
      mutate(coinId);
    }
  };


  return {
    likeToggle,
    guestlikedCoins,
    KakaolikedCoins,
    isLoading,
    isError,
  };
};

export default useLikeToggle;
