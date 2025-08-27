import { STATUS } from '@/types';

type Props = {
  value: STATUS;
  onChange: (newStatus: STATUS) => void;
  disabled?: boolean;
};

const CommentStatusSelect = ({ value, onChange, disabled }: Props) => {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value as STATUS)}
      disabled={disabled}
      className="bg-black border border-zinc-700 rounded px-2 py-1 text-sm"
    >
      <option value="PENDING">در انتظار</option>
      <option value="APPROVED">تایید شده</option>
      <option value="REJECTED">رد شده</option>
    </select>
  );
};

export default CommentStatusSelect;
