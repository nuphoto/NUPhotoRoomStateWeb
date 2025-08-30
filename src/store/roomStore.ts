import { create } from "zustand";
import type { RoomMember } from "@/utils/types";
import { createClient } from '@/utils/supabase/client';

type RoomStore = {
    isLoading: boolean;
    members: RoomMember[];
    myId: string;
    isEnter: boolean;
    setIsLoading: (isLoading: boolean) => void;
    setMembers: (members: RoomMember[]) => void;
    fetchMembers: () => Promise<void>;
    getMyId: () => Promise<void>;
    getIsEnter: () => void;
}

const supabase = createClient();

const useRoomStore = create<RoomStore>((set, get) => ({
    isLoading: true,
    members: [],
    myId: "",
    isEnter: false,
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
    getMyId: async () => {
        const supabase = await createClient();

        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            set({myId: user.id});
        }
    },
    getIsEnter: () => {
        const isEnter: boolean = get().members.some(member => member.id == get().myId);
        set({isEnter: isEnter});
    }
}));

export default useRoomStore;