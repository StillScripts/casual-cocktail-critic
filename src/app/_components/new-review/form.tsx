"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitButton } from "@/components/ui/submit-button";

const reviewFormSchema = z.object({
  feedback: z.string().min(2, {
    message: "Feedback is required",
  }),
  rating: z.coerce
    .number()
    .gte(1, { message: "The rating must be between 1 and 10" })
    .lte(10, { message: "The rating must be between 1 and 10" }),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

export function CreateReviewForm({
  close,
  recipeId,
}: {
  close: () => void;
  recipeId: number;
}) {
  const router = useRouter();
  const createReviews = api.review.create.useMutation();
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
  });

  function onSubmit(data: ReviewFormValues) {
    createReviews.mutate({
      feedback: data.feedback,
      rating: parseFloat(`${data.rating}`),
      recipeId,
    });
  }

  useEffect(() => {
    if (createReviews?.isSuccess) {
      close();
      router.refresh();
    }
  }, [close, createReviews?.isSuccess, router]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feedback</FormLabel>
              <FormControl>
                <Textarea placeholder="Your feedback" {...field} />
              </FormControl>
              <FormDescription>
                Describe your experience of the cocktail and explain your rating
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input placeholder="Your rating" type="number" {...field} />
              </FormControl>
              <FormDescription>
                Give the cocktail a rating out of 10
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton loading={createReviews.isLoading}>
          Add Your Rating
        </SubmitButton>
      </form>
    </Form>
  );
}
