"use client"

import useRoomStore from "@/store/roomStore";
import { useEffect } from "react";
import EnteringMemberTable from "@/components/others/EnteringMemberTable";
import ButtonEnterRoom from "@/components/others/ButtonEnterRoom";
import { createClient } from '@/utils/supabase/client'

export default function Home() {
  const supabase = createClient();
  const members = useRoomStore(state => state.members);
  const isEnter = useRoomStore(state => state.isEnter);
  const isLoading = useRoomStore(state => state.isLoading);

  useEffect(() => {
    const setIsLoading = useRoomStore.getState().setIsLoading;
    const fetchMembers = useRoomStore.getState().fetchMembers;
    const getMyId = useRoomStore.getState().getMyId;
    const getIsEnter = useRoomStore.getState().getIsEnter;

    fetchMembers();
    getMyId();
    setIsLoading(false);
    getIsEnter();

    //リアルタイム購読のセットアップ
    const subscription = supabase
      .channel("room-member-changes")
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'room',
        }, 
        (payload) => {
          console.log('リアルタイム更新:', payload);
          fetchMembers();
          getIsEnter();
        }
      )
      .subscribe();
    // クリーンアップ関数
    return () => {
      supabase.removeChannel(subscription);
    };

  })

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <EnteringMemberTable members={members}/>
      {!isEnter && <ButtonEnterRoom />}
    </div>
  );
}
