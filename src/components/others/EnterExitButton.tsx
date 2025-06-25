"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { updateEntryStatus } from "@/utils/supabase/supabaseFunctions/client"
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type Props = {
    initialIsEnter: boolean | null;
};

const EnterExitButton = ({ initialIsEnter }: Props) => {
    const [currentIsEnter, setCurrentIsEnter] = useState<boolean | null>(initialIsEnter);
    const [isUpdating, setIsUpdating] = useState(false); // 更新中の状態
    const router = useRouter();

     useEffect(() => {
        if (initialIsEnter !== null && currentIsEnter === null) {
            setCurrentIsEnter(initialIsEnter);
        }
    }, [initialIsEnter, currentIsEnter]);

    const handleToggleEntryExit = async () => {
        if (currentIsEnter === null) {
            toast.error("現在の入室状態が不明です。");
            return;
        }
        // 更新中の場合は何もしない
        if (isUpdating) return;

        setIsUpdating(true); // 更新開始

        const nextIsEnterStatus = !currentIsEnter;
        setCurrentIsEnter(nextIsEnterStatus);

        try {
            // updateEntryStatus の代わりに updateClientSideEntryStatus を使用
            const result = await updateEntryStatus(nextIsEnterStatus); // ★★★ API呼び出しを await する ★★★

            if (result.success) {
                toast.success(result.message);
                // 成功した場合は、router.refresh() で最終的なデータ整合性を確保
                // setCurrentIsEnter は既に更新済みなので、ここでのUI更新は不要
                router.refresh(); 
            } else {
                // ★★★ 失敗した場合は内部状態をロールバック ★★★
                setCurrentIsEnter(!nextIsEnterStatus); 
                toast.error(result.message);
            }
        } catch (e: unknown) {
            let errorMessage = "予期せぬエラーが発生しました。";
            if (e instanceof Error) {
                errorMessage = e.message;
            }
            toast.error(`エラー: ${errorMessage}`);
            console.error("予期せぬエラー:", e);
            // ★★★ 予期せぬエラーの場合も内部状態をロールバック ★★★
            setCurrentIsEnter(!nextIsEnterStatus); 
        } finally {
            setIsUpdating(false); // 更新終了
        }
    };

    if (currentIsEnter === null) {
        return <Button disabled={true} className="px-6 py-3 text-lg m-5">状態読み込み中...</Button>;
    }

    return (
        <Button
            onClick={handleToggleEntryExit}
            disabled={isUpdating} // 更新中はボタンを無効化
            className="px-6 py-3 text-lg m-5"
            // ボタンのスタイルを状態によって変更することも可能
            // variant={currentIsEnter ? "destructive" : "default"} // 例: 退室は赤、入室はデフォルト
            >
            {isUpdating ? (currentIsEnter ? '退室処理中...' : '入室処理中...') : (currentIsEnter ? '退室' : '入室')}
        </Button>
    )
}

export default EnterExitButton