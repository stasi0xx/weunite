"use client"

interface CalendarDayProps {
  day: number | null
  date: string | null
  isToday: boolean
  isAvailable: boolean
  isPast: boolean
  isSelected: boolean
  onSelect: (date: string) => void
}

export default function CalendarDay({
  day,
  date,
  isToday,
  isAvailable,
  isPast,
  isSelected,
  onSelect,
}: CalendarDayProps) {
  if (day === null || date === null) {
    return <div aria-hidden="true" />
  }

  const disabled = isPast || !isAvailable

  let cls =
    "flex items-center justify-center h-10 w-full text-sm font-medium rounded-xl transition-all duration-200 select-none "

  if (isSelected) {
    cls += "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2"
  } else if (disabled) {
    cls += "text-muted-foreground opacity-40 cursor-not-allowed"
  } else if (isToday) {
    cls += "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 cursor-pointer hover:scale-105"
  } else {
    cls += "bg-primary text-primary-foreground cursor-pointer hover:scale-105"
  }

  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={`${day}${isToday ? ', dziś' : ''}${isAvailable && !disabled ? ', dostępny' : ''}`}
      aria-pressed={isSelected}
      onClick={() => onSelect(date)}
      className={cls}
    >
      {day}
    </button>
  )
}
