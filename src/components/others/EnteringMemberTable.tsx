import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '../ui/button';
import type { RoomMember } from '@/utils/types';
import { removeMember } from "@/utils/supabase/supabaseFunctions/client"

type Props = {
    members: RoomMember[] | null;
};

const EnteringMemberTable = ({ members }: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    if (!members || members.length == 0) {
        members = []
    }

    const removeMembers = async (id: string) => {
        setIsLoading(true);
        await removeMember(id);
        setIsLoading(false);
    };

    return (
        <div className="max-w-xs w-3xs rounded-md border shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center text-green-500">現在の入室状況</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {members.map((member) => (
                        <TableRow key={member.id}>
                            <TableCell className="text-center">
                                <div className="flex items-center justify-between">
                                    <span>{member.name}</span>
                                    <Button
                                        onClick={() => removeMembers(member.id)}
                                        disabled={isLoading}
                                        className="ml-2 bg-white hover:bg-gray-200 text-red-500 hover:text-red-700 focus:outline-none"
                                    >
                                        ×
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default EnteringMemberTable