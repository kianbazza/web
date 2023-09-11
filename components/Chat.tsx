interface Props {
  children?: React.ReactNode
}

export default function Chat({ children }: Props) {
  return (
    <div className="rounded-xl w-fit max-w-md py-2 px-3 bg-neutral-100 dark:text-white dark:bg-neutral-800">
      {children}
    </div>
  )
}
