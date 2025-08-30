import React, { useState } from 'react'
import { Button } from '../ui/button';
import { EnterMember } from "@/utils/supabase/supabaseFunctions/client";
import useRoomStore from "@/store/roomStore";

const ButtonEnterRoom = () => {
    const [isLoading, setIsLoading] = useState(false);

    const enterMember = async () => {
        setIsLoading(true);
        const id: string = useRoomStore.getState().myId;
        await EnterMember(id);
        setIsLoading(false);
    };

    return (
        <Button
            onClick={() => enterMember()}
            disabled={isLoading}
            className="mt-5"
        >
            入室
        </Button>
    )
}

export default ButtonEnterRoom