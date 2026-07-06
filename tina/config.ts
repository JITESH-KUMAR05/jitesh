import {defineConfig} from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? "",
  token: process.env.TINA_TOKEN ?? "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "project",
        label: "Projects",
        path: "content/projects",
        format: "md",
        ui: {
          router: () => undefined
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {component: "textarea"},
            required: true
          },
          {type: "string", name: "tags", label: "Tags", list: true},
          {type: "string", name: "github", label: "GitHub URL"},
          {type: "string", name: "live", label: "Live URL"},
          {type: "image", name: "image", label: "Screenshot"},
          {
            type: "boolean",
            name: "highlighted",
            label: "Highlighted (show in Featured Projects)"
          },
          {type: "number", name: "order", label: "Sort order"}
        ]
      }
    ]
  }
});
