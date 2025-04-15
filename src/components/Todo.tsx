'use client'

import { createClient } from "@/utils/supabase/client";
import TodoItem from "./TodoItem";
import { useEffect, useState } from "react";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

type Todo = {
    id: string,
    text: string
}

/*
switch (payload.eventType) {
            case 'INSERT':
              setTodo((prev) => [...prev, newItem]);
              break;
            case 'UPDATE':
              setTodo((prev) =>
                prev.map((item) =>
                  item.id === oldItem.id ? newItem : item
                )
              );
              break;
            case 'DELETE':
              setTodo((prev) =>
                prev.filter((item) => item.id !== oldItem.id)
              );
              break;
          }
        } 
*/

export default function Todo({ data }: { data: Todo[]}) {
    const [todo, setTodo] = useState<Todo[]>(data)
    const supabase = createClient();

    useEffect(() => {
        const channel = supabase
            .channel('realtime-todo')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'todo'
            }, (payload: RealtimePostgresChangesPayload<Todo>) => {
                console.log(payload);

                switch(payload.eventType) {
                    case 'INSERT':
                        const newItem = payload.new;
                        setTodo((prevState) => [...prevState, newItem]);
                        break;
                    case 'UPDATE':
                        const updatedItem = payload.new;
                        setTodo((prevState) => prevState.map(todo => todo.id === updatedItem.id ? updatedItem : todo));
                        break;
                    case 'DELETE':
                        const deletedItem = payload.old;
                        setTodo((prevState) => prevState.filter(todo => todo.id !== deletedItem.id));
                        break;
                }
            }).subscribe();

        return () => {
            supabase.removeChannel(channel);
        }    
    }, [supabase])

    return (
        <div>
            {todo.map((item) => (
                <TodoItem key={item.id} id={item.id} text={item.text} />
            ))}
        </div>
    );
}
