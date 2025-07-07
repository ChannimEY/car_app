"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CarData } from "@/lib/car-type";

interface DisplayProductProps {
  tagline: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  posts: CarData[];
}

export default function DisplayProductComponent({
  tagline = "Featured Cars",
  heading = "Explore Our Collection",
  description = "Browse premium vehicles with the best specs, performance, and prices. Each car is listed with accurate details and stunning images.",
  buttonText = "View all cars",
  buttonUrl = "",
  posts,
}: DisplayProductProps) {
  return (
    <section className="py-32">
      <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-6">
            {tagline}
          </Badge>
          <h2 className="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            {heading}
          </h2>
          <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
            {description}
          </p>
          <Button variant="link" className="w-full sm:w-auto" asChild>
            <a href={buttonUrl} target="_blank">
              {buttonText}
              <ArrowRight className="ml-2 size-4" />
            </a>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 w-full">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-[16/9] w-full">
                <Image
                  src={post.image}
                  width={500}
                  height={300}
                  alt={post.make}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader>
                <h3 className="text-xl font-semibold hover:underline">
                  <a href={post.make} target="_blank">
                    {post.make} {post.model}
                  </a>
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{post.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-primary">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(post.price)}
                  </span>
                  <span className="text-muted-foreground">Year: {post.year}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <a
                  href="#"

                  className="text-sm text-blue-600 hover:underline flex items-center"
                >
                  Details
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
