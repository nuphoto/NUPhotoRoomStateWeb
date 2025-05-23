//import EnteringMemberTable from "@/components/others/EnteringMemberTable";
import { getEnterUsers } from "@/utils/supabase/supabaseFunctions/server";


export default async function Home() {
  const users = await getEnterUsers()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-center text-xl text-green-500">
        {`現在部室に${users?.length ?? 0}人います`}
      </p>
      {/* <EnteringMemberTable members={users}/> */}
      
    </div>

  );
}
