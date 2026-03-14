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

export function FirmCard({ firm, onEdit }) {

  const { _id, address, image, name, phone, } = firm

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden mt-5">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={image}
        alt="Event cover"
        className="relative aspect-video w-full object-cover "
      />
      <CardHeader className="items-center">
        <CardAction>
          <Badge variant="secondary">{phone}</Badge>
        </CardAction>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardDescription className="line-clamp-3 px-5">
        {address}
      </CardDescription>
      <CardFooter className="flex gap-2 flex-wrap mt-auto">
        <Button className="flex-1 cursor-pointer bg-primary/40"><Link to={`${_id}`}>View Details</Link></Button>
        <Button  
        onClick={() => onEdit(firm)}
        className="flex-1 bg-chart-1/40 cursor-pointer">Edit</Button>
        <Button className="flex-1 bg-ring cursor-pointer">Delete</Button>
      </CardFooter>
    </Card>
  )
}
