import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TextareaEditor({
  onChange,
  onBlur,
  initialValue,
  name,
}) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      onChange({
        target: { name: name, value: editorRef.current.getContent() },
      });
    }
  };

  return (
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={initialValue}
        onEditorChange={(content, editor) =>
          onChange({
            target: { name: name, value: content },
          })
        }
        onBlur={(evt, editor) =>
          onBlur({
            target: { name: name, value: editor.getContent() },
          })
        }
        apiKey="choecjp9n7abgzckgemy1ojztwbw3lih72t2wqhci1lo8nwo"
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
            "image",
          ],

          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help |" +
            "image",
          image_title: true,
          automatic_uploads: true,
          images_upload_url: "/api/tiny-mce-file-upload",
          file_picker_types: "image",
          /* and here's our custom image picker*/
          file_picker_callback: function (cb, value, meta) {
            var input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");

            /*
                            Note: In modern browsers input[type="file"] is functional without
                            even adding it to the DOM, but that might not be the case in some older
                            or quirky browsers like IE, so you might want to add it to the DOM
                            just in case, and visually hide it. And do not forget do remove it
                            once you do not need it anymore.
                          */

            input.onchange = function () {
              var file = this.files[0];

              var reader = new FileReader();
              reader.onload = function () {
                /*
                                Note: Now we need to register the blob in TinyMCEs image blob
                                registry. In the next release this part hopefully won't be
                                necessary, as we are looking to handle it internally.
                              */
                var id = "blobid" + new Date().getTime();
                var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                var base64 = reader.result.split(",")[1];
                var blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);

                /* call the callback and populate the Title field with the file name */
                cb(blobInfo.blobUri(), { title: file.name });
              };
              reader.readAsDataURL(file);
            };

            input.click();
          },

          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          setup: function (ed) {
            ed.on("change", function (e) {
              tinyMCE.triggerSave();
              // log();
            });
          },
        }}
      />
    </>
  );
}
