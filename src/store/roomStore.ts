import { create } from "zustand";
import type { RoomMember } from "@/utils/types";
import { createClient } from '@/utils/supabase/client'

type RoomStore = {
    isLoading: boolean;
    members: RoomMember[];
    setIsLoading: (isLoading: boolean) => void;
    setMembers: (members: RoomMember[]) => void;
    fetchMembers: () => Promise<void>;
//     addMember: (member: RoomMember) => void;
//     removeMember: (memberId: string) => void;
}

const supabase = createClient();

const useRoomStore = create<RoomStore>((set) => ({
    isLoading: true,
    members: [],
    setIsLoading: (isLoading: boolean) => set({isLoading}),
    setMembers: (members: RoomMember[]) => set({members}),
    fetchMembers: async () => {
        const { data, error } = await supabase
            .from('room')
            .select('id, name, cardId, created_at')
            .order('created_at', { ascending: true });
        
        if (error) {
            console.error("ルームメンバー取得エラー", error);
            return;
        }
        set({members: data});
    },
}));

export default useRoomStore;