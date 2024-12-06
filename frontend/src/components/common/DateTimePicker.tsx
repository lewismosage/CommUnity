import React from 'react';

interface DateTimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ value, onChange, minDate }) => {
  const formatDateTimeLocal = (date: Date) => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  };

  return (
    <input
      type="datetime-local"
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
      value={formatDateTimeLocal(value)}
      min={minDate ? formatDateTimeLocal(minDate) : undefined}
      onChange={(e) => onChange(new Date(e.target.value))}
    />
  );
};

export default DateTimePicker; 