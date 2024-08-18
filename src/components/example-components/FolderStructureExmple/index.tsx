import FolderStructure, {
  FolderStructureProps,
} from "src/components/FolderStructure";

// const folders: FolderStructureProps[] = [
//   {
//     name: "Home",
//     folders: [
//       {
//         name: "Movies",
//         folders: [
//           {
//             name: "Action",
//             folders: [
//               {
//                 name: "2000s",
//                 folders: [
//                   { name: "Gladiator.mp4" },
//                   { name: "American-Beauty.mp4" },
//                 ],
//               },
//               { name: "2010s", folders: [] },
//             ],
//           },
//           { name: "Comedy", folders: [{ name: "2000s", folders: [] }] },
//         ],
//       },
//       {
//         name: "Music",
//         folders: [
//           { name: "Rock", folders: [] },
//           { name: "Classical", folders: [] },
//         ],
//       },
//       { name: "Pictures", folders: [] },
//       { name: "Documents", folders: [] },
//       { name: "passwords.txt" },
//     ],
//   },
// ];

const visualStudioCodeFolderData: FolderStructureProps[] = [
  {
    name: "canary-design",
    folders: [
      { name: ".storybook", folders: [] },
      {
        name: "dist",
        folders: [
          {
            name: "assets",
            folders: [
              { name: "index14.css" },
              { name: "index13.css" },
              { name: "index11.css" },
            ],
          },
          {
            name: "components",
            folders: [
              {
                name: "Button",
                folders: [{ name: "index.d.ts" }, { name: "index.js" }],
              },
              {
                name: "CarouselTypeA",
                folders: [{ name: "index.d.ts" }, { name: "index.js" }],
              },
              {
                name: "Drawer",
                folders: [{ name: "index.d.ts" }, { name: "index.js" }],
              },
            ],
          },
          { name: "main.d.ts" },
          { name: "main.js" },
          { name: "vite-env.d.js" },
        ],
      },
      {
        name: "lib",
        folders: [
          {
            name: "components",
            folders: [
              {
                name: "Button",
                folders: [{ name: "index.module.css" }, { name: "index.tsx" }],
              },
              {
                name: "Carousel",
                folders: [{ name: "index.module.css" }, { name: "index.tsx" }],
              },
              {
                name: "Drawer",
                folders: [{ name: "index.module.css" }, { name: "index.tsx" }],
              },
            ],
          },
          { name: "main.ts" },
          { name: "vite-env.d.ts" },
        ],
      },
      { name: "node_modules", folders: [] },
      { name: "public", folders: [{ name: "vite.svg" }] },
      {
        name: "src",
        folders: [
          {
            name: "assets",
            folders: [
              { name: "close-icon.svg" },
              { name: "file-icon.svg" },
              { name: "caret-left-black.svg" },
              { name: "delete-file.svg" },
              { name: "folder-icon.svg" },
            ],
          },
          {
            name: "components",
            folders: [
              {
                name: "Button",
                folders: [
                  { name: "index.interface.ts" },
                  { name: "index.module.css" },
                  { name: "index.tsx" },
                ],
              },
              {
                name: "Carousel",
                folders: [
                  { name: "index.interface.ts" },
                  { name: "index.module.css" },
                  { name: "index.tsx" },
                ],
              },
              {
                name: "Drawer",
                folders: [
                  { name: "index.interface.ts" },
                  { name: "index.module.css" },
                  { name: "index.tsx" },
                ],
              },
            ],
          },
          {
            name: "stories",
            folders: [
              { name: "Button", folders: [{ name: "Button.stories.tsx" }] },
              {
                name: "CarouselTypeA",
                folders: [{ name: "CarouselTypeA.stories.tsx" }],
              },
              { name: "Drawer", folders: [{ name: "Drawer.stories.tsx" }] },
            ],
          },
          { name: "App.css" },
          { name: "App.tsx" },
          { name: "index.css" },
          { name: "main.tsx" },
          { name: "vite-env.d.ts" },
        ],
      },
      { name: ".eslintrc.cjs" },
      { name: ".gitignore" },
      { name: "index.html" },
      { name: "LICENSE" },
      { name: "package-lock.json" },
      { name: "package.json" },
      { name: "README.md" },
      { name: "tsconfig-build.json" },
      { name: "tsconfig.json" },
      { name: "tsconfig.node.json" },
      { name: "vite.config.ts" },
    ],
  },
];

const ExampleFolderStructure = () => {
  return (
    <>
      <ul>
        {visualStudioCodeFolderData.map((folder, index) => (
          <FolderStructure folder={folder} key={index} />
        ))}
      </ul>
    </>
  );
};

export default ExampleFolderStructure;
