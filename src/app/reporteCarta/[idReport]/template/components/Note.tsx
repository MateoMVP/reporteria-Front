interface Props {
  note: string;
}
export default function Note({ note }: Props) {
  return (
    <div>
      <div>
        <div>
          <div className="p-2">
            <span>Note: </span>
            {note}
          </div>
        </div>
      </div>
    </div>
  );
}
