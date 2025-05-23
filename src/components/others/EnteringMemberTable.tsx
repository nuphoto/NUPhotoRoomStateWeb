import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Member = {
    name: string;
};

type Props = {
    members: Member[] | null;
};

const EnteringMemberTable = ({ members }: Props) => {
    if (!members || members.length == 0) {
        members = [{name: "誰もいません"}]
    }

    return (
        <div className="max-w-xs w-full rounded-md border shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center text-green-500">現在の入室状況</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {members.map((member, i) => (
                        <TableRow key={i}>
                            <TableCell className="text-center">{member.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default EnteringMemberTable