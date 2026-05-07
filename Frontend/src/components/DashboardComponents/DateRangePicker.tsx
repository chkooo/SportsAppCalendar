interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onApply: () => void;
}

function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onApply,
}: DateRangePickerProps) {
  const setPreset = (preset: string) => {
    const now = new Date();
    let start: Date;
    let end: Date;

    switch (preset) {
      case "today": {
        start = new Date(now.setHours(0, 0, 0, 0));
        end = new Date(now.setHours(23, 59, 59, 999));
        break;
      }
      case "week": {
        const dayOfWeek = now.getDay();
        start = new Date(now);
        start.setDate(now.getDate() - dayOfWeek);
        start.setHours(0, 0, 0, 0);
        end = new Date(start);
        end.setDate(start.getDate() + 6);
        end.setHours(23, 59, 59, 999);
        break;
      }
      case "month": {
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
        break;
      }
      case "year": {
        start = new Date(now.getFullYear(), 0, 1);
        end = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
        break;
      }
      default:
        return;
    }

    onStartDateChange(start.toISOString().split("T")[0]);
    onEndDateChange(end.toISOString().split("T")[0]);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 bg-white dark:bg-zinc-700 border-2 border-zinc-800 dark:border-gray-500 rounded-lg p-3">
      <div className="flex gap-1">
        <button
          onClick={() => setPreset("today")}
          className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-zinc-200 dark:bg-zinc-600 hover:bg-zinc-300 dark:hover:bg-zinc-500 rounded transition-colors"
        >
          Hoy
        </button>
        <button
          onClick={() => setPreset("week")}
          className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-zinc-200 dark:bg-zinc-600 hover:bg-zinc-300 dark:hover:bg-zinc-500 rounded transition-colors"
        >
          Semana
        </button>
        <button
          onClick={() => setPreset("month")}
          className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-zinc-200 dark:bg-zinc-600 hover:bg-zinc-300 dark:hover:bg-zinc-500 rounded transition-colors"
        >
          Mes
        </button>
        <button
          onClick={() => setPreset("year")}
          className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-zinc-200 dark:bg-zinc-600 hover:bg-zinc-300 dark:hover:bg-zinc-500 rounded transition-colors"
        >
          Año
        </button>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="px-2 py-1 text-sm border-2 border-zinc-800 dark:border-gray-500 rounded bg-white dark:bg-zinc-800"
        />
        <span className="text-sm font-bold">a</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="px-2 py-1 text-sm border-2 border-zinc-800 dark:border-gray-500 rounded bg-white dark:bg-zinc-800"
        />
        <button
          onClick={onApply}
          className="px-4 py-1 text-sm font-bold uppercase tracking-wider bg-blue-600 text-white hover:bg-blue-700 rounded transition-colors"
        >
          Aplicar
        </button>
      </div>
    </div>
  );
}

export default DateRangePicker;