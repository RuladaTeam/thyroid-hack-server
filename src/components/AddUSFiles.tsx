"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const AddUSFiles = () => {
  
  const [pending, setPending] = useState(false);
  const [response, setResponse] = useState<Response | null>()

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();


    setPending(true);
    const formData = new FormData(e.currentTarget);
    const _response = await fetch("/api/ultras", {
      method: "POST",
      body: formData,
    });

    setResponse(_response);
  }

  useEffect(() => {
    let timer = setTimeout(() => setPending(false),800);

    return () => {
      clearTimeout(timer)
    }
  }, [pending]);


  return (
    <form onSubmit={onSubmit} >
      <label className="ps-1">Загрузите архив</label>
      <Input type="file" id="archive" name="archive" />
      
    <Button disabled={pending} type="submit" className="mt-5" >
      Отправить zip архив .mp4 фалов УЗИ
    </Button>
    {pending ? <Loader2 className="animate-spin mt-4" /> : 
    response?.status === 200 ?
    <p className="text-green-500 mt-4">
    Отправлено</p> : <p className="text-red-500 mt-4"> Ошибка, проверьте валидность данных и попробуйте снова</p>}
    </form>
  );
};


export default AddUSFiles;
