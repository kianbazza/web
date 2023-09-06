import "./ChatBubble.styles.css"

interface Props {
  children?: React.ReactNode
}

export function SendChatBubble({ children }: Props) {
  return <div className="shared send">{children}</div>
}

export function ReceiveChatBubble({ children }: Props) {
  return <div className="shared receive">{children}</div>
}
