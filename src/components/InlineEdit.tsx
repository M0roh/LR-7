import { useState } from "react";

export default function InlineEdit({ value, onSave }: { value: string; onSave: (v: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [local, setLocal] = useState(value);


  if (!editing) {
    return (
      <div
        className="inlineText"
        onClick={() => setEditing(true)}
      >
        {value}
      </div>
    );
  }

  return (
    <input
      autoFocus
      value={local}
      className="inlineInput"
      onChange={e => setLocal(e.target.value)}
      onBlur={() => {
        onSave(local);
        setEditing(false);
      }}
    />
  );
}