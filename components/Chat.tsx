interface Props {
  children?: React.ReactNode
}

export default function Chat({ children }: Props) {
  return (
    <div className="w-fit max-w-md rounded-xl bg-zinc-100 px-3 py-2 dark:bg-zinc-800 ">
      {children}
    </div>
  )
}
