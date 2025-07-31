import type { Url } from 'node:url'
import Link from 'next/link'

export const MaybeLink = ({
  href,
  className,
  children,
  ...props
}: Omit<React.ComponentPropsWithRef<typeof Link>, 'href'> & {
  href?: string | Url
}) => {
  if (href)
    return (
      <Link href={href} className={className} {...props}>
        {children}
      </Link>
    )
  else return <div className={className}>{children}</div>
}
