import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom"

export function FirmCard({firm}) {

    const { _id, address, image, name, phone, } = firm

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={image}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover "
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{phone}</Badge>
        </CardAction>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="line-clamp-3">
         {address}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex gap-2 flex-wrap">
        <Button className="flex-1 cursor-pointer bg-primary/40"><Link to={`${_id}`}>View Details</Link></Button>
        <Button className="flex-1 bg-chart-1/40 cursor-pointer"><Link>Edit</Link></Button>
        <Button className="flex-1 bg-ring cursor-pointer"><Link>Delete</Link></Button>
      </CardFooter>
    </Card>
  )
}
