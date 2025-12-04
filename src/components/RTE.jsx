import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-2 pl-1 text-sm font-medium text-gray-200">
          {label}
        </label>
      )}

      <div className="rounded-lg overflow-hidden border border-gray-700 bg-gray-800">
        <Controller
          name={name || "content"}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Editor
              apiKey="bl2b5pptgd5evcq8tb2kj09nlc98kkiuqu4mbpszhvk5p06m"
              value={field.value ?? defaultValue}
              init={{
                height: 500,
                menubar: true,
                skin: "oxide-dark",
                content_css: "dark",
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                content_style:
                  "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: #E5E7EB; background-color: #1F2937 }",
                mergetags_list: [
                  { value: "First.Name", title: "First Name" },
                  { value: "Email", title: "Email" },
                ],
              }}
              onEditorChange={field.onChange}
            />
          )}
        />
      </div>
    </div>
  );
}

export default RTE;