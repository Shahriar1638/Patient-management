import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function AuthCard({
  title,
  description,
  children,
  footer,
}: {
  title: string
  description: string
  children: React.ReactNode
  footer: React.ReactNode
}) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="font-heading text-headline-md">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
        <Separator className="my-6" />
        <p className="text-center text-body-md text-muted-foreground">
          {footer}
        </p>
      </CardContent>
    </Card>
  )
}
