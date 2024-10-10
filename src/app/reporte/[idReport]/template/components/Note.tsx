interface Props {
  note: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export default function Note({ note, onChange }: Props) {
  return (
    <div>
      <div>
        <div>
          <div className="p-2">
            <span>Note: </span>
            <textarea
              name="nota"
              onChange={onChange}
              className="w-full h-20"
              value={note}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
