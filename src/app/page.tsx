import AddFilesForm from "@/components/AddFilesForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mt-10 w-full  flex flex-col">
      <h2 className="text-2xl font-bold text-center mb-5">Rulada Solutions</h2>
      <h1 className="text-center font-medium mb-10">
        Конвертировать DICOM файлы (МРТ, КТ) в 3D объекты для исследования с
        помощью AR технологий
      </h1>
      <p className="flex flex-col space-y-5 mb-20">
        <span className="text-lg font-bold mb-4">Пошаговая инструкция</span>

        <span className="font-bold">Шаг 1</span>

        <span>
          Сделайте архив из папки с <b>dicom</b> файлами, затем загрузите этот
          архив в поле для загрузки файлов (под инструкцией). Называйте папку
          так, чтобы вы легко могли ее потом обнаружить. Нажмите на кнопку
          "Загрузить файлы".
        </span>

        <span className="font-bold">Шаг 2</span>

        <span>
          Запустите приложение на очках дополненной реальности. В главном меню
          нажмите на кнопку "Загрузить МРТ / КТ". В появившемся окошке нажмите
          на кнопку названную так же, как и вами ранее загруженный архив.
        </span>
      </p>

      <AddFilesForm />
    </div>
  );
}
