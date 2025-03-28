"use client";
import { sendArchive } from "@/lib/action";
import React, { FormEvent, useActionState } from "react";
import { Input } from "./ui/input";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

const AddFilesForm = () => {
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const response = await fetch("/api/archive", {
      method: "POST",
      body: formData,
    });
  }
  return (
    <form onSubmit={onSubmit}>
      <label className="ps-1">Загрузите архив</label>
      <Input type="file" id="archive" name="archive" />
      <SubmitButton />
    </form>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" className="mt-5">
      Отправить
    </Button>
  );
}

export default AddFilesForm;
