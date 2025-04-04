import AddMRIFiles from "@/components/AddMRIFiles";
import AddUSFiles from "@/components/AddUSFiles";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mt-10 w-full  flex flex-col ">
      <div className="w-full justify-center items-center flex">
      <Image src="/rulada.png" alt="ЛОГО"width={200*0.58} height={200}/></div>
      <h2 className="text-2xl font-bold text-center mb-5">Rulada Solutions</h2>
      <h1 className="text-center font-medium mb-10">
        Конвертировать DICOM файлы (МРТ, КТ) в 3D объекты для исследования с
        помощью AR технологий.
        <br />
        Область загрузки видеоряда УЗИ.
      </h1>
      <p className="mt-10 mb-10 text-xl font-bold text-center">!НЕ НАЗЫВАТЬ АРХИВЫ КИРИЛЛИЦЕЙ!</p>
      <p className="flex flex-col space-y-5 mb-10">
        <span className="text-lg font-bold mb-4">
          Пошаговая инструкция(МРТ / КТ)
        </span>

        <span className="font-bold">Шаг 1</span>

        <span>
          Сделайте архив из папки с <b>dicom</b> файлами, затем загрузите этот
          архив в поле для загрузки файлов (под инструкцией). Называйте папку
          так, чтобы вы легко могли ее потом обнаружить. Нажмите на кнопку
          "Отправить архив МРТ / КТ".
        </span>

        <span className="font-bold">Шаг 2</span>

        <span>
          Запустите приложение на очках дополненной реальности. В главном меню
          нажмите на кнопку "Загрузить МРТ / КТ". В появившемся окошке нажмите
          на кнопку названную так же, как и вами ранее загруженный архив (таких
          файла будет два, один будет назван "имя-CT", а второй "имя-MRI". Это
          модели КТ и МРТ соответсвенно).
        </span>
      </p>

      <AddMRIFiles />

      <p className="flex flex-col space-y-5 mb-10 mt-10">
        <span className="text-lg font-bold mb-4">
          Пошаговая инструкция (видеоряд УЗИ)
        </span>

        <span className="font-bold">Шаг 1</span>

        <span>
          Сделайте архив из папки с файлами видеоряда{" "}
          <b>
            !В архиве должны находиться ТОЛЬКО видео файлы (форматы .avi, .mp4,
            .mov и т.п)!
          </b>
          , затем загрузите этот архив в поле для загрузки файлов (под
          инструкцией). Называйте папку так, чтобы вы легко могли ее потом
          обнаружить. Нажмите на кнопку "Отправить видеоряд УЗИ".
        </span>

        <span className="font-bold">Шаг 2</span>

        <span>
          Запустите приложение на очках дополненной реальности. В главном меню
          нажмите на кнопку "Загрузить видео". В появившемся окошке нажмите на
          кнопку названную так же, как и вами ранее загруженный архив. В
          соответствующем окне у вас должен появиться проигрыватель видеоряда.
        </span>
      </p>

      <AddUSFiles />
    </div>
  );
}
