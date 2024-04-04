import { ComponentProps } from "react"

interface TableProps extends ComponentProps<"table"> {}

export const Table = (props: TableProps) => {
  return (
    <div className="border border-white/10 rounded">
      <table {...props} className="w-full" />
    </div>
  )
}