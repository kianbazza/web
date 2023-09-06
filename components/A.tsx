import { AnchorHTMLAttributes } from "react"

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode
}

export default function A(props: Props) {
  return (
    <a {...props} rel="noopener noreferrer" target="_blank">
      {props.children}
    </a>
  )
}
