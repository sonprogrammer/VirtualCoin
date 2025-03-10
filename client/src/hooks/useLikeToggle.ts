import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../context/userState";



// ! 게스트유저(로컬스토리지)인지 카카오유저(디비)인지에 따라 토글 처리를 다르게해야함
// ! 게스트 유저는 로컬에서 하면되는거고 카카오 유저는 서버에 요청보내서 디비 데이터 정보 바꾸면됨
const useLikeToggle = () => {
  const userData = useRecoilValue(userState)
};

export default useLikeToggle