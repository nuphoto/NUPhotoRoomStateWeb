import EnteringMemberTable from "@/components/others/EnteringMemberTable";
import EnterExitButton from "@/components/others/EnterExitButton";
import { getEnterUsers, getEntryStatus } from "@/utils/supabase/supabaseFunctions/server";


export default async function Home() {
  const users = await getEnterUsers()
  const isEnter = await getEntryStatus()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* <p className="text-center text-xl text-green-500">
        {`現在部室に${users?.length ?? 0}人います`}
      </p> */}
      <EnteringMemberTable members={users}/>
      <EnterExitButton initialIsEnter={isEnter}/>
      
    </div>
  );
}
