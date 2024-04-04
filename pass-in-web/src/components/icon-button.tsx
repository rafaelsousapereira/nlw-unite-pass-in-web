import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

interface IconButtonProps extends ComponentProps<"button"> {
  transparent?: boolean
}

export const IconButton = ({ transparent, ...props }: IconButtonProps) => {
  return (
    <button {...props} 
      // className={transparent 
      //   ? "border border-white/10 rounded bg-black/20 p-1.5" 
      //   : "border border-white/10 rounded bg-white/10 p-1.5"} 
      // />
      className={twMerge(
        "border border-white/10 rounded-md p-1.5",
        transparent ? "bg-black/20" : "bg-white/10",
        props.disabled ? "opacity-50" : null
      )} 
    />
  )
}