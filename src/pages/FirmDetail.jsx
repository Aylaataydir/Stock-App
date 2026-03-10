import React, { useEffect } from 'react'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useParams } from 'react-router-dom';
import useStockCall from '../hooks/useStockCall';
import { useSelector } from 'react-redux';

const FirmDetail = () => {

  const { id } = useParams();
  const { getFirmById } = useStockCall()

  const firm = useSelector((state) => state.stock.firm)

  console.log(firm)


  useEffect(() => {

    getFirmById(id)

  }, [id])

  return (
    <Card className="relative w-full pt-5 flex lg:flex-row shadow-lg mt-5">
      <div className="flex items-center justify-center h-64  ">
        <img
          src={firm?.image}
          alt={firm?.name}
          className="object-contain h-full max-w-full rounded-xl"
        />
      </div>
      <CardHeader className="flex flex-col w-full flex-1 mt-5">
        <div className="flex flex-col gap-2">
          <CardTitle>{firm?.name}</CardTitle>
          <Badge variant="outline" className="mt-3">
            <Link to={`tel:${firm?.phone}`}>{firm?.phone}</Link>
          </Badge>
        </div>
        <CardDescription className="mt-8">
          {firm?.address}{" "}
        </CardDescription>
          <Button size="sm" className="border-2 bg-card mt-10 px-5 py-2 cursor-pointer">
            <Link to={`/stock/firms`}>Back to Firms </Link>
          </Button>
      </CardHeader>
    </Card>
  );
}

export default FirmDetail