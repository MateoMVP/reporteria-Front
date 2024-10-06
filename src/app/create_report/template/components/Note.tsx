import { ChangeEvent } from "react";

interface Props {
  note: string;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
}
export default function Note({ note, handleChange }: Props) {
  return (
    <div>
      <div>
        <div>
          <div className="p-2">
            <span>Note: </span>
            <textarea
              name="nota"
              onChange={handleChange}
              className="w-full h-20"
              value={note}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
