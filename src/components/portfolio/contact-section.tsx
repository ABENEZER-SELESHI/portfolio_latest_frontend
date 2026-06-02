"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/validators/contact";
import { useContactMutation } from "@/hooks/queries";
import { useToast } from "@/hooks/use-toast";
import { Section } from "@/components/ui/section";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/utils/format";

export function ContactSection() {
  const toast = useToast();
  const mutation = useContactMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { honeypot: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      await mutation.mutateAsync(values);
      toast.success("Message sent successfully. Thank you!");
      reset();
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    }
  };

  return (
    <Section id="contact" title="Contact" subtitle="Get in touch for opportunities or collaboration">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl space-y-4"
        noValidate
      >
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden
          {...register("honeypot")}
        />
        <Input
          id="name"
          label="Name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          id="subject"
          label="Subject"
          error={errors.subject?.message}
          {...register("subject")}
        />
        <Textarea
          id="message"
          label="Message"
          error={errors.message?.message}
          {...register("message")}
        />
        <Button type="submit" isLoading={isSubmitting || mutation.isPending}>
          Send Message
        </Button>
      </form>
    </Section>
  );
}
