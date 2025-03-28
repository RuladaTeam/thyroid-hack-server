export type ArchiveFromState =
  | {
      errors?: string[];
      message?: string;
    }
  | undefined;

export async function sendArchive(state: ArchiveFromState, formData: FormData) {
  console.log("HERE");
  const archive = formData.get("archive");

  if (archive === null) {
    return {
      message: "Приложите архив dcm файлов",
    };
  }

  console.log(`archive ${archive}`);
}
