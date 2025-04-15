
export default function TodoItem( {id, text} : { id: string ,text:string} ) {
  return (
    <div>
      <h1>{id} - {text}</h1>
    </div>
  );
}