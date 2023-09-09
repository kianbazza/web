import "./ChatBubble.styles.css"

interface Props {
  children?: React.ReactNode
}

export function SendChatBubble({ children }: Props) {
  return <div className="shared send">{children}</div>
}

export function ReceiveChatBubble({ children }: Props) {
  return (
    <div className="shared receive dark:bg-[#3b3b3d] dark:text-white dark:before:bg-[#3b3b3d] dark:after:bg-neutral-900">
      {children}
    </div>
  )
}
