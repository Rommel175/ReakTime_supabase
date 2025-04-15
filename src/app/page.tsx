import Todo from "@/components/Todo";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('todo')
    .select('id, text');

  if (error) {
    console.log('Error fetching ToDo: ', error);
  }  

  if (data && data.length > 0) {
    console.log(data)
  }


  return (
    <div>
      <h1>ToDo Real time:</h1>
      {
        data ? <Todo data={data}/> : null
      }
      
    </div>
  );
}
